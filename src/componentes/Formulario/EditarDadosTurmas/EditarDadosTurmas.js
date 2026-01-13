import { useState } from 'react';
import { useEffect } from 'react';
import { TfiSave } from "react-icons/tfi";

import styles from './EditarDadosTurmas.module.css';
import Input from '../Componentes/Input/Input';
import Select from '../Componentes/Select/Select';
import Botao from '../../Botao/index'
import { IoTrashBinOutline } from "react-icons/io5"; 


export default function EditarDados({ aluno, onSave }) {
    const [dados, setDados] = useState(aluno);
    const [opcoesProfessor, setOpcoesProfessor] = useState([]);
    const [opcoesTurno, setOpcoesTurno] = useState([]);

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

    useEffect(() => {
        fetch('http://localhost:5000/funcionarios', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                const nomeDaFuncao = (f) => {
                    if (!f) return '';
                    if (typeof f === 'string') return f;
                    return f.nome || f.nome_funcao || f.name || '';
                };

                const professores = data.filter((item) => {
                    const funcaoNome = nomeDaFuncao(item.funcao).toLowerCase();
                    return funcaoNome.includes('professor');
                });

                const options = professores.map((p) => ({ id: p.id, nome: p.nome_funcionario || p.nome || p.name || '' }));
                setOpcoesProfessor(options);
            })
            .catch((err) => console.log(err))

        fetch('http://localhost:5000/turnos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                const options = data.map((t) => ({ id: t.id, nome: t.nome }));
                setOpcoesTurno(options);
            })
            .catch((err) => console.log(err))
    }, []);

    function getProfessorId(professor) {
        if (!professor) return '';
        if (typeof professor === 'object') return professor.id || '';
        if (typeof professor === 'string') {
            const found = opcoesProfessor.find((o) => o.nome === professor);
            return found ? found.id : '';
        }
        return '';
    }

    function handleSelectProfessor(e) {
        setDados((prev) => ({ ...prev, turma_professor: { id: e.target.value, nome: e.target.options[e.target.selectedIndex]?.text || '' } }));
    }

    function handleSelectTurno(e) {
        setDados((prev) => ({ ...prev, turma_turno: e.target.options[e.target.selectedIndex]?.text || '' }));
    }

    return (
        <>
            <form onSubmit={submit}> 
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
                        <Select
                            name="turma_turno"
                            label="Turnos:"
                            text="Selecione o turno"
                            options={opcoesTurno}
                            handleOnChange={handleSelectTurno}
                            value={opcoesTurno.find(o => o.nome === dados.turma_turno)?.id || ''}
                        />
                    </div>
                    <div className={styles.div5}>
                        <Select
                            name="turma_professor"
                            label="Professor:"
                            text="Selecione o professor"
                            options={opcoesProfessor}
                            handleOnChange={handleSelectProfessor}
                            value={getProfessorId(dados.turma_professor)}
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