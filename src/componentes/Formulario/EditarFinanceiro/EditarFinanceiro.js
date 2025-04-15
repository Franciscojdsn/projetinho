import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";
import { useNavigate, useParams } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";

import styles from './EditarFinanceiro.module.css';
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import Botao from '../../Botao/index'


export default function EditarFinanceiro({ aluno, setIsEditing }) {

    const [dados, setDados] = useState({
        ...aluno,
        valor_mensalidade: formatarParaReais(aluno.valor_mensalidade),
        desconto: formatarParaReais(aluno.desconto),
    });
    const [meses, setMeses] = useState([])
    const [atividades, setAtividades] = useState([]);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

    const navigate = useNavigate()
    const { id } = useParams();

    const total = (() => {
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
        const valorAtividades = dados.renda_complementar
            ? dados.renda_complementar.reduce((total, item) => total + item.valor, 0)
            : 10000;

        return (valorMensalidade + valorAtividades) - desconto;
    })();

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
        fetch('http://localhost:5000/renda_complementar', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setAtividades(data);
            })
            .catch((err) => console.log(err));
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

        if (!dados.valor_mensalidade || dados.valor_mensalidade.trim() === '') {
            alert('O campo "Valor da Mensalidade" é obrigatório.');
            return; // Impede o envio do formulário
        }

        if (!dados.desconto || dados.desconto.trim() === '') {
            alert('O campo "Desconto" é obrigatório.');
            return; // Impede o envio do formulário
        }

        if (!dados.meses || dados.meses === '') {
            alert('O campo "Mes" é obrigatório.');
            return; // Impede o envio do formulário
        }

        if (!dados.dia_vencimento || dados.dia_vencimento === '' || dados.dia_vencimento > 31 || dados.dia_vencimento < 1) {
            alert('O campo "dia do vencimento" é obrigatório.');
            return; // Impede o envio do formulário
        }

        // Prepara os dados para envio
        const dadosAtualizados = {
            ...dados,
            valor_mensalidade: parseFloat(total),
            desconto: parseFloat(desconto),
            dia_vencimento: parseFloat(diaVencimento),
            total_mensalidade: parseFloat(total_mensalidade),
            meses: {
                id: dados.meses.id,
                nome: dados.meses.nome,
            },

        };

        console.log("Dados enviados:", dadosAtualizados);

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
                window.location.reload(); // Recarrega a página após o redirecionamento
                navigate(`/PaginaFinanceiro/${id}`, { state: { message: 'Financeiro editado com sucesso!' } });
            })
            .catch((err) => console.log('Erro ao salvar os dados financeiros:', err));
    }

    function removeAtividade(id) {
        // Encontra a atividade a ser removida
        const atividadeRemovida = atividades.find((atividade) => atividade.id === id);

        if (atividadeRemovida) {
            // Subtrai o valor da atividade removida do valor da mensalidade
            const valorAtividade = isNaN(atividadeRemovida.valor_atividade) ? 0 : parseFloat(atividadeRemovida.valor_atividade);
            const valorMensalidadeAtual = isNaN(dados.valor_mensalidade) ? 0 : parseFloat(dados.valor_mensalidade);
            const novoValorMensalidade = valorMensalidadeAtual - valorAtividade;

            // Atualiza os dados do aluno no servidor
            const dadosAtualizados = {
                ...dados,
                valor_mensalidade: novoValorMensalidade,
                atividades: atividades.filter((atividade) => atividade.id !== id), // Remove a atividade do aluno
            };

            // Atualiza o banco de dados
            fetch(`http://localhost:5000/financeiro/${dados.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            })
                .then((resp) => {
                    if (resp.ok) {
                        // Atualiza o estado local
                        setDados((prevDados) => ({
                            ...prevDados,
                            valor_mensalidade: formatarParaReais(novoValorMensalidade),
                        }));
                        setAtividades(dadosAtualizados);
                    } else {
                        alert('Erro ao atualizar os dados financeiros no servidor.');
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao atualizar os dados financeiros para o ID ${dados.id}:`, err);
                });
        }
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
                        <Select
                            name="atividade"
                            label="Atividade Complementar:"
                            text="Selecione uma atividade:"
                            options={atividades}
                            handleOnChange={(e) => setAtividadeSelecionada(e.target.value)}
                            value={atividadeSelecionada || ''}
                        />
                    </div>

                    <div className={styles.div5}>
                        <label htmlFor="total">Total:</label><br />
                        <span name="total" id="total">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(dados.total_mensalidade)} {/* Exibe o total formatado */}
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
                    <label htmlFor="atividades">Atividade Complementar:</label><br></br>
                    <span name="atividades" id="atividades">
                        {dados.renda_complementar.map((item) => (
                            <div key={item.id}>
                                <ul>
                                    <li>{item.nome}
                                        <Botao
                                            icone={<TfiSave />}
                                            classname={styles.botao3}
                                            onclick={removeAtividade}
                                        />
                                    </li>
                                </ul>

                            </div>
                        ))}
                    </span>
                </div>
            </form>
        </>
    );
}