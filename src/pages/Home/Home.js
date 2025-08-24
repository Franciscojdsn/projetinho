import { useEffect, useState } from 'react';
import { CiCircleMore } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

import styles from './Home.module.css'
import InfoAlunos from '../../componentes/InfoAlunos/InfoAlunos';
import ListaAlunos from '../../componentes/ListaAlunos/ListaAlunos';
import TituloLista from '../../componentes/TituloLista/TituloLista';
import Loading from '../../componentes/Formulario/Componentes/Loading/Loading';

const Home = () => {

    const [alunos, setAlunos] = useState([])
    const [alunosPendentes, setAlunosPendentes] = useState([])

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
    
            // Limpa o estado da mensagem no location para evitar reutilização
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null); // Remove a mensagem após 5 segundos
            }, 5000);

            return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
        }
    }, [message]);

    useEffect(() => {
        setIsLoading(true);
        // Busca alunos e dados financeiros em paralelo
        Promise.all([
            fetch('http://localhost:5000/alunos', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((resp) => resp.json()),
            fetch('http://localhost:5000/financeiro', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((resp) => resp.json())
        ])
            .then(([alunosData, financeiroData]) => {
                setAlunos(alunosData);
                // Cria um Set com IDs dos alunos que têm ao menos um boleto vencido
                const hoje = new Date();
                const idsPendentes = new Set(
                    financeiroData.filter(fin => {
                        if (!fin.boletos || !Array.isArray(fin.boletos)) return false;
                        return fin.boletos.some(boleto => {
                            if (!boleto.data_vencimento) return false;
                            const [dia, mes, ano] = boleto.data_vencimento.split('/');
                            const dataVencimento = new Date(`${ano}-${mes}-${dia}`);
                            return dataVencimento < hoje;
                        });
                    }).map(fin => fin.id)
                );
                setAlunosPendentes(idsPendentes);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])

    return (
        <>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <InfoAlunos />
                    <div className={styles.sucessmessage}>
                        {message && <div className={styles.successmessage}>{message}</div>}
                    </div>
                    <ul>
                        <TituloLista />
                        {alunos.length > 0 &&
                            alunos.map((aluno) => {
                                // Verifica se o aluno está pendente
                                const estaPendente = alunosPendentes.has(aluno.id);
                                return (
                                    <ListaAlunos
                                        key={aluno.matricula}
                                        id={aluno.matricula}
                                        vencido={estaPendente ? <span style={{color:'red', fontWeight:'bold'}} title="Boleto vencido">⚠️</span> : null}
                                        nome={aluno.nome}
                                        responsavel={aluno.resp_financeiro ? aluno.resp_financeiro : ''}
                                        data={aluno.data ? (() => {
                                            const data = new Date(aluno.data);
                                            const dia = String(data.getDate()).padStart(2, '0');
                                            const mes = String(data.getMonth() + 1).padStart(2, '0');
                                            const ano = data.getFullYear();
                                            return `${dia}/${mes}/${ano}`;
                                        })() : 'Não informada'}
                                        turma={aluno.turma ? aluno.turma.nome : ''}
                                        turno={aluno.turno ? aluno.turno.nome : ''}
                                        icone={<CiCircleMore />}
                                        link={`/PaginaAluno/${aluno.id}`}
                                    />
                                );
                            })}
                    </ul>
                </>
            )}

        </>
    )
}

export default Home;