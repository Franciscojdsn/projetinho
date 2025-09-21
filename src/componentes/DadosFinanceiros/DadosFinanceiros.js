import React, { useEffect, useState } from "react";
import styles from './DadosFinanceiros.module.css'
import ContainerDados from "../ContainerDados/ContainerDados";


const DadosFinanceiros = () => {
    //somar total mensalidades e pendentes
    const [valorTotal, setValorTotal] = useState(0);
    const [valorPendentes, setValorPendentes] = useState(0);
    // Novo estado para boletos a receber (em aberto e não vencidos)
    const [valorAReceber, setValorAReceber] = useState(0);
    // Popup de saídas
    const [showSaidaPopup, setShowSaidaPopup] = useState(false);
    // Extras mensais (entradas)
    const [showExtraPopup, setShowExtraPopup] = useState(false);
    const [valorExtra, setValorExtra] = useState('');
    const [descricaoExtra, setDescricaoExtra] = useState('');
    const [extras, setExtras] = useState([]);
    const [editandoExtraId, setEditandoExtraId] = useState(null);
    // Saídas mensais
    const [valorSaida, setValorSaida] = useState('');
    const [descricaoSaida, setDescricaoSaida] = useState('');
    const [expiraSaida, setExpiraSaida] = useState(false);
    const [saidas, setSaidas] = useState([]);
    const [editandoSaidaId, setEditandoSaidaId] = useState(null);

    useEffect(() => {
        // Busca extras válidos para o mês atual
        fetch('http://localhost:5000/extras')
            .then(resp => resp.json())
            .then(data => {
                setExtras(data || []);
            })
            .catch(() => setExtras([]));
    }, []);

    useEffect(() => {
        // Busca saídas válidas para o mês atual
        fetch('http://localhost:5000/saidas')
            .then(resp => resp.json())
            .then(data => {
                setSaidas(data || []);
            })
            .catch(() => setSaidas([]));
    }, []);

    // Verificar alunos pendentes, total mensalidades e boletos a receber
    useEffect(() => {
        fetch('http://localhost:5000/financeiro')
            .then((resp) => resp.json())
            .then((data) => {
                let somaMensalidade = 0;
                let somaPendentes = 0;
                let somaAReceber = 0;
                const hoje = new Date();
                data.forEach((item) => {
                    somaMensalidade += Number(item.total_mensalidade) || 0;
                    if (Array.isArray(item.boletos)) {
                        item.boletos.forEach((boleto) => {
                            if (boleto.data_vencimento) {
                                const [dia, mes, ano] = boleto.data_vencimento.split('/');
                                const dataVenc = new Date(`${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
                                // Considera boleto em aberto (não pago)
                                if (!boleto.pago) {
                                    if (dataVenc < hoje) {
                                        // Já vencido e não pago = pendente
                                        somaPendentes += Number(boleto.valor) || 0;
                                    } else {
                                        // Não vencido e não pago = a receber
                                        somaAReceber += Number(boleto.valor) || 0;
                                    }
                                }
                            }
                        });
                    }
                });
                setValorTotal(somaMensalidade);
                setValorPendentes(somaPendentes);
                setValorAReceber(somaAReceber);
            })
            .catch((err) => {
                setValorTotal(0);
                setValorPendentes(0);
                setValorAReceber(0);
            });
    }, []);

    // Soma extras válidos ao valorTotal
    const valorTotalComExtras = (() => {
        const hoje = new Date();
        let somaExtras = 0;
        extras.forEach(extra => {
            const dataExpiracao = new Date(extra.dataExpiracao);
            if (hoje <= dataExpiracao) {
                somaExtras += Number(extra.valor) || 0;
            }
        });
        return valorTotal + somaExtras;
    })();

    // Soma saídas válidas ao valor de saída
    const valorSaidasValidas = (() => {
        const hoje = new Date();
        let somaSaidas = 0;
        saidas.forEach(saida => {
            if (saida.expira) {
                const dataExpiracao = new Date(saida.dataExpiracao);
                if (hoje <= dataExpiracao) {
                    somaSaidas += Number(saida.valor) || 0;
                }
            } else {
                somaSaidas += Number(saida.valor) || 0;
            }
        });
        return somaSaidas;
    })();

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor || 0);
    }

    function handleValorExtraChange(e) {
        let value = e.target.value;
        // Remove tudo que não for número
        value = value.replace(/\D/g, '');
        // Divide por 100 para considerar centavos
        const valorNumerico = Number(value) / 100;
        setValorExtra(formatarParaReais(valorNumerico));
    }

    function parseValorExtra(valorFormatado) {
        // Remove tudo que não for número ou vírgula/ponto
        let valor = valorFormatado.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(valor) || 0;
    }

    function handleValorSaidaChange(e) {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        const valorNumerico = Number(value) / 100;
        setValorSaida(formatarParaReais(valorNumerico));
    }

    function parseValorSaida(valorFormatado) {
        let valor = valorFormatado.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(valor) || 0;
    }

    // Lógica para adicionar ou editar extra
    function handleAddOrEditExtra(e) {
        e.preventDefault();
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const anoAtual = hoje.getFullYear();
        // Data de expiração: dia 10 do próximo mês
        let proximoMes = mesAtual + 1;
        let anoExp = anoAtual;
        if (proximoMes > 12) {
            proximoMes = 1;
            anoExp += 1;
        }
        const dataExpiracao = new Date(`${anoExp}-${String(proximoMes).padStart(2, '0')}-10`);
        const dataInsercao = hoje.toISOString().split('T')[0];

        const extraObj = {
            valor: parseValorExtra(valorExtra),
            descricao: descricaoExtra,
            mes: mesAtual,
            ano: anoAtual,
            dataExpiracao: dataExpiracao.toISOString().split('T')[0],
            dataInsercao
        };

        if (editandoExtraId) {
            // Edita extra existente
            fetch(`http://localhost:5000/extras/${editandoExtraId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(extraObj)
            }).then(() => {
                setShowExtraPopup(false);
                setValorExtra('');
                setDescricaoExtra('');
                setEditandoExtraId(null);
                // Atualiza lista de extras
                fetch('http://localhost:5000/extras')
                    .then(resp => resp.json())
                    .then(data => setExtras(data || []));
            });
        } else {
            // Adiciona novo extra
            fetch('http://localhost:5000/extras', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(extraObj)
            }).then(() => {
                setShowExtraPopup(false);
                setValorExtra('');
                setDescricaoExtra('');
                // Atualiza lista de extras
                fetch('http://localhost:5000/extras')
                    .then(resp => resp.json())
                    .then(data => setExtras(data || []));
            });
        }
    }

    // Lógica para adicionar ou editar saída
    function handleAddOrEditSaida(e) {
        e.preventDefault();
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const anoAtual = hoje.getFullYear();
        // Data de expiração: dia 10 do próximo mês
        let proximoMes = mesAtual + 1;
        let anoExp = anoAtual;
        if (proximoMes > 12) {
            proximoMes = 1;
            anoExp += 1;
        }
        const dataExpiracao = new Date(`${anoExp}-${String(proximoMes).padStart(2, '0')}-10`);
        const dataInsercao = hoje.toISOString().split('T')[0];

        const saidaObj = {
            valor: parseValorSaida(valorSaida),
            descricao: descricaoSaida,
            mes: mesAtual,
            ano: anoAtual,
            expira: expiraSaida,
            dataExpiracao: expiraSaida ? dataExpiracao.toISOString().split('T')[0] : null,
            dataInsercao
        };

        if (editandoSaidaId) {
            // Edita saída existente
            fetch(`http://localhost:5000/saidas/${editandoSaidaId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saidaObj)
            }).then(() => {
                setShowSaidaPopup(false);
                setValorSaida('');
                setDescricaoSaida('');
                setExpiraSaida(false);
                setEditandoSaidaId(null);
                fetch('http://localhost:5000/saidas')
                    .then(resp => resp.json())
                    .then(data => setSaidas(data || []));
            });
        } else {
            // Adiciona nova saída
            fetch('http://localhost:5000/saidas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saidaObj)
            }).then(() => {
                setShowSaidaPopup(false);
                setValorSaida('');
                setDescricaoSaida('');
                setExpiraSaida(false);
                fetch('http://localhost:5000/saidas')
                    .then(resp => resp.json())
                    .then(data => setSaidas(data || []));
            });
        }
    }

    function handleEditarExtra(extra) {
        setEditandoExtraId(extra.id);
        setValorExtra(formatarParaReais(extra.valor));
        setDescricaoExtra(extra.descricao || '');
        setShowExtraPopup(true);
    }

    function handleExcluirExtra(id) {
        if (window.confirm("Deseja excluir este extra?")) {
            fetch(`http://localhost:5000/extras/${id}`, {
                method: 'DELETE'
            }).then(() => {
                // Atualiza lista de extras
                fetch('http://localhost:5000/extras')
                    .then(resp => resp.json())
                    .then(data => setExtras(data || []));
            });
        }
    }

    function handleEditarSaida(saida) {
        setEditandoSaidaId(saida.id);
        setValorSaida(formatarParaReais(saida.valor));
        setDescricaoSaida(saida.descricao || '');
        setExpiraSaida(!!saida.expira);
        setShowSaidaPopup(true);
    }

    function handleExcluirSaida(id) {
        if (window.confirm("Deseja excluir esta saída?")) {
            fetch(`http://localhost:5000/saidas/${id}`, {
                method: 'DELETE'
            }).then(() => {
                fetch('http://localhost:5000/saidas')
                    .then(resp => resp.json())
                    .then(data => setSaidas(data || []));
            });
        }
    }

    function handleAbrirPopup() {
        setEditandoExtraId(null);
        setValorExtra('');
        setDescricaoExtra('');
        setShowExtraPopup(true);
    }

    function handleAbrirSaidaPopup() {
        setEditandoSaidaId(null);
        setValorSaida('');
        setDescricaoSaida('');
        setExpiraSaida(false);
        setShowSaidaPopup(true);
    }

    function formatarDataBR(dataISO) {
        if (!dataISO) return '-';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <>
            <div className={styles.containerdados}>
                <div className={styles.containerdadosfilho}>
                    <ContainerDados
                        //Dados de balanço mensal
                        primeira="entrada"
                        segunda="segunda"
                        title1="Entrada"
                        title2="Saída"
                        valor1={formatarParaReais(valorTotalComExtras)}
                        valor2={formatarParaReais(valorSaidasValidas)}
                        //Abrir popup de entradas
                        onClickEntrada={handleAbrirPopup}
                        //Abrir popup de saídas
                        onClickSaida={handleAbrirSaidaPopup}
                    />
                </div>
                <div>
                    <ContainerDados
                        //dados dos valores totais e pendentes
                        title1="Valor total"
                        title2="Pendentes"
                        valor1={formatarParaReais(valorAReceber)}
                        valor2={formatarParaReais(valorPendentes)}
                    />
                </div>
            </div>
            {showExtraPopup && (
                // Popup para adicionar/editar extra
                <div className={styles.popupExtra}>
                    <form onSubmit={handleAddOrEditExtra} className={styles.formExtra}>
                        <label>Valor extra para este mês:</label>
                        <input
                            type="text"
                            value={valorExtra}
                            onChange={handleValorExtraChange}
                            placeholder="R$ 0,00"
                            required
                        />
                        <label>Descrição:</label>
                        <input
                            type="text"
                            value={descricaoExtra}
                            onChange={e => setDescricaoExtra(e.target.value)}
                            placeholder="Descrição do extra"
                            required
                        />
                        <div className={styles.botoesExtra}>
                            <button type="submit">{editandoExtraId ? "Salvar" : "Adicionar"}</button>
                            <button type="button" onClick={() => { setShowExtraPopup(false); setEditandoExtraId(null); }}>Cancelar</button>
                        </div>
                        <hr />
                        <div>
                            <strong>Extras cadastrados:</strong>
                            <ul className={styles.listaExtras}>
                                {extras.length === 0 && <li>Nenhum extra cadastrado.</li>}
                                {extras.map(extra => (
                                    //listagem dos extras
                                    <li key={extra.id} className={styles.itemExtra}>
                                        <span>
                                            {formatarParaReais(extra.valor)} - {extra.descricao} <br />
                                            <small>Inserido em: {formatarDataBR(extra.dataInsercao)}</small>
                                        </span>
                                        <span>
                                            <button type="button" onClick={() => handleEditarExtra(extra)}>Editar</button>
                                            <button type="button" onClick={() => handleExcluirExtra(extra.id)}>Excluir</button>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            )}
            {showSaidaPopup && (
                // Popup para adicionar/editar saída
                <div className={styles.popupExtra}>
                    <form onSubmit={handleAddOrEditSaida} className={styles.formExtra}>
                        <label>Valor saída para este mês:</label>
                        <input
                            type="text"
                            value={valorSaida}
                            onChange={handleValorSaidaChange}
                            placeholder="R$ 0,00"
                            required
                        />
                        <label>Descrição:</label>
                        <input
                            type="text"
                            value={descricaoSaida}
                            onChange={e => setDescricaoSaida(e.target.value)}
                            placeholder="Descrição da saída"
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={expiraSaida}
                                onChange={e => setExpiraSaida(e.target.checked)}
                            />
                            Expira no próximo mês
                        </label>
                        <div className={styles.botoesExtra}>
                            <button type="submit">{editandoSaidaId ? "Salvar" : "Adicionar"}</button>
                            <button type="button" onClick={() => { setShowSaidaPopup(false); setEditandoSaidaId(null); }}>Cancelar</button>
                        </div>
                        <hr />
                        <div>
                            <strong>Saídas cadastradas:</strong>
                            <ul className={styles.listaExtras}>
                                {saidas.length === 0 && <li>Nenhuma saída cadastrada.</li>}
                                {saidas.map(saida => (
                                    // Listagem das saídas
                                    <li key={saida.id} className={styles.itemExtra}>
                                        <span>
                                            {formatarParaReais(saida.valor)} - {saida.descricao} <br />
                                            <small>Inserido em: {formatarDataBR(saida.dataInsercao)}</small>
                                            {saida.expira && (
                                                <><br /><small>Expira em: {formatarDataBR(saida.dataExpiracao)}</small></>
                                            )}
                                        </span>
                                        <span>
                                            <button type="button" onClick={() => handleEditarSaida(saida)}>Editar</button>
                                            <button type="button" onClick={() => handleExcluirSaida(saida.id)}>Excluir</button>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default DadosFinanceiros;