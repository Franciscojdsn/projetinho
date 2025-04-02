import { useEffect, useState } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './PaginaAluno.module.css';
import InputExibir from '../../componentes/Formulario//Componentes/InputExibir/InputExibir';
import Botao from '../../componentes/Botao';
import EditarDados from '../../componentes/Formulario/EditarDados/EditarDados';

function PaginaAluno() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [alunos, setAlunos] = useState([])

    const [isEditing, setIsEditing] = useState(false);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
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
                    setAlunos((prevAlunos) => ({ ...prevAlunos, ...updatedData }));
                    setIsEditing(false) // Redireciona para a página do aluno após a atualização
                } else {
                    alert("Erro ao atualizar os dados do aluno.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados do aluno:", err));
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
            fetch(`http://localhost:5000/alunos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => {
                    if (resp.ok) {
                        alert("Aluno excluído com sucesso!");
                        navigate('/'); // Redireciona para a página inicial após a exclusão
                    } else {
                        alert("Erro ao excluir o aluno.");
                    }
                })
                .catch((err) => console.log("Erro ao excluir o aluno:", err));
        }
    }

    useEffect(() => {
        // Busca os dados do aluno pelo ID
        fetch(`http://localhost:5000/alunos/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAlunos(data);
            })
            .catch((err) => console.log(err));
    }, [id]);


    return (
        <>
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
                                        <Link to="">
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
                                        cpf_aluno={alunos.cpf}
                                        turma={alunos.turma ? alunos.turma.nome : ''}
                                        turno={alunos.turno ? alunos.turma.nome : ''}
                                        endereco_aluno={alunos.endereco}
                                        n_aluno={alunos.n}
                                        cidade_aluno={alunos.cidade}
                                        bairro_aluno={alunos.bairro}
                                        cep_aluno={alunos.cep}
                                        nome_mae={alunos.nome_da_mae}
                                        data_mae={alunos.data_da_mae ? (() => {
                                            const data = new Date(alunos.data_da_mae);
                                            const dia = String(data.getDate()).padStart(2, '0');
                                            const mes = String(data.getMonth() + 1).padStart(2, '0');
                                            const ano = data.getFullYear();
                                            return `${dia}/${mes}/${ano}`;
                                        })() : 'Não informada'}
                                        cpf_mae={alunos.cpf_da_mae}
                                        rg_mae={alunos.rg_da_mae}
                                        telefone1_mae={alunos.telefone1_da_mae}
                                        telefone2_mae={alunos.telefone2_da_mae}
                                        endereco_mae={alunos.endereco_da_mae}
                                        n_mae={alunos.n_da_mae}
                                        cidade_mae={alunos.cidade_da_mae}
                                        bairro_mae={alunos.bairro_da_mae}
                                        cep_mae={alunos.cep_da_mae}
                                        email_mae={alunos.email_da_mae}
                                        nome_pai={alunos.nome_do_pai}
                                        data_pai={alunos.data_do_pai ? (() => {
                                            const data = new Date(alunos.data_do_pai);
                                            const dia = String(data.getDate()).padStart(2, '0');
                                            const mes = String(data.getMonth() + 1).padStart(2, '0');
                                            const ano = data.getFullYear();
                                            return `${dia}/${mes}/${ano}`;
                                        })() : 'Não informada'}
                                        cpf_pai={alunos.cpf_do_pai}
                                        rg_pai={alunos.rg_do_pai}
                                        telefone1_pai={alunos.telefone1_do_pai}
                                        telefone2_pai={alunos.telefone2_do_pai}
                                        endereco_pai={alunos.endereco_do_pai}
                                        n_pai={alunos.n_do_pai}
                                        cidade_pai={alunos.cidade_do_pai}
                                        bairro_pai={alunos.bairro_do_pai}
                                        cep_pai={alunos.cep_do_pai}
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
    )

}

export default PaginaAluno;