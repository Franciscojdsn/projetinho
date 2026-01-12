import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";

import styles from './EditarDadosTurmas.module.css';
import Input from '../Componentes/Input/Input';
import Radio from '../Componentes/Radio/Radio';
import Botao from '../../Botao/index'
import { IoTrashBinOutline } from "react-icons/io5";
import { v4 as uuid } from 'uuid';


export default function EditarDados({ aluno, onSave }) {
    const [dados, setDados] = useState(aluno);

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

    function submit(e) {
        e.preventDefault();
        const dadosSemFormatacao = removerFormatacao(dados);
        onSave(dadosSemFormatacao); // Chama a função de salvar com os dados atualizados
    }

    function handleClear() {
        const camposLimpos = Object.keys(dados).reduce((acc, key) => {
            acc[key] = ''; // Define cada campo como uma string vazia
            return acc;
        }, {});

        setDados(camposLimpos);
        console.log("Todos os campos foram limpos!");
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
                <div className={styles.container1}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Nome da turma111"
                            name="nome_turma"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome_turma ? dados.nome_turma : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="text"
                            text="Turno:"
                            name="turma_turno"
                            placeholder="Turno"
                            handleOnChange={handleChange}
                            value={dados.turma_turno ? dados.turma_turno : ''}
                        />
                    </div>
                    <div className={styles.div5}>
                        <Input
                            type="text"
                            text="Professor"
                            name="turma_professor"
                            placeholder="Professor"
                            handleOnChange={handleChange}
                            value={dados.turma_professor ? dados.turma_professor : ''}
                            onInput={(e) => handleInputLimit(e, 15)}
                        />
                    </div>
                    <div className={styles.div7}>
                        <Input
                            type="text"
                            text="Dias Letivos"
                            name="turma_diasletivos"
                            placeholder="Dias Letivos"
                            handleOnChange={handleChange}
                            value={dados.turma_diasletivos ? dados.turma_diasletivos : ''}
                        />
                    </div>
                    <div className={styles.div8}>
                        <Input
                            type="date"
                            text="Início das aulas"
                            name="inicio_aulas"
                            placeholder="Início das aulas"
                            handleOnChange={handleChange}
                            value={dados.inicio_aulas ? dados.inicio_aulas : ''}
                        />
                    </div>
                    <div className={styles.div10}>
                        <Input
                            type="date"
                            text="Previsão de término:"
                            name="previsao_aulas"
                            placeholder="Previsão de término"
                            handleOnChange={handleChange}
                            value={dados.previsao_aulas ? dados.previsao_aulas : ''}
                            onInput={(e) => handleInputLimit(e, 14)}
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
                        type="submit"
                    />
                </div>
            </form>
        </>
    )
}