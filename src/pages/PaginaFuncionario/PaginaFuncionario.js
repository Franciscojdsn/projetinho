import { useEffect, useState } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import styles from './PaginaFuncionario.module.css';
import Botao from '../../componentes/Botao';
import EditarDadosFuncionario from '../../componentes/Formulario/EditarDadosFuncionario/EditarDadosFuncionario';
import Loading from '../../componentes/Formulario/Componentes/Loading/Loading';
import InputExibirFuncionario from '../../componentes/Formulario/Componentes/InputExibirFuncionario/InputExibirFuncionario';

function PaginaFuncionario() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [funcionarios, setFuncionarios] = useState([])

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
        fetch(`http://localhost:5000/funcionarios/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setFuncionarios(data);
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
        fetch(`http://localhost:5000/funcionarios/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar apenas os campos alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Envia os dados atualizados
        })
            .then((resp) => {
                if (resp.ok) {
                    // Atualiza os dados do aluno no estado
                    navigate(`/PaginaFuncionario/${id}`, { state: { message: 'Funcionario atualizado com sucesso!' } });
                    setFuncionarios((prevFuncionarios) => ({ ...prevFuncionarios, ...updatedData }));
                    setIsEditing(false) // Redireciona para a página do aluno após a atualização
                    window.scrollTo(0, 0);
                } else {
                    alert("Erro ao atualizar os dados do aluno.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados do aluno:", err));
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este funcionario?")) {
            // Exclui os dados do aluno na tabela `alunos`
            fetch(`http://localhost:5000/funcionarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => {
                    if (resp.ok) {
                        navigate(`/Funcionarios`, { state: { message: 'Funcionario exlcuído com sucesso!' } });
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
                            <EditarDadosFuncionario aluno={funcionarios} onSave={handleEdit} />
                        ) : (
                            <>
                                {funcionarios && (
                                    <>
                                        <div className={styles.containercabecalho2}>
                                            <img
                                                src={funcionarios.imagem}
                                                alt="Foto do Aluno"
                                            />
                                            <div>
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
                                            <InputExibirFuncionario
                                                nome_funcionario={funcionarios.nome_funcionario}
                                                data_funcionario={funcionarios.data_funcionario ? (() => {
                                                    const data = new Date(funcionarios.data_funcionario);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                naturalidade={funcionarios.naturalidade_funcionario}
                                                genero={funcionarios.sexo}
                                                cpf_funcionario={funcionarios.cpf_funcionario ? formatCPF(funcionarios.cpf_funcionario) : 'Não informado'}
                                                endereco_funcionario={funcionarios.endereco_funcionario}
                                                n_funcionario={funcionarios.n_funcionario}
                                                cidade_funcionario={funcionarios.cidade_funcionario}
                                                bairro_funcionario={funcionarios.bairro_funcionario}
                                                cep_funcionario={funcionarios.cep_funcionario ? formatCEP(funcionarios.cep_funcionario) : 'Não informado'}
                                                nome_mae={funcionarios.nome_da_mae}
                                                data_da_entrada_funcionario={funcionarios.data_da_entrada_funcionario ? (() => {
                                                    const data = new Date(funcionarios.data_da_entrada_funcionario);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                cpf_mae={funcionarios.cpf_da_mae ? formatCPF(funcionarios.cpf_da_mae) : 'Não informado'}
                                                rg_funcionario={funcionarios.rg_funcionario ? formatRG(funcionarios.rg_funcionario) : 'Não informado'}
                                                telefone1_funcionario={funcionarios.telefone1_funcionario ? formatTelefone(funcionarios.telefone1_funcionario) : 'Não informado'}
                                                telefone2_funcionario={funcionarios.telefone2_funcionario ? formatTelefone(funcionarios.telefone2_funcionario) : 'Não informado'}
                                                funcao={funcionarios.funcao}
                                                pix_funcionario={funcionarios.pix_funcionario}
                                                agencia_funcionario={funcionarios.agencia_funcionario}
                                                n_conta_funcionario={funcionarios.n_conta_funcionario}
                                                digito_funcionario={funcionarios.digito_funcionario}
                                                banco_funcionario={funcionarios.banco_funcionario}
                                                salario={funcionarios.salario}
                                                email_funcionario={funcionarios.email_funcionario}
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

export default PaginaFuncionario;