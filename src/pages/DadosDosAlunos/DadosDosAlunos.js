import styles from "./DadosDosAlunos.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react';

import InfoDosAlunos from "../../componentes/Formulario/InfoDosAlunos/InfoDosAlunos";
import Cabecalho from "../../componentes/Formulario/Cabecalho/Cabecalho";


const DadosDosAlunos = () => {

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const navigate = useNavigate()

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

    function addAluno(dados) {
        // Busca todos os alunos para determinar o maior número de matrícula
        fetch('http://localhost:5000/alunos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((alunos) => {
                // Determina o próximo número de matrícula
                const ultimaMatricula = alunos.length > 0
                    ? Math.max(...alunos.map((aluno) => aluno.matricula || 0))
                    : 0;
                const novaMatricula = ultimaMatricula + 1;
    
                dados.matricula = novaMatricula;
    
                // Adiciona o ID único ao objeto `dados`
                dados.id = uuid();

    
                // Envia os dados para o servidor
                return fetch('http://localhost:5000/alunos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados),
                });
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Aluno criado com sucesso:", data);
                navigate(`/DadosDosAlunos/Financeiro/${dados.id}`, { state: { message: 'Dados do aluno salvo com sucesso!' } });
                window.scrollTo(0, 0);
            })
            .catch((err) => console.log("Erro ao adicionar aluno:", err));
    }

    return (
        <>
            <div className={styles.containerdados}>
                <Cabecalho />
                <InfoDosAlunos
                    handleSubmit={addAluno}
                />
            </div>
        </>
    )
}

export default DadosDosAlunos;