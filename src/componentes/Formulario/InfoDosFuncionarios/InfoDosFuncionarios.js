import { useState } from 'react';
import { TfiSave } from "react-icons/tfi";
import { IoTrashBinOutline } from "react-icons/io5";

import Input from '../Componentes/Input/Input';
import Radio from '../Componentes/Radio/Radio';
import styles from './InfoDosFuncionarios.module.css'
import Botao from '../../Botao';

function InfoDosAlunos({ handleSubmit, dadosData }) {

    const [dados, setDados] = useState(dadosData || {})

    const anoAtual = new Date().getFullYear();
    const anoMinimo = anoAtual - 100;
    const anoMaximo = anoAtual - 1;

    const dataMinima = `${anoMinimo}-01-01`;
    const dataMaxima = `${anoMaximo}-12-31`;

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
                        text='Foto do funcionário:'
                        handleOnChange={handleFileChange}
                        placeholder="Escolha uma imagem"
                    />
                </div>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Nome do funcionário"
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
                            name="data_funcionario"
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
                        <Input
                            type="text"
                            text="Telefone 1"
                            name="telefone1_funcionario"
                            placeholder="Telefone 1"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone1_funcionario ? dados.telefone1_funcionario : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="text"
                            text="Telefone 2:"
                            name="telefone2_funcionario"
                            placeholder="Telefone 2"
                            handleOnChange={handleTelefoneChange}
                            value={dados.telefone2_funcinario ? dados.telefone2_funcinario : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
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
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_funcionario"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_funcionario ? dados.email_funcionario : ''}
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Função"
                            name="funcao"
                            placeholder="Função do funcionário"
                            handleOnChange={handleChange}
                            value={dados.funcao ? dados.funcao : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de entrada."
                            name="data_da_entrada"
                            placeholder="00/00/0000"
                            handleOnChange={handleChange}
                            value={dados.data_da_mae ? dados.data_da_mae : ''}
                            min={dataMinima}
                            max={dataMaxima}
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="text"
                            text="Salário:"
                            name="salario"
                            placeholder="R$ 0,00"
                            onInput={(e) => handleInputLimit(e, 9)}
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="text"
                            text="Pix"
                            name="pix_funcionario"
                            placeholder="Pix Funcionário"
                            handleOnChange={handleChange}
                            value={dados.pix_funcionario ? dados.pix_funcionario : ''}
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
                            text="Nº da Agência"
                            name="agencia_funcionario"
                            placeholder="nº da agência"
                            handleOnChange={handleChange}
                            value={dados.agencia_funcionario ? dados.agencia_funcionario : ''}
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº da conta"
                            name="n_conta_funcionario"
                            placeholder="Nº da conta"
                            handleOnChange={handleChange}
                            value={dados.n_conta_funcionario ? dados.n_conta_funcionario : ''}
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Dígito"
                            name="digito_funcionario"
                            placeholder="Dígito"
                            handleOnChange={handleChange}
                            value={dados.digito_funcionario ? dados.digito_funcionario : ''}
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Banco"
                            name="banco_funcionario"
                            placeholder="Banco"
                            handleOnChange={handleChange}
                            value={dados.banco_funcionario ? dados.banco_funcionario : ''}
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
                    funcionarios
                </div>
            </form>
        </>
    )

}

export default InfoDosAlunos;