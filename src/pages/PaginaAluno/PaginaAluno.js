import { useEffect, useState } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import styles from './PaginaAluno.module.css';
import InputExibir from '../../componentes/Formulario//Componentes/InputExibir/InputExibir';
import Botao from '../../componentes/Botao';
import EditarDados from '../../componentes/Formulario/EditarDados/EditarDados';
import Loading from '../../componentes/Formulario/Componentes/Loading/Loading';

function PaginaAluno() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [alunos, setAlunos] = useState([])

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
        // Busca os dados do aluno pelo ID
        setIsLoading(true);
        fetch(`http://localhost:5000/alunos/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAlunos(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [id]);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
    }

    function formatCPF(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    }

    function formatRG(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3'); // Adiciona os pontos
    }

    function formatTelefone(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses no DDD
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Adiciona o traço
    }

    function formatCEP(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{5})(\d{3})$/, '$1-$2'); // Adiciona o traço
    }

    function handleEdit(updatedData) {
        fetch(`http://localhost:5000/alunos/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar apenas os campos alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Envia os dados atualizados
        })
            .then((resp) => {
                if (resp.ok) {
                    // Atualiza os dados do aluno no estado
                    navigate(`/PaginaAluno/${id}`, { state: { message: 'Aluno atualizado com sucesso!' } });
                    setAlunos((prevAlunos) => ({ ...prevAlunos, ...updatedData }));
                    setIsEditing(false) // Redireciona para a página do aluno após a atualização
                    window.scrollTo(0, 0);
                } else {
                    alert("Erro ao atualizar os dados do aluno.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados do aluno:", err));
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
            // Exclui os dados do aluno na tabela `alunos`
            fetch(`http://localhost:5000/alunos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => {
                    if (resp.ok) {
                        // Após excluir o aluno, exclui os dados financeiros correspondentes
                        return fetch(`http://localhost:5000/financeiro/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    } else {
                        throw new Error("Erro ao excluir o aluno.");
                    }
                })
                .then((resp) => {
                    if (resp.ok) {
                        navigate(`/`, { state: { message: 'Aluno exlcuído com sucesso!' } });
                        window.scrollTo(0, 0);
                    } else {
                        throw new Error("Erro ao excluir os dados financeiros.");
                    }
                })
                .catch((err) => console.log("Erro ao excluir o aluno ou os dados financeiros:", err));
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
                            <EditarDados aluno={alunos} onSave={handleEdit} />
                        ) : (
                            <>
                                {alunos && (
                                    <>
                                        <div className={styles.containercabecalho2}>
                                            <img
                                                src={alunos.imagem}
                                                alt="Foto do Aluno"
                                            />
                                            <div>
                                                <Botao
                                                    title="Histórico"
                                                    classname={styles.botao3}
                                                    icone={<AiOutlineEdit />}
                                                />
                                                <Link to={`/PaginaFinanceiro/${id}`}>
                                                    <Botao
                                                        title="Financeiro"
                                                        classname={styles.botao3}
                                                        icone={<AiOutlineEdit />}
                                                    />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className={styles.containercabecalho}>
                                            <InputExibir
                                                nome_aluno={alunos.nome}
                                                data_nasc={alunos.data ? (() => {
                                                    const data = new Date(alunos.data);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                naturalidade={alunos.naturalidade}
                                                genero={alunos.sexo}
                                                cpf_aluno={alunos.cpf ? formatCPF(alunos.cpf) : 'Não informado'}
                                                turma={alunos.turma ? alunos.turma.nome : ''}
                                                turno={alunos.turno ? alunos.turno.nome : ''}
                                                endereco_aluno={alunos.endereco}
                                                n_aluno={alunos.n}
                                                cidade_aluno={alunos.cidade}
                                                bairro_aluno={alunos.bairro}
                                                cep_aluno={alunos.cep ? formatCEP(alunos.cep) : 'Não informado'}
                                                nome_mae={alunos.nome_da_mae}
                                                data_mae={alunos.data_da_mae ? (() => {
                                                    const data = new Date(alunos.data_da_mae);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                cpf_mae={alunos.cpf_da_mae ? formatCPF(alunos.cpf_da_mae) : 'Não informado'}
                                                rg_mae={alunos.rg_da_mae ? formatRG(alunos.rg_da_mae) : 'Não informado'}
                                                telefone1_mae={alunos.telefone1_da_mae ? formatTelefone(alunos.telefone1_da_mae) : 'Não informado'}
                                                telefone2_mae={alunos.telefone2_da_mae ? formatTelefone(alunos.telefone2_da_mae) : 'Não informado'}
                                                endereco_mae={alunos.endereco_da_mae}
                                                n_mae={alunos.n_da_mae}
                                                cidade_mae={alunos.cidade_da_mae}
                                                bairro_mae={alunos.bairro_da_mae}
                                                cep_mae={alunos.cep_da_mae ? formatCEP(alunos.cep_da_mae) : 'Não informado'}
                                                email_mae={alunos.email_da_mae}
                                                nome_pai={alunos.nome_do_pai}
                                                data_pai={alunos.data_do_pai ? (() => {
                                                    const data = new Date(alunos.data_do_pai);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                cpf_pai={alunos.cpf_do_pai ? formatCPF(alunos.cpf_do_pai) : 'Não informado'}
                                                rg_pai={alunos.rg_do_pai ? formatRG(alunos.rg_do_pai) : 'Não informado'}
                                                telefone1_pai={alunos.telefone1_do_pai ? formatTelefone(alunos.telefone1_do_pai) : 'Não informado'}
                                                telefone2_pai={alunos.telefone2_do_pai ? formatTelefone(alunos.telefone2_do_pai) : 'Não informado'}
                                                endereco_pai={alunos.endereco_do_pai}
                                                n_pai={alunos.n_do_pai}
                                                cidade_pai={alunos.cidade_do_pai}
                                                bairro_pai={alunos.bairro_do_pai}
                                                cep_pai={alunos.cep_do_pai ? formatCEP(alunos.cep_do_pai) : 'Não informado'}
                                                email_pai={alunos.email_do_pai}
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

export default PaginaAluno;