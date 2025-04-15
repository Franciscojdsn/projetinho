import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TfiSave } from "react-icons/tfi";
import { useNavbar } from '../../../context/NavbarContext';

import Botao from '../../Botao';
import styles from './FormularioFinanceiro.module.css'
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import SelectAtividades from '../Componentes/SelectAtividades/SelectAtividades';

function FormularioFinanceiro({ handleSubmit, dadosData }) {

    const navigate = useNavigate()
    const { id } = useParams();

    const [dados, setDados] = useState({ dadosData, id });

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);
    const { setIsNavbarDisabled } = useNavbar();

    const [meses, setMeses] = useState([])
    const [rendaComplementar, setRendaComplementar] = useState([]);
    const [atividadesSelecionadas, setAtividadesSelecionadas] = useState([]);

    const total_mensalidade = (() => {
        const valorMensalidade = parseFloat(dados.valor_mensalidade?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        const desconto = parseFloat(dados.desconto?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        const valorAtividades = atividadesSelecionadas.reduce((acc, atividade) => acc + atividade.valor_atividade, 0); // Soma os valores das atividades
        return (valorMensalidade + valorAtividades) - desconto ;
    })();

    const total_matricula = (() => {
        const valorMensalidade = parseFloat(dados.valor_matricula?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        const desconto = parseFloat(dados.desconto_matricula?.replace(/[^\d,]/g, '').replace(',', '.') || 0);
        return valorMensalidade - desconto;
    })();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);

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

    useEffect(() => {
        fetch('http://localhost:5000/renda_complementar', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Renda Complementar carregada:", data); // Verifique os dados carregados
                setRendaComplementar(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // Bloqueia a navbar ao montar o componente
        setIsNavbarDisabled(true);

        return () => {
            // Desbloqueia a navbar ao desmontar o componente
            setIsNavbarDisabled(false);
        };
    }, [setIsNavbarDisabled]);


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

    function handleSelectAtividade(e) {
        const selectedId = e.target.value; // Não converta para número ainda
        console.log("ID selecionado:", selectedId); // Log para depuração

        const selectedAtividade = rendaComplementar.find(renda => renda.id.toString() === selectedId.toString());
        console.log("Atividade selecionada:", selectedAtividade); // Log para depuração

        if (selectedAtividade && !atividadesSelecionadas.some(atividade => atividade.id === selectedAtividade.id)) {
            setAtividadesSelecionadas([...atividadesSelecionadas, selectedAtividade]); // Adiciona a atividade selecionada
            console.log("Atividades selecionadas atualizadas:", [...atividadesSelecionadas, selectedAtividade]); // Log para depuração
        }
        if (!selectedAtividade) {
            console.error("Atividade não encontrada para o ID:", selectedId);
            return;
        }
    }

    function removeAtividade(id) {
        setAtividadesSelecionadas(atividadesSelecionadas.filter(atividade => atividade.id !== id)); // Remove a atividade pelo ID
    }

    function handleInputLimit(e, maxLength) {
        const value = e.target.value;

        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength); // Limita o valor ao máximo permitido
        }
    }

    const submit = (e) => {
        e.preventDefault()
        //console.log(dados)
        handleSubmit(dados)
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

        if (!dados.valor_matricula || dados.valor_matricula === '' || dados.valor_matricula > 31 || dados.valor_matricula < 1) {
            alert('O campo "Valor da Matrícula" é obrigatório.');
            return; // Impede o envio do formulário
        }

        if (!dados.desconto_matricula || dados.desconto_matricula === '' || dados.desconto_matricula > 31 || dados.desconto_matricula < 1) {
            alert('O campo "Desconto da Matrícula" é obrigatório.');
            return; // Impede o envio do formulário
        }

        const dadosAtualizados = {
            ...dados,
            valor_mensalidade: parseFloat(dados.valor_mensalidade.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            desconto: parseFloat(dados.desconto.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            valor_matricula: parseFloat(dados.valor_matricula.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            desconto_matricula: parseFloat(dados.desconto_matricula.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            total_mensalidade: parseFloat(total_mensalidade) || 0,
            total_matricula: parseFloat(total_matricula) || 0,
            meses: {
                id: dados.meses.id,
                nome: dados.meses.nome,
            },
            renda_complementar: atividadesSelecionadas.map((atividade) => ({
                id: atividade.id,
                nome: atividade.nome_atividade,
                valor: atividade.valor_atividade,
            })),
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
                            text="Valor da Matrícula:"
                            name="valor_matricula"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.valor_matricula ? dados.valor_matricula : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="text"
                            text="Desconto:"
                            name="desconto_matricula"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.desconto_matricula ? dados.desconto_matricula : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <label htmlFor="total">Total:</label><br></br>
                        <span name="total" id="total">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(total_matricula)} {/* Exibe o total formatado */}
                        </span>
                    </div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.div4}>
                        <Input
                            type="text"
                            text="Valor da Mensalidade:"
                            name="valor_mensalidade"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.valor_mensalidade ? dados.valor_mensalidade : ''}
                        />
                    </div>
                    <div className={styles.div5}>
                        <Input
                            type="text"
                            text="Desconto:"
                            name="desconto"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.desconto ? dados.desconto : ''}
                        />
                    </div>
                    <div className={styles.div6}>
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
                    <div className={styles.div7}>
                        <Select
                            name="turno"
                            label="Mês de início:"
                            text="Mês de início:"
                            options={meses}
                            handleOnChange={handleSelectMes}
                            value={dados.meses ? dados.meses.id : ''}
                        />
                    </div>
                    <div className={styles.div8}>
                        <label htmlFor="total">Total:</label><br></br>
                        <span name="total" id="total">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(total_mensalidade)} {/* Exibe o total formatado */}
                        </span>
                    </div>
                    <div className={styles.div9}>
                        <SelectAtividades
                            name="renda_complementar"
                            label="Renda Complementar:"
                            text="Renda complementar:"
                            options={rendaComplementar.map((renda) => {
                                return {
                                    id: renda.id,
                                    name: `${renda.nome_atividade} - ${new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(renda.valor_atividade)}`,
                                };
                            })}
                            handleOnChange={handleSelectAtividade} // Certifique-se de que está vinculado corretamente
                            value=""
                        />
                    </div>
                    <div className={styles.div10}>
                        <Botao
                            title="Salvar"
                            icone={<TfiSave />}
                            classname={styles.botao}
                        />
                    </div>
                </div>
                <ul className={styles.container}>
                    {atividadesSelecionadas.map((atividade) => (
                        <li key={atividade.id} >
                            {atividade.nome_atividade} - {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(atividade.valor_atividade)}
                            <Botao
                                title=""
                                icone={<TfiSave />}
                                classname={styles.botao2}
                                onclick={() => removeAtividade(atividade.id)}
                            />
                        </li>
                    ))}
                </ul>

            </form>
        </>
    )
}

export default FormularioFinanceiro;