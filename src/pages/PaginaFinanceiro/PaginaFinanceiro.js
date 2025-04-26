import { useEffect, useState, useCallback } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import styles from './PaginaFinanceiro.module.css';
import Botao from '../../componentes/Botao';
import ExibirFinanceiro from '../../componentes/Formulario/Componentes/ExibirFinanceiro/ExibirFinanceiro';
import EditarFinanceiro from '../../componentes/Formulario/EditarFinanceiro/EditarFinanceiro';
import ListaBoletos from '../../componentes/ListaBoletos/ListaBoletos';
import Loading from '../../componentes/Formulario/Componentes/Loading/Loading';

function PaginaFinanceiro({ dadosData }) {

    const { id } = useParams();

    const [dados, setDados] = useState({ dadosData, id })
    const [alunos, setAlunos] = useState(null);

    const navigate = useNavigate()
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);

    const [boletos, setBoletos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    
    const gerarBoletos = useCallback((financeiro) => {
        const boletosGerados = [];
        const { meses, total_mensalidade, dia_vencimento, desconto, valor_matricula, desconto_matricula } = financeiro;
        
        if (!meses || !meses.id) return;
        
        const mesInicio = parseInt(meses.id); // ID do mês de início (ex.: 1 = Janeiro)
        const anoAtual = new Date().getFullYear();
        const _desconto = parseFloat(desconto) || 0;
        const _descontoMatricula = parseFloat(desconto_matricula) || 0;
        const _valorMatricula = parseFloat(valor_matricula) || 0;
        
        for (let i = mesInicio; i < 12; i++) { // Gera 12 boletos (1 ano)
            const mes = i; // Calcula o mês (1 a 12)
            
            const dataVencimento = new Date(anoAtual, mes, dia_vencimento || 1); // Define a data de vencimento
            const dataMatricula = new Date; // Data de matrícula
            boletosGerados.push({
                id: i + 1,
                mes: dataVencimento.toLocaleString('pt-BR', { month: 'long' }),
                ano: dataVencimento.getFullYear(),
                valor: formatarParaReais(total_mensalidade),
                valorMatricula: formatarParaReais(_valorMatricula - _descontoMatricula),
                dataVencimento: dataVencimento.toLocaleDateString('pt-BR'),
                dataMatricula: dataMatricula.toLocaleDateString('pt-BR'),
                mesMatricula: dataMatricula.toLocaleString('pt-BR', { month: 'long' }),
            });
        }
        
        setBoletos(boletosGerados);
        
    }, [setBoletos]);
    
    const valorBoleto = (() => {
        const valorBoleto = boletos.valor;
        return valorBoleto
    })();
    
    function toggleEditMode() {
        setIsEditing((prev) => !prev);
    }
    
    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [message]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/alunos/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAlunos(data);
            })
            .catch((err) => console.log(err));
    }, [id]);
    
    useEffect(() => {// Busca os dados do financeiro pelo ID
        setIsLoading(true);
        fetch(`http://localhost:5000/financeiro/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
                setDados(data);
                gerarBoletos(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
        }, [id, gerarBoletos]);

    function handleChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
        console.log(dados)
    }

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }
    
    console.log("boletos:", dados)
    
    function boletoPago(e) {
        e.preventDefault()
        
        const dadosAtualizados = {
            ...dados,
            boletos_pagos: {
                valor: dados.total_mensalidade,
                mes: "teste",
                ano: boletos.ano,
            },
            
        };
        
        fetch(`http://localhost:5000/financeiro/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar os dados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then(() => {
                console.log("dados atualizados:", dadosAtualizados)
                window.location.reload();
                navigate(`/PaginaFinanceiro/${id}`, { state: { message: 'Financeiro editado com sucesso!' } });
            })
            .catch((err) => console.log('Erro ao salvar os dados financeiros:', err));
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {alunos && (
                        <>
                            <div className={styles.cabecalho}>
                                <div>
                                    <h1>Aluno: {alunos.nome}</h1>
                                    <h1>Responsável: {alunos.resp_financeiro}</h1>
                                </div>
                                <img
                                    src={alunos.imagem}
                                    alt="Foto do Aluno"
                                />
                            </div>
                        </>
                    )}
                    <div>
                        {message && <div className={styles.successmessage}>{message}</div>}
                    </div>
                    <div className={styles.containerboletos}>
                        <ul>
                            {boletos.length > 0 && (
                                <>
                                    <ListaBoletos
                                        key={boletos[0].matricula}
                                        mes_referente={boletos[0].mesMatricula}
                                        vencimento={boletos[0].dataMatricula}
                                        valor={boletos[0].valorMatricula}
                                        botao={"icone de pago"}
                                    />
                                </>

                            )}
                            {boletos.map((boleto) => (
                                <>
                                    <ListaBoletos
                                        key={boleto.matricula}
                                        mes_referente={boleto.mes}
                                        vencimento={boleto.dataVencimento}
                                        valor={boleto.valor}
                                        botao={<Botao
                                            title={<IoTrashBinOutline />}
                                            classname={styles.botao2}
                                            onclick={boletoPago}
                                        />}
                                    />

                                </>

                            ))}
                        </ul>
                    </div>
                    {isEditing ? (
                        <EditarFinanceiro aluno={dados} setIsEditing={setIsEditing} />
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
                                total={formatarParaReais(dados.total_mensalidade)}
                                atividade={dados.renda_complementar || []}
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
                            onclick={toggleEditMode}
                        />
                    </div>
                </>
            )}

        </>
    )
}

export default PaginaFinanceiro;