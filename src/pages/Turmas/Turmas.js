import React, { useState, useEffect } from "react";
import InfoTurmas from "../../componentes/InfoTurmas/InfoTurmas";
import ListaFuncionarios from "../../componentes/ListaFuncionarios/ListaFuncionarios";
import { CiCircleMore } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Turmas.module.css"

export default function Turmas ({}) {

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const [turmas, setTurmas] = useState()

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
            }, 4000);

            return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
        }
    }, [message]);

    useEffect(() => {
        fetch('http://localhost:5000/turmas', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setTurmas(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div>
                {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
            </div>
            <InfoTurmas />
            {turmas?.map((turma) => (

                <ListaFuncionarios
                    key={turma.id}
                    id={turma.matricula}
                    nome={turma.nome_turma ? turma.nome_turma : ''}
                    responsavel={turma.turma_turno ? turma.turma_turno : ''}
                    data={turma.data_funcionario ? (() => {
                        const data = new Date(turma.data_funcionario);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    })() : 'Não informada'}
                    turma={turma.funcao ? turma.funcao : ''}
                    turno={turma.telefone1_funcionario ? turma.telefone1_funcionario : ''}
                    icone={<CiCircleMore />}
                    link={`/DadosTurmas/${turma.id}`}
                />
            ))}
        </>
    )
}