import styles from "./DadosTurmas.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react';

import { useParams, Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Botao from "../../componentes/Botao";
import Loading from "../../componentes/Formulario/Componentes/Loading/Loading";

import InputExibirTurmas from "../../componentes/Formulario/Componentes/InputExibirTurmas/InputExibirTurmas";
import EditarDadosTurmas from "../../componentes/Formulario/EditarDadosTurmas/EditarDadosTurmas";


export default function DadosTurmas({ }) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [turmas, setTurmas] = useState([])

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);

    const [isEditing, setIsEditing] = useState(false);
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
        // Busca os dados do funcionario pelo ID
        setIsLoading(true);
        fetch(`http://localhost:5000/turmas/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setTurmas(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [id]);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
    }

    function handleEdit(updatedData) {
        fetch(`http://localhost:5000/turmas/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar apenas os campos alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Envia os dados atualizados
        })
            .then((resp) => {
                if (resp.ok) {
                    // Atualiza os dados do aluno no estado
                    navigate(`/DadosTurmas/${id}`, { state: { message: 'Funcionario atualizado com sucesso!' } });
                    setTurmas((prevTurmas) => ({ ...prevTurmas, ...updatedData }));
                    setIsEditing(false) // Redireciona para a página do aluno após a atualização
                    window.scrollTo(0, 0);
                } else {
                    alert("Erro ao atualizar os dados da turma.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados da turma:", err));
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
            // Exclui os dados do aluno na tabela `alunos`
            fetch(`http://localhost:5000/turmas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => {
                    if (resp.ok) {
                        navigate(`/Turmas`, { state: { message: 'Turma excluída com sucesso!' } });
                        window.scrollTo(0, 0);
                    } else {
                        throw new Error("Erro ao excluir a turma.");
                    }
                })
                .catch((err) => console.log("Erro ao excluir a turma:", err));
        }
    }

return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
                    </div>
                    <div className={styles.containerdados}>
                        {isEditing ? (
                            <EditarDadosTurmas aluno={turmas} onSave={handleEdit} />
                        ) : (
                            <>
                                {turmas && (
                                    <>
                                        <div className={styles.containercabecalho2}>
                                            <img
                                                src={turmas.imagem}
                                                alt="Foto do Aluno"
                                            />
                                        </div>

                                        <div className={styles.containercabecalho}>
                                            <InputExibirTurmas
                                                nome_turma={turmas.nome_turma}
                                                inicio_aulas={turmas.inicio_aulas ? (() => {
                                                    const data = new Date(turmas.inicio_aulas);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                previsao_aulas={turmas.previsao_aulas ? (() => {
                                                    const data = new Date(turmas.previsao_aulas);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                turma_turno={turmas.turma_turno}
                                                turma_professor={turmas.turma_professor}
                                                turma_diasletivos={turmas.turma_diasletivos}
                                                
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        <div className={styles.containerbotao}>
                            <Botao
                                title={isEditing ? "Cancelar" : "Editar"}
                                classname={styles.botao}
                                icone={<AiOutlineEdit />}
                                onclick={toggleEditMode} // Alterna entre os modos de edição e exibição
                            />
                            <Botao
                                title="excluir"
                                classname={styles.botao4}
                                icone={<IoTrashBinOutline />}
                                onclick={handleDelete} // Adiciona a função de exclusão ao botão
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}