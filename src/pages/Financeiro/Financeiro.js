import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai"; // Importa ícone de deletar

import styles from "./Financeiro.module.css"
import DadosFinanceiros from "../../componentes/DadosFinanceiros/DadosFinanceiros";
import Botao from "../../componentes/Botao/index";
import Popup from "../../componentes/Formulario/Popup/Popup";
import Loading from "../../componentes/Formulario/Componentes/Loading/Loading";
import ListaFinanceiro from "../../componentes/ListaFinanceiro/ListaFinanceiro";
import EditarPopup from "../../componentes/Formulario/EditarPopup/EditarPopup";

const Financeiro = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [atividadeEditando, setAtividadeEditando] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [dados, setDados] = useState({});
    const [nextId, setNextId] = useState(1);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    };

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
        fetch('http://localhost:5000/renda_complementar', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setDados(data);

                // Calcula o próximo ID com base no maior ID existente
                const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
                setNextId(maxId + 1);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    function toggleEditMode(atividade) {
        setAtividadeEditando(atividade);
        setIsEditing(true);
    }

    function handleChangeReais(e) {
        const { name, value } = e.target;

        // Remove caracteres não numéricos
        const numericValue = value.replace(/\D/g, '');

        // Formata o valor como reais
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numericValue / 100); // Divide por 100 para considerar os centavos

        // Atualiza apenas o campo específico no estado
        setDados((prevDados) => ({
            ...prevDados,
            [name]: formattedValue,
        }));
    }

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }

    const submit = (e) => {
        e.preventDefault();

        // Valida e ajusta os dados antes de enviar
        const dadosValidados = {
            nome_atividade: dados.nome_atividade || "",
            valor_atividade: dados.valor_atividade || "0",
        };

        handleSubmit(dadosValidados);
    };

    function handleSubmit(dados) {

        if (!dados.nome_atividade || dados.nome_atividade.trim() === '') {
            alert('O campo "Nome da Atividade" é obrigatório.');
            return;
        }

        const dadosAtualizados = {
            ...dados,
            id: nextId,
            nome_atividade: dados.nome_atividade?.trim() || "atividade sem nome",
            valor_atividade: parseFloat(dados.valor_atividade.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
        };

        fetch('http://localhost:5000/renda_complementar/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then((resp) => resp.json())
            .then((dadosAtualizados) => {
                console.log("Dados enviados:", dadosAtualizados);
                setShowPopup(false);
                navigate(`/Financeiro`, { state: { message: 'Atividade criada com sucesso!' } });
                window.scrollTo(0, 0);
                window.location.reload();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    // Função para excluir uma renda complementar
    function handleDeleteRenda(id) {
        if (window.confirm("Tem certeza que deseja excluir esta renda complementar?")) {
            setIsLoading(true);
            fetch(`http://localhost:5000/renda_complementar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => {
                    if (resp.ok) {
                        navigate(`/Financeiro`, { state: { message: 'Renda complementar excluída com sucesso!' } });
                        window.scrollTo(0, 0);
                        window.location.reload();
                    } else {
                        alert('Erro ao excluir a renda complementar.');
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <DadosFinanceiros />
                    {message && ( // Exibe a mensagem, se existir
                        <div className={styles.successmessage}>
                            <p>{message}</p>
                        </div>
                    )}
                    <div className={styles.containerrendacomplementar}>
                        <div>
                            <h2>Renda Complementar</h2>
                        </div>
                        <div>
                            <Botao
                                icone={<MdFormatListBulletedAdd />}
                                title="Nova Renda"
                                classname={styles.botao}
                                onclick={() => setShowPopup(true)}
                            />
                        </div>
                    </div>

                    {isEditing && atividadeEditando && (
                        <EditarPopup
                        // Editar atividade complementar
                        atividade={atividadeEditando}
                        setIsEditing={setIsEditing}
                        />
                    )}
                    {showPopup && (
                    // Popup para adicionar/editar nova renda complementar
                        <Popup
                            showPopup={showPopup}
                            dados={dados}
                            handleInputChange={handleInputChange}
                            handleChangeReais={handleChangeReais}
                            submit={submit}
                            fechar={() => setShowPopup(false)}
                        />
                    )}
                    <>
                        <div className={styles.containerlista}>
                            <ul>
                                {dados.length > 0 &&
                                    dados.map((data) => {
                                        return (
                                            <ListaFinanceiro
                                                key={data.id}
                                                id={data.id}
                                                nome={data.nome_atividade}
                                                valor={formatarParaReais(data.valor_atividade)}
                                                icone={
                                                    <div style={{ display: "flex", gap: "8px" }}>
                                                        <Botao
                                                            title="Editar"
                                                            classname={styles.botao3}
                                                            onclick={() => toggleEditMode(data)}
                                                            icone={<AiOutlineEdit />}
                                                        />
                                                        <Botao
                                                            title="Excluir"
                                                            classname={styles.botao4}
                                                            onclick={() => handleDeleteRenda(data.id)}
                                                            icone={<AiOutlineDelete />}
                                                        />
                                                    </div>
                                                }
                                            />
                                        );
                                    })}
                            </ul>
                        </div>
                    </>


                </>

            )}
        </>
    )
}

export default Financeiro;