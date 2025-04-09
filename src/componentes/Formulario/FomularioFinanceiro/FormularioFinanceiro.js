import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TfiSave } from "react-icons/tfi";

import Botao from '../../Botao';
import styles from './FormularioFinanceiro.module.css'
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';

function FormularioFinanceiro({ handleSubmit, dadosData }) {

    const navigate = useNavigate()
    const { id } = useParams();

    const [dados, setDados] = useState({ dadosData, id })

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);

    const [meses, setMeses] = useState([])

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

    function handleSelectMes(e) {
        setDados({
            ...dados, meses: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text,
            },
        })
        console.log(dados)
    }

    function handleSubmit(dados) {
        // Verifica se os campos obrigatórios estão preenchidos
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
    
        const dadosAtualizados = {
            ...dados,
            valor_mensalidade: parseFloat(dados.valor_mensalidade.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            desconto: parseFloat(dados.desconto.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            meses: {
                id: dados.meses.id,
                nome: dados.meses.nome,
            },
        };
    
        fetch('http://localhost:5000/financeiro', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Dados financeiros criados:", data);
                navigate(`/PaginaAluno/${id}`, { state: { message: 'Matrícula criada com sucesso!' } });
                window.scrollTo(0, 0);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div>
                {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
                {/* Resto do código da página */}
            </div>
            <form onSubmit={submit}>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Valor da Mensalidade:"
                            name="valor_mensalidade"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.valor_mensalidade ? dados.valor_mensalidade : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="text"
                            text="Desconto:"
                            name="desconto"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChangeReais}
                            value={dados.desconto ? dados.desconto : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="number"
                            text="Dia de vencimento:"
                            name="dia_vencimento"
                            placeholder="000.000.000-00"
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
                    <div className={styles.div6}>
                        <Botao
                            title="Salvar"
                            icone={<TfiSave />}
                            classname={styles.botao}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormularioFinanceiro;