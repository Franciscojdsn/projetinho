import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";
import { useNavigate, useParams } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';

import styles from './EditarFinanceiro.module.css';
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import Botao from '../../Botao/index'
import SelectAtividades from '../Componentes/Select/Select';


export default function EditarFinanceiro({ aluno, setIsEditing }) {

    const [dados, setDados] = useState({
        ...aluno,
        valor_mensalidade: formatarParaReais(aluno.valor_mensalidade),
        desconto: formatarParaReais(aluno.desconto),
    });
    const [meses, setMeses] = useState([])
    const [rendaComplementar, setRendaComplementar] = useState([]);
    const [atividadesSelecionadas, setAtividadesSelecionadas] = useState(dados.renda_complementar || []);

    const [somaRendaComplementar, setSomaRendaComplementar] = useState(0);
    const [totalMensalidade, setTotalMensalidade] = useState(0);
    const [dadosOriginal, setDadosOriginal] = useState(null);


    const [isLoading, setIsLoading] = useState(true); // Para indicar o estado de carregamento
    const [error, setError] = useState(null); // Para lidar com erros



    const navigate = useNavigate()
    const { id } = useParams();

    const mensalidade = (() => {
        const valorMensalidade = parseFloat(dados.valor_mensalidade?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        return valorMensalidade;
    })();

    const desconto = (() => {
        const valorDesconto = parseFloat(dados.desconto?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        return valorDesconto;
    })();

    const diaVencimento = (() => {
        const diaVencimento = parseFloat(dados.dia_vencimento);
        return diaVencimento;
    })();

    const total_mensalidade = (() => {
        const valorMensalidade = parseFloat(dados.valor_mensalidade?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        const desconto = parseFloat(dados.desconto?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        return (valorMensalidade + somaRendaComplementar) - desconto;
    })();

    useEffect(() => {
        if (dados) {
            setDadosOriginal(dados);
        }
    }, [dados]);

    // Recalcular a soma da renda complementar (inclui salvas e novas)
    useEffect(() => {
        const soma = atividadesSelecionadas.reduce(
            (acumulador, atividade) => acumulador + (atividade.valor || atividade.valor_atividade || 0),
            0
        );
        setSomaRendaComplementar(soma);
    }, [atividadesSelecionadas]);

    // Atualizar total mensalidade dinamicamente
    useEffect(() => {
        const valorMensalidade = parseFloat(
            dados.valor_mensalidade?.replace(/[^\d,]/g, "").replace(",", ".") || 0
        );
        const desconto = parseFloat(
            dados.desconto?.replace(/[^\d,]/g, "").replace(",", ".") || 0
        );

        const total = valorMensalidade + somaRendaComplementar - desconto;
        setTotalMensalidade(total);
    }, [somaRendaComplementar, dados]);



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

    useEffect(() => {
        const fetchRendaComplementar = async () => {
            try {
                const response = await fetch('http://localhost:5000/renda_complementar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
                }

                const data = await response.json();
                setRendaComplementar(data); // Atualiza o estado com os dados recebidos
            } catch (err) {
                console.error('Erro na requisição:', err); // Log para depuração
                setError(err.message); // Define a mensagem de erro
            } finally {
                setIsLoading(false); // Indica que o carregamento terminou
            }
        };

        fetchRendaComplementar(); // Chama a função ao montar o componente
    }, []);

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor || 0); // Garante que valores nulos ou indefinidos sejam tratados como 0
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setDados((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

        // Atualiza o estado com o valor formatado
        setDados({ ...dados, [name]: formattedValue });
        console.log({ ...dados, [name]: formattedValue });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (dados.boletos_pagos && dados.boletos_pagos.length > 0) {
            // Se mudou o mês de início
            if (dados.meses.id !== dadosOriginal.meses.id) {
                alert('Não é permitido alterar o mês de início pois já existem boletos pagos.');
                return;
            }
        }

        if (!dados.valor_mensalidade || dados.valor_mensalidade.trim() === '') {
            alert('O campo "Valor da Mensalidade" é obrigatório.');
            return;
        }

        if (!dados.desconto || dados.desconto.trim() === '') {
            alert('O campo "Desconto" é obrigatório.');
            return;
        }

        if (!dados.meses || dados.meses === '') {
            alert('O campo "Mês" é obrigatório.');
            return;
        }

        if (!dados.dia_vencimento || dados.dia_vencimento === '' || dados.dia_vencimento > 31 || dados.dia_vencimento < 1) {
            alert('O campo "Dia do Vencimento" é obrigatório.');
            return;
        }

        const anoAtual = new Date().getFullYear();
        const mesInicio = parseInt(dados.meses.id);
        const diaVencimento = parseInt(dados.dia_vencimento);

        const nomeDoMes = (numeroMes) => {
            const meses = [
                "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];
            return meses[numeroMes - 1];
        };

        const gerarBoletos = () => {
            const boletos = [];

            for (let i = mesInicio + 1; i <= 12; i++) {
                const mesCorrente = i > 12 ? i - 12 : i;
                const anoCorrente = i > 12 ? anoAtual + 1 : anoAtual;

                const dataVencimento = new Date(anoCorrente, mesCorrente - 1, diaVencimento);

                const boletoExistente = dados.boletos?.find(
                    (b) => parseInt(b.mes_id) === mesCorrente
                );

                const hoje = new Date();
                const vencimento = dataVencimento;
                const estaVencido = vencimento < hoje ? true : false;
                console.log("vencimento", vencimento)

                if (boletoExistente) {
                    const valorFinal = estaVencido===true
                        ? boletoExistente.valor // mantém o valor original
                        : parseFloat(total_mensalidade); // novo valor
                        console.log("boleto existente", boletoExistente.valor)
                        console.log("final", valorFinal)
                
                    boletos.push({
                        ...boletoExistente, // mantém os demais dados
                        valor: valorFinal,
                        dia_vencimento: diaVencimento,
                        data_vencimento: dataVencimento.toLocaleDateString('pt-BR'),
                        mes: nomeDoMes(mesCorrente),
                    });
                }
                // Não cria novos boletos!
            }

            return boletos;
        };

        // Gera boletos atualizados mantendo ID se possível
        const boletosAtualizados = gerarBoletos();

        const dadosAtualizados = {
            ...dados,
            valor_mensalidade: parseFloat(mensalidade),
            desconto: parseFloat(desconto),
            dia_vencimento: parseFloat(diaVencimento),
            total_mensalidade: parseFloat(total_mensalidade),
            meses: {
                id: dados.meses.id,
                nome: dados.meses.nome,
            },
            renda_complementar: atividadesSelecionadas.map((atividade) => {
                const rendaExistente = dados.renda_complementar?.find((renda) => renda.id === atividade.id);
                return {
                    id: atividade.id,
                    nome: rendaExistente?.nome || atividade.nome_atividade,
                    valor: rendaExistente?.valor || atividade.valor_atividade,
                };
            }),
            boletos: boletosAtualizados,
        };

        console.log("Dados enviados: handleSubmit", dadosAtualizados);

        // Chama a função de salvar
        onSave(dadosAtualizados);
    }



    function handleSelectMes(e) {
        setDados({
            ...dados, meses: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text,
            },
        })
        console.log(dados)
    }

    const handleSelectAtividade = (e) => {
        const selectedId = e.target.value;
        const selectedAtividade = rendaComplementar.find(
            (renda) => renda.id.toString() === selectedId.toString()
        );

        if (
            selectedAtividade &&
            !atividadesSelecionadas.some((atividade) => atividade.id === selectedAtividade.id)
        ) {
            setAtividadesSelecionadas((prevState) => [...prevState, selectedAtividade]);
        } else if (!selectedAtividade) {
            console.error("Atividade não encontrada para o ID:", selectedId);
        }
    };

    const removerAtividade = (id) => {
        setAtividadesSelecionadas((prevState) =>
            prevState.filter((atividade) => atividade.id !== id)
        );
    };

    function handleInputLimit(e, maxLength) {
        const value = e.target.value;

        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength); // Limita o valor ao máximo permitido
        }
    }


    function onSave(dadosAtualizados) {
        fetch(`http://localhost:5000/financeiro/${dadosAtualizados.id}`, {
            method: 'PATCH', // Use PATCH para atualizar os dados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then((resp) => {
                if (resp.ok) {
                    setTimeout(() => {
                        setIsEditing(false);
                    }, 1000);
                } else {
                    alert('Erross ao atualizar os dados financeiros.');
                }
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

            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Valor da Mensalidade:"
                            name="valor_mensalidade"
                            placeholder="R$ 000,00"
                            handleOnChange={handleChangeReais}
                            value={dados.valor_mensalidade ? dados.valor_mensalidade : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="text"
                            text="Desconto:"
                            name="desconto"
                            placeholder="R$ 000,00"
                            handleOnChange={handleChangeReais}
                            value={dados.desconto ? dados.desconto : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="number"
                            text="Dia de vencimento:"
                            name="dia_vencimento"
                            placeholder="00"
                            handleOnChange={handleChange}
                            value={dados.dia_vencimento ? dados.dia_vencimento : ''}
                            onInput={(e) => handleInputLimit(e, 2)}
                            min="1"
                            max="31"
                        />
                    </div>
                    <div className={styles.div4}>
                        <Select
                            name="turno"
                            label="Mês de início:"
                            text="Mês de início:"
                            options={meses}
                            handleOnChange={handleSelectMes}
                            value={dados.meses ? dados.meses.id : ''}
                        />
                    </div>
                    <div className={styles.div7}>
                        <SelectAtividades
                            name="renda_complementar"
                            label="Renda Complementar:"
                            text="Renda complementar:"
                            options={rendaComplementar.map((renda) => {
                                return {
                                    id: renda.id,
                                    nome: `${renda.nome_atividade} - ${new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(renda.valor_atividade)}`,
                                };
                            })}
                            handleOnChange={handleSelectAtividade} // Certifique-se de que está vinculado corretamente
                            value=""
                        />
                    </div>

                    <div className={styles.div5}>
                        <label htmlFor="total">Total:</label><br />
                        <span name="total" id="total">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(totalMensalidade)} {/* Exibe o total formatado */}
                        </span>
                    </div>
                    <div className={styles.div6}>
                        <Botao
                            type='submit'
                            title="Salvar"
                            icone={<TfiSave />}
                            classname={styles.botao}
                        />
                    </div>
                </div>
                <div className={styles.container}>
                    <h3>Atividades Selecionadas:</h3>
                    <ul>
                        {atividadesSelecionadas.map((atividade) => (
                            <li key={atividade.id}>
                                {`${atividade.nome_atividade || atividade.nome} - ${new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(atividade.valor_atividade || atividade.valor)}`}
                                <button onClick={() => removerAtividade(atividade.id)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </>
    );
}