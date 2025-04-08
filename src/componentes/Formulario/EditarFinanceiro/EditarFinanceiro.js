import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";
import { useNavigate, useParams } from 'react-router-dom';


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

    const navigate = useNavigate()
    const { id } = useParams();

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
            valor_mensalidade: parseFloat(dados.valor_mensalidade.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            desconto: parseFloat(dados.desconto.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
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
                    alert('Erro ao atualizar os dados financeiros.');
                }
            })
            .then(() => {
                window.location.reload(); // Recarrega a página após o redirecionamento
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
                    <div className={styles.div5}>
                        <Input
                            type="number"
                            text="Total:"
                            name="telefone2_da_mae"
                            placeholder="Telefone 2"
                            handleOnChange={handleChange}
                            value={dados.telefone2_da_mae ? dados.telefone2_da_mae : ''}
                        />
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
            </form>
        </>
    );
}