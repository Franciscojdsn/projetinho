import { useState, useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";
import { IoTrashBinOutline } from "react-icons/io5";

import Input from '../Componentes/Input/Input';
import Radio from '../Componentes/Radio/Radio';
import Select from '../Componentes/Select/Select'
import styles from './InfoDosAlunos.module.css'
import Botao from '../../Botao';

function InfoDosAlunos({ handleSubmit, dadosData }) {


    const [opcoesturma, setOpcoesturma] = useState([])
    const [turno, setTurno] = useState([])
    const [dados, setDados] = useState(dadosData || {})

    const anoAtual = new Date().getFullYear();
    const anoMinimo = anoAtual - 100;
    const anoMaximo = anoAtual - 1;

    const dataMinima = `${anoMinimo}-01-01`;
    const dataMaxima = `${anoMaximo}-12-31`;

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

    const submit = (e) => {
        e.preventDefault();
    
        const dadosSemFormatacao = removerFormatacao(dados);
    
        console.log(dadosSemFormatacao);
        handleSubmit(dadosSemFormatacao);
    };

    function formatCPF(value) {
        return value
        .replace(/\D/g, '') // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    }
    
    function formatRG(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3'); // Adiciona os pontos
    }
    
    function formatTelefone(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses no DDD
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Adiciona o traço
    }
    
    function formatCEP(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{5})(\d{3})$/, '$1-$2'); // Adiciona o traço
    }
    
    function handleCPFChange(e) {
        const formattedCPF = formatCPF(e.target.value);
        setDados({ ...dados, [e.target.name]: formattedCPF });
        console.log(dados);
    }


    function handleTelefoneChange(e) {
        const formattedTelefone = formatTelefone(e.target.value);
        setDados({ ...dados, [e.target.name]: formattedTelefone });
        console.log(dados);
    }
    
    function handleCEPChange(e) {
        const formattedCEP = formatCEP(e.target.value);
        setDados({ ...dados, [e.target.name]: formattedCEP });
        console.log(dados);
    }

    function handleRGChange(e) {
        const formattedRG = formatRG(e.target.value);
        setDados({ ...dados, [e.target.name]: formattedRG });
        console.log(dados);
    }

    function removerFormatacao(dados) {
        const camposParaRemoverFormatacao = [
            'cpf', 'cpf_da_mae', 'cpf_do_pai', 'cpf_financeiro',
            'telefone1_da_mae', 'telefone2_da_mae', 'telefone1_do_pai', 'telefone2_do_pai',
            'telefone1_financeiro', 'telefone2_financeiro',
            'cep', 'cep_da_mae', 'cep_do_pai', 'cep_financeiro',
            'rg_da_mae', 'rg_do_pai', 'rg_financeiro'
        ];
    
        const dadosSemFormatacao = { ...dados };
    
        camposParaRemoverFormatacao.forEach((campo) => {
            if (dadosSemFormatacao[campo]) {
                dadosSemFormatacao[campo] = dadosSemFormatacao[campo].replace(/\D/g, '');
            }
        });
    
        return dadosSemFormatacao;
    }

    function handleInputLimit(e, maxLength) {
        if (e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength); // Limita o valor ao máximo permitido
        }
    }

    function handleChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
        console.log(dados)
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

    function handleClear() {
        const camposLimpos = Object.keys(dados).reduce((acc, key) => {
            acc[key] = ''; // Define cada campo como uma string vazia
            return acc;
        }, {});

        setDados(camposLimpos);
        console.log("Todos os campos foram limpos!");
    }

    function handleClick() {
        setDados((prevDados) => ({
            ...prevDados,
            resp_financeiro: prevDados.nome_da_mae,
            data_financeiro: prevDados.data_da_mae,
            cpf_financeiro: prevDados.cpf_da_mae,
            rg_financeiro: prevDados.rg_da_mae,
            telefone1_financeiro: prevDados.telefone1_da_mae,
            telefone2_financeiro: prevDados.telefone2_da_mae,
            endereco_financeiro: prevDados.endereco_da_mae,
            n_financeiro: prevDados.n_da_mae,
            cidade_financeiro: prevDados.cidade_da_mae,
            bairro_financeiro: prevDados.bairro_da_mae,
            cep_financeiro: prevDados.cep_da_mae,
            email_financeiro: prevDados.email_da_mae,
        }));
    }

    function handleClick1() {
        setDados((prevDados) => ({
            ...prevDados,
            resp_financeiro: prevDados.nome_do_pai,
            data_financeiro: prevDados.data_do_pai,
            cpf_financeiro: prevDados.cpf_do_pai,
            rg_financeiro: prevDados.rg_do_pai,
            telefone1_financeiro: prevDados.telefone1_do_pai,
            telefone2_financeiro: prevDados.telefone2_do_pai,
            endereco_financeiro: prevDados.endereco_do_pai,
            n_financeiro: prevDados.n_do_pai,
            cidade_financeiro: prevDados.cidade_do_pai,
            bairro_financeiro: prevDados.bairro_do_pai,
            cep_financeiro: prevDados.cep_do_pai,
            email_financeiro: prevDados.email_do_pai,
        }));
    }

    return (
        <>
            <form onSubmit={submit}>
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
                            type="text"
                            text="CPF:"
                            name="cpf"
                            placeholder="000.000.000-00"
                            handleOnChange={handleCPFChange}
                            value={dados.cpf ? dados.cpf : ''}
                            onInput={(e) => handleInputLimit(e, 14)}
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
                            type="text"
                            text="CEP"
                            name="cep"
                            placeholder="000.000-00"
                            handleOnChange={handleCEPChange}
                            value={dados.cep ? dados.cep : ''}
                            onInput={(e) => handleInputLimit(e, 9)}
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
                            type="text"
                            text="CPF:"
                            name="cpf_da_mae"
                            placeholder="000.000.000-00"
                            handleOnChange={handleCPFChange}
                            value={dados.cpf_da_mae ? dados.cpf_da_mae : ''}
                            onInput={(e) => handleInputLimit(e, 14)}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="text"
                            text="RG:"
                            name="rg_da_mae"
                            placeholder="0.000.000"
                            handleOnChange={handleRGChange}
                            value={dados.rg_da_mae ? dados.rg_da_mae : ''}
                            onInput={(e) => handleInputLimit(e, 9)}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="text"
                            text="Telefone 1"
                            name="telefone1_da_mae"
                            placeholder="Telefone 1"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone1_da_mae ? dados.telefone1_da_mae : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="text"
                            text="Telefone 2:"
                            name="telefone2_da_mae"
                            placeholder="Telefone 2"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone2_da_mae ? dados.telefone2_da_mae : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae12}>
                        <Botao
                            id="copiarDados"
                            onclick={handleClick}
                            type="button"
                            classname={styles.botao3}
                            title="Resp. Financeiro"
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
                            onInput={(e) => handleInputLimit(e, 8)}
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
                            type="text"
                            text="CPF:"
                            name="cpf_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleCPFChange}
                            value={dados.cpf_do_pai ? dados.cpf_do_pai : ''}
                            onInput={(e) => handleInputLimit(e, 14)}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="text"
                            text="RG:"
                            name="rg_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleRGChange}
                            value={dados.rg_do_pai ? dados.rg_do_pai : ''}
                            onInput={(e) => handleInputLimit(e, 9)}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="text"
                            text="Telefone 1"
                            name="telefone1_do_pai"
                            placeholder="Telefone 1"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone1_do_pai ? dados.telefone1_do_pai : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="text"
                            text="Telefone 2:"
                            name="telefone2_do_pai"
                            placeholder="Telefone 2"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone2_do_pai ? dados.telefone2_do_pai : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae12}>
                        <Botao
                            id="copiarDados"
                            onclick={handleClick1}
                            type="button"
                            classname={styles.botao3}
                            title="Resp. Financeiro"
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
                            type="text"
                            text="CEP"
                            name="cep_do_pai"
                            placeholder="000.000-00"
                            handleOnChange={handleCEPChange}
                            value={dados.cep_do_pai ? dados.cep_do_pai : ''}
                            onInput={(e) => handleInputLimit(e, 8)}
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

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome do responsável financeiro"
                            name="resp_financeiro"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.resp_financeiro ? dados.resp_financeiro : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_financeiro"
                            placeholder="00/00/0000"
                            handleOnChange={handleChange}
                            value={dados.data_financeiro ? dados.data_financeiro : ''}
                            min={dataMinima}
                            max={dataMaxima}
                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="text"
                            text="CPF:"
                            name="cpf_financeiro"
                            placeholder="000.000.000-00"
                            handleOnChange={handleCPFChange}
                            value={dados.cpf_financeiro ? dados.cpf_financeiro : ''}
                            onInput={(e) => handleInputLimit(e, 14)}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="text"
                            text="RG:"
                            name="rg_financeiro"
                            placeholder="000.000.000-00"
                            handleOnChange={handleRGChange}
                            value={dados.rg_financeiro ? dados.rg_financeiro : ''}
                            onInput={(e) => handleInputLimit(e, 8)}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="text"
                            text="Telefone 1"
                            name="telefone1_financeiro"
                            placeholder="Telefone 1"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone1_financeiro ? dados.telefone1_financeiro : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="text"
                            text="Telefone 2:"
                            name="telefone2_financeiro"
                            placeholder="Telefone 2"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone2_financeiro ? dados.telefone2_financeiro : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>

                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_financeiro"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco_financeiro ? dados.endereco_financeiro : ''}
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_financeiro"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n_financeiro ? dados.n_financeiro : ''}
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_financeiro"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade_financeiro ? dados.cidade_financeiro : ''}
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_financeiro"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro_financeiro ? dados.bairro_financeiro : ''}
                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="text"
                            text="CEP"
                            name="cep_financeiro"
                            placeholder="000.000-00"
                            handleOnChange={handleCEPChange}
                            value={dados.cep_financeiro ? dados.cep_financeiro : ''}
                            onInput={(e) => handleInputLimit(e, 8)}
                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_financeiro"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_financeiro ? dados.email_financeiro : ''}
                        />
                    </div>
                </div>
                <div className={styles.containerbotao}>
                    <Botao
                        type="button"
                        onclick={handleClear}
                        title="Limpar"
                        icone={<IoTrashBinOutline />}
                        classname={styles.botao4}
                    />
                    <Botao
                        title="Salvar"
                        icone={<TfiSave />}
                        classname={styles.botao}
                    />
                </div>
            </form>
        </>
    )

}

export default InfoDosAlunos;