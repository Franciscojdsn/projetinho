import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";

import styles from './EditarFinanceiro.module.css';
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import Botao from '../../Botao/index'


export default function EditarFinanceiro({ aluno, onSave }) {

    const [dados, setDados] = useState(aluno);
    const [meses, setMeses] = useState([])

    function handleChange(e) {
        const { name, value } = e.target;
        setDados((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(dados); // Chama a função de salvar com os dados atualizados
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
                            handleOnChange={handleChange}
                            value={dados.valor_mensalidade ? dados.valor_mensalidade : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="number"
                            text="Desconto:"
                            name="desconto"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
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
                    <div className={styles.div5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
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