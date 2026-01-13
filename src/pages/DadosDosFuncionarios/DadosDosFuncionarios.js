import styles from "./DadosDosFuncionarios.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react';

import InfoDosFuncionarios from "../../componentes/Formulario/InfoDosFuncionarios/InfoDosFuncionarios";
import Cabecalho from "../../componentes/Formulario/Cabecalho/Cabecalho";


const DadosDosFuncionarios = () => {

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

    function addFuncionario(dados) {
        // Busca todos os alunos para determinar o maior número de matrícula
        fetch('http://localhost:5000/funcionarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((funcionario) => {
                // Determina o próximo número de matrícula
                const ultimoFuncionario = funcionario.length > 0
                    ? Math.max(...funcionario.map((aluno) => aluno.matricula || 0))
                    : 0;
                const novoFuncionario = ultimoFuncionario + 1;
    
                dados.matricula = novoFuncionario;
    
                // Adiciona o ID único ao objeto `dados`
                dados.id = uuid();

    
                // Envia os dados para o servidor
                return fetch('http://localhost:5000/funcionarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados),
                });
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("funcionario criado com sucesso:", data);
                navigate(`/Funcionarios`, { state: { message: 'Dados do funcionário salvo com sucesso!' } });
                window.scrollTo(0, 0);
            })
            .catch((err) => console.log("Erro ao adicionar funcionário:", err));
    }

    return (
        <>
            <div className={styles.containerdados}>
                <Cabecalho />
                <InfoDosFuncionarios
                    handleSubmit={addFuncionario}
                />
            </div>
        </>
    )
}

export default DadosDosFuncionarios;