import { useEffect, useState } from 'react';
import { TfiSave } from "react-icons/tfi";
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './PaginaFinanceiro.module.css';
import Botao from '../../componentes/Botao';
import ExibirFinanceiro from '../../componentes/Formulario/Componentes/ExibirFinanceiro/ExibirFinanceiro';
import EditarFinanceiro from '../../componentes/Formulario/EditarFinanceiro/EditarFinanceiro';

function PaginaFinanceiro({ handleSubmit, dadosData }) {

    const navigate = useNavigate()
    const { id } = useParams();

    const [dados, setDados] = useState({ dadosData, id })
    const [alunos, setAlunos] = useState(null);

    const [meses, setMeses] = useState([])

    const [isEditing, setIsEditing] = useState(false);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
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

    useEffect(() => {
        fetch('http://localhost:5000/meses', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setMeses(data)
            })
            .catch((err) => console.log(err))

    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(dados)
        handleSubmit(dados)
    }

    function handleChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
        console.log(dados)
    }

    function handleSubmit(dados) {

        fetch(`http://localhost:5000/financeiro/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Dados financeiros criados:", data);
                navigate(`/PaginaAluno/${dados.id}`, { state: { message: 'Projeto criado com sucesso!' } })
            })
            .catch((err) => console.log(err))
    }

    function handleEdit(updatedData) {
        fetch(`http://localhost:5000/financeiro/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar apenas os campos alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Envia os dados atualizados
        })
            .then((resp) => {
                if (resp.ok) {
                    alert("Dados financeiros atualizados com sucesso!");
                    // Atualiza os dados financeiros no estado local
                    setDados((prevDados) => ({ ...prevDados, ...updatedData }));
                    setIsEditing(false); // Sai do modo de edição
                } else {
                    alert("Erro ao atualizar os dados financeiros.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados financeiros:", err));
    }

    useEffect(() => {
        // Busca os dados do aluno pelo ID
        fetch(`http://localhost:5000/financeiro/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setDados(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            {alunos && (
                <>
                    <div className={styles.cabecalho}>
                        <div>
                            <h1>Aluno: {alunos.nome}</h1>
                            <h1>Responsável: {alunos.resp_financeiro}</h1>
                        </div>
                        <img
                            src={alunos.imagem} // Exibe a imagem do primeiro aluno
                            alt="Foto do Aluno"
                        />
                    </div>
                </>
            )}
            {isEditing ? (
                <EditarFinanceiro aluno={dados} onSave={handleEdit} />
            ) : (
                <div className={styles.container}>
                    <ExibirFinanceiro
                        type="text"
                        text="Valor da Mensalidade:"
                        name="valor_mensalidade"
                        valor_mensalidade={dados.valor_mensalidade}
                        desconto={dados.desconto}
                        dia_vencimento={dados.dia_vencimento}
                        meses={dados.meses ? dados.meses.mes : ''}
                        handleOnChange={handleChange}
                    />
                </div>
            )}
            <div className={styles.containerbotao}>
                <Botao
                    title={isEditing ? "Cancelar" : "Editar"}
                    classname={styles.botao}
                    icone={<AiOutlineEdit />}
                    onclick={toggleEditMode} // Alterna entre os modos de edição e exibição
                />
            </div>
        </>
    )
}

export default PaginaFinanceiro;