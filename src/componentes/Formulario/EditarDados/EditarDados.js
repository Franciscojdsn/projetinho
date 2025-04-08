import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";

import styles from './EditarDados.module.css';
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import Radio from '../Componentes/Radio/Radio';
import Botao from '../../Botao/index'


export default function EditarDados({ aluno, onSave }) {
    const [dados, setDados] = useState(aluno);

    const [opcoesturma, setOpcoesturma] = useState([])
    const [turno, setTurno] = useState([])

    const anoAtual = new Date().getFullYear();
    const anoMinimo = anoAtual - 100; 
    const anoMaximo = anoAtual - 1;  

    const dataMinima = `${anoMinimo}-01-01`; 
    const dataMaxima = `${anoMaximo}-12-31`;

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

    function handleSelectTurma(e) {
        setDados({
            ...dados, turma: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    function handleSelectTurno(e) {
        setDados({
            ...dados, turno: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text,
            },
        })
        console.log(dados)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setDados({ ...dados, imagem: reader.result }); // Salva a imagem como Base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/opcoesturma', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setOpcoesturma(data)
            })
            .catch((err) => console.log(err))

        fetch('http://localhost:5000/turnos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setTurno(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.containerimagem}>
                    <Input
                        name="imagem"
                        type="file"
                        accept="image/*"
                        text='Foto do aluno:'
                        handleOnChange={handleFileChange}
                        placeholder="Escolha uma imagem"
                    />
                </div>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Nome do aluno"
                            name="nome"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome ? dados.nome : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data"
                            placeholder="00/00/0000"
                            handleOnChange={handleChange}
                            value={dados.data ? dados.data : ''}
                            min={dataMinima}
                            max={dataMaxima}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="text"
                            text="Naturalidade:"
                            name="naturalidade"
                            placeholder="Local"
                            handleOnChange={handleChange}
                            value={dados.naturalidade ? dados.naturalidade : ''}
                        />
                    </div>
                    <div className={styles.div4}>
                        <fieldset required>
                            <Radio
                                handleOnChange={handleChange}
                                value={dados.gen ? dados.gen : ''}
                            />
                        </fieldset>
                    </div>
                    <div className={styles.div5}>
                        <Select
                            name="turma"
                            label="Turmas:"
                            text="Selecione a turma"
                            options={opcoesturma}
                            handleOnChange={handleSelectTurma}
                            value={dados.turma ? dados.turma.id : ''}
                        />
                    </div>
                    <div className={styles.div6}>
                        <Select
                            name="turno"
                            label="Turnos:"
                            text="Selecione o turno"
                            options={turno}
                            handleOnChange={handleSelectTurno}
                            value={dados.turno ? dados.turno.id : ''}
                        />
                    </div>
                    <div className={styles.div7}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cpf ? dados.cpf : ''}
                        />
                    </div>
                    <div className={styles.div8}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco ? dados.endereco : ''}
                        />
                    </div>
                    <div className={styles.div9}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n ? dados.n : ''}
                        />
                    </div>
                    <div className={styles.div10}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade ? dados.cidade : ''}
                        />
                    </div>
                    <div className={styles.div11}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro ? dados.bairro : ''}
                        />
                    </div>
                    <div className={styles.div12}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep"
                            placeholder="000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cep ? dados.cep : ''}
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome da mãe"
                            name="nome_da_mae"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome_da_mae ? dados.nome_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_da_mae"
                            placeholder="00/00/0000"
                            handleOnChange={handleChange}
                            value={dados.data_da_mae ? dados.data_da_mae : ''}
                            min={dataMinima}
                            max={dataMaxima}
                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_da_mae"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cpf_da_mae ? dados.cpf_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_da_mae"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.rg_da_mae ? dados.rg_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_da_mae"
                            placeholder="Telefone 1"
                            handleOnChange={handleChange}
                            value={dados.telefone1_da_mae ? dados.telefone1_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_da_mae"
                            placeholder="Telefone 2"
                            handleOnChange={handleChange}
                            value={dados.telefone2_da_mae ? dados.telefone2_da_mae : ''}
                        />
                    </div>

                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_da_mae"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco_da_mae ? dados.endereco_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_da_mae"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n_da_mae ? dados.n_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_da_mae"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade_da_mae ? dados.cidade_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_da_mae"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro_da_mae ? dados.bairro_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_da_mae"
                            placeholder="000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cep_da_mae ? dados.cep_da_mae : ''}
                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_da_mae"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_da_mae ? dados.email_da_mae : ''}
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome do pai"
                            name="nome_do_pai"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome_do_pai ? dados.nome_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_do_pai"
                            placeholder="00/00/0000"
                            handleOnChange={handleChange}
                            value={dados.data_do_pai ? dados.data_do_pai : ''}
                            min={dataMinima}
                            max={dataMaxima}
                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cpf_do_pai ? dados.cpf_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.rg_do_pai ? dados.rg_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_do_pai"
                            placeholder="Telefone 1"
                            handleOnChange={handleChange}
                            value={dados.telefone1_do_pai ? dados.telefone1_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_do_pai"
                            placeholder="Telefone 2"
                            handleOnChange={handleChange}
                            value={dados.telefone2_do_pai ? dados.telefone2_do_pai : ''}
                        />
                    </div>

                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_do_pai"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco_do_pai ? dados.endereco_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_do_pai"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n_do_pai ? dados.n_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_do_pai"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade_do_pai ? dados.cidade_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_do_pai"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro_do_pai ? dados.bairro_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_do_pai"
                            placeholder="000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cep_do_pai ? dados.cep_do_pai : ''}
                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_do_pai"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_do_pai ? dados.email_do_pai : ''}
                        />
                    </div>
                </div>
                <div className={styles.containerbotao}>
                    <Botao
                        title="Salvar"
                        icone={<TfiSave />}
                        classname={styles.botao}
                    />
                </div>
            </form>
        </>
    );
}