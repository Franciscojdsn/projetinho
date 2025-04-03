import { useEffect, useState } from 'react';
import { CiCircleMore } from "react-icons/ci";
import { useLocation } from "react-router-dom";

import styles from './Home.module.css'
import InfoAlunos from '../../componentes/InfoAlunos/InfoAlunos';
import ListaAlunos from '../../componentes/ListaAlunos/ListaAlunos';
import TituloLista from '../../componentes/TituloLista/TituloLista';

const Home = () => {

    const [alunos, setAlunos] = useState([])

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null); // Remove a mensagem após 5 segundos
            }, 5000);

            return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
        }
    }, [message]);

    useEffect(() => {
        fetch('http://localhost:5000/alunos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setAlunos(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.sucessmessage}>
                {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
                {/* Resto do código da página */}
            </div>
            <InfoAlunos />
            <ul>
                <TituloLista />
                {alunos.length > 0 &&
                    alunos.map((aluno) => {
                        return (
                            <ListaAlunos
                                id={aluno.matricula}
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
    )
}

export default Home;