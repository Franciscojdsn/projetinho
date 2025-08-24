import { useEffect, useState, useCallback } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashBinOutline, IoWarningOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import styles from './PaginaFinanceiro.module.css';
import Botao from '../../componentes/Botao';
import ExibirFinanceiro from '../../componentes/Formulario/Componentes/ExibirFinanceiro/ExibirFinanceiro';
import EditarFinanceiro from '../../componentes/Formulario/EditarFinanceiro/EditarFinanceiro';
import ListaBoletos from '../../componentes/ListaBoletos/ListaBoletos';
import Loading from '../../componentes/Formulario/Componentes/Loading/Loading';
import ListaBoletosPagos from '../../componentes/ListaBoletosPagos/ListaBoletosPagos';

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
        if (!financeiro?.meses?.id) return;

        const anoAtual = new Date().getFullYear();
        const {
            meses: { id: mesInicio },
            total_mensalidade,
            dia_vencimento = 1,
            desconto = 0,
            valor_matricula = 0,
            desconto_matricula = 0,
        } = financeiro;

        const boletosGerados = Array.from({ length: 12 - parseInt(mesInicio) }, (_, idx) => {
            const mes = parseInt(mesInicio) + idx;
            const dataVencimento = new Date(anoAtual, mes, dia_vencimento);
            const dataMatricula = new Date();

            return {
                id: uuidv4(),
                mes: dataVencimento.toLocaleString('pt-BR', { month: 'long' }),
                ano: dataVencimento.getFullYear(),
                valor: formatarParaReais(total_mensalidade),
                valorMatricula: formatarParaReais(parseFloat(valor_matricula) - parseFloat(desconto_matricula)),
                dataVencimento: dataVencimento.toLocaleDateString('pt-BR'),
                dataMatricula: dataMatricula.toLocaleDateString('pt-BR'),
                mesMatricula: dataMatricula.toLocaleString('pt-BR', { month: 'long' }),
            };
        });

        setBoletos(boletosGerados);
    }, [setBoletos]);

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

    function parseDataBR(dataStr) {
        const [dia, mes, ano] = dataStr.split('/');
        return new Date(`${ano}-${mes}-${dia}`);
    }


    async function boletoPago(boleto) {
        try {
            const res = await fetch(`http://localhost:5000/financeiro/${id}`);
            const financeiro = await res.json();

            const boletosPendentes = financeiro.boletos || [];
            const boletosPagos = financeiro.boletos_pagos || [];

            // Verifica se já foi pago
            if (boletosPagos.some(p => p.boletoOriginalId === boleto.id)) {
                alert('Este boleto já foi pago!');
                return;
            }

            // Novo boleto pago
            const novoPago = {
                id: crypto.randomUUID(),
                boletoOriginalId: boleto.id,
                valor: boleto.valor,
                dataVencimento: boleto.data_vencimento,
                mes: boleto.mes,
                mes_id: boleto.mes_id,
                ano: boleto.ano,
                dataPagamento: new Date().toLocaleDateString('pt-BR'),
            };

            // Atualiza financeiro: remove do pendente e adiciona ao pago
            const dadosAtualizados = {
                boletos: boletosPendentes.filter(b => b.id !== boleto.id),
                boletos_pagos: [...boletosPagos, novoPago],
            };

            // Salva as alterações
            await fetch(`http://localhost:5000/financeiro/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados),
            });

            navigate(`/PaginaFinanceiro/${id}`, { state: { message: 'Boleto marcado como pago!' } });
            window.location.reload();
        } catch (err) {
            console.error('Erro ao marcar boleto como pago:', err);
            alert('Erro ao processar pagamento. Tente novamente.');
        }
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
                            {dados?.boletos_pagos?.length > 0 && (
                                <>
                                    {dados.boletos_pagos.map((boletoPago) => (
                                        <ListaBoletosPagos
                                            key={boletos[0].matricula}
                                            mes_referente={boletoPago.mes}
                                            vencimento={boletoPago.dataVencimento}
                                            valor={formatarParaReais(boletoPago.valor)}
                                            dia={boletoPago.dataPagamento}
                                            botao={"✅"}
                                        />
                                    ))}
                                </>

                            )}
                            {dados?.boletos?.length > 0 && (
                                <>
                                    {dados.boletos.map((boletos) => {
                                        const hoje = new Date();
                                        const vencimento = parseDataBR(boletos.data_vencimento);
                                        const estaVencido = vencimento < hoje;

                                        return (
                                            <ListaBoletos
                                                key={boletos.matricula}
                                                mes_referente={boletos.mes}
                                                vencimento={boletos.data_vencimento}
                                                valor={formatarParaReais(boletos.valor)}
                                                iconeVencido={
                                                    estaVencido ? (
                                                        <IoWarningOutline color="red" title="Boleto vencido" />
                                                    ) : null                                                   
                                                }
                                                botao={
                                                    <Botao
                                                        title={<IoTrashBinOutline />}
                                                        classname={styles.botao2}
                                                        onclick={() => boletoPago(boletos)}
                                                    />
                                                }
                                            />
                                        );
                                    })}
                                </>

                            )}
                            {dados?.boletos?.length > 0 && ((boleto) => (
                                <>
                                    <ListaBoletos
                                        key={boleto.matricula}
                                        mes_referente={boleto.mes}
                                        vencimento={boleto.data_vencimento}
                                        valor={formatarParaReais(boleto.valor)}
                                        botao={<Botao
                                            title={<IoTrashBinOutline />}
                                            classname={styles.botao2}
                                            onclick={() => boletoPago(boleto)}
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