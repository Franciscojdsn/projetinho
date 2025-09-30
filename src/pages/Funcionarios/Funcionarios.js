import React, { useState, useEffect } from "react";
import InfoFuncionarios from "../../componentes/InfoFuncionarios/InfoFuncionarios";
import ListaFuncionarios from "../../componentes/ListaFuncionarios/ListaFuncionarios";
import { CiCircleMore } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Funcionarios.module.css"

const Funcionarios = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const [funcionarios, setFuncionarios] = useState()

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
        fetch('http://localhost:5000/funcionarios', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setFuncionarios(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div>
                {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
            </div>
            <InfoFuncionarios />
            {funcionarios?.map((funcionario) => (

                <ListaFuncionarios
                    key={funcionario.id}
                    id={funcionario.matricula}
                    nome={funcionario.nome_funcionario}
                    responsavel={funcionario.resp_financeiro ? funcionario.resp_financeiro : ''}
                    data={funcionario.data ? (() => {
                        const data = new Date(funcionario.data);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    })() : 'Não informada'}
                    turma={funcionario.turma ? funcionario.turma.nome : ''}
                    turno={funcionario.turno ? funcionario.turno.nome : ''}
                    icone={<CiCircleMore />}
                    link={`/PaginaFuncionario/${funcionario.id}`}
                />
            ))}
        </>
    )
}

export default Funcionarios;