import { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import styles from './PaginaFinanceiro.module.css';
import Botao from '../../componentes/Botao';
import ExibirFinanceiro from '../../componentes/Formulario/Componentes/ExibirFinanceiro/ExibirFinanceiro';
import EditarFinanceiro from '../../componentes/Formulario/EditarFinanceiro/EditarFinanceiro';

function PaginaFinanceiro({ handleSubmit, dadosData }) {

    const { id } = useParams();

    const [dados, setDados] = useState({ dadosData, id })
    const [alunos, setAlunos] = useState(null);

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);


    const [isEditing, setIsEditing] = useState(false);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
    }

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
        fetch(`http://localhost:5000/alunos/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAlunos(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

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
                navigate(`/PaginaAluno/${id}`, { state: { message: 'Financeiro editado com sucesso!' } });
            })
            .catch((err) => console.log(err))
    }

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
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
            <div>
                {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
                {/* Resto do código da página */}
            </div>
            {isEditing ? (
                <EditarFinanceiro aluno={dados} setIsEditing={setIsEditing}/>
            ) : (
                <div className={styles.container}>
                    <ExibirFinanceiro
                        type="text"
                        text="Valor da Mensalidade:"
                        name="valor_mensalidade"
                        valor_mensalidade={formatarParaReais(dados.valor_mensalidade)}
                        desconto={formatarParaReais(dados.desconto)}
                        dia_vencimento={dados.dia_vencimento}
                        meses={dados.meses ? dados.meses.nome : ''}
                        total={formatarParaReais(dados.valor_mensalidade - dados.desconto)}
                        handleOnChange={handleChange}
                    />
                </div>
            )}
            <div className={styles.containerbotao}>
                <Link to={`/PaginaAluno/${id}`}>
                    <Botao
                        title={"Voltar"}
                        classname={styles.botao4}
                        icone={<IoArrowBack />}
                    />
                </Link>
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