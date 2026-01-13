import styles from "./DadosTurmas.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react';

import { useParams, Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Botao from "../../componentes/Botao";
import Loading from "../../componentes/Formulario/Componentes/Loading/Loading";

import InputExibirTurmas from "../../componentes/Formulario/Componentes/InputExibirTurmas/InputExibirTurmas";
import EditarDadosTurmas from "../../componentes/Formulario/EditarDadosTurmas/EditarDadosTurmas";
import ListaAlunos from "../../componentes/ListaAlunos/ListaAlunos";
import TituloLista from "../../componentes/TituloLista/TituloLista";
import { CiCircleMore } from "react-icons/ci";


export default function DadosTurmas({ }) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [turmas, setTurmas] = useState([])

    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || null);

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [alunosTurma, setAlunosTurma] = useState([]);
    const [alunosPendentes, setAlunosPendentes] = useState(new Set());
    const [sortKey, setSortKey] = useState('nome');
    const [sortOrder, setSortOrder] = useState('asc');

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
        // Busca os dados do funcionario pelo ID
        setIsLoading(true);
        fetch(`http://localhost:5000/turmas/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setTurmas(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [id]);

    // Busca alunos vinculados a esta turma e dados de financeiro para pendências
    useEffect(() => {
        if (!id) return;
        setIsLoading(true);

        Promise.all([
            fetch('http://localhost:5000/alunos', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then((r) => r.json()),
            fetch('http://localhost:5000/financeiro', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then((r) => r.json())
        ])
            .then(([alunosData, financeiroData]) => {
                // Filtra apenas alunos cuja turma.id === id (ou com nome correspondente como fallback)
                const filtered = alunosData.filter((a) => {
                    if (!a.turma) return false;
                    if (a.turma.id) return String(a.turma.id) === String(id);
                    const turmaNome = turmas?.nome_turma || turmas?.nome || '';
                    return turmaNome && String(a.turma.nome) === String(turmaNome);
                });

                setAlunosTurma(filtered);

                // Determina alunos pendentes (reaproveita lógica do Home)
                const hoje = new Date();
                const idsPendentes = new Set(
                    financeiroData.filter(fin => {
                        if (!fin.boletos || !Array.isArray(fin.boletos)) return false;
                        return fin.boletos.some(boleto => {
                            if (!boleto.data_vencimento) return false;
                            const [dia, mes, ano] = boleto.data_vencimento.split('/');
                            const dataVencimento = new Date(`${ano}-${mes}-${dia}`);
                            return dataVencimento < hoje;
                        });
                    }).map(fin => fin.id)
                );
                setAlunosPendentes(idsPendentes);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [id, turmas]);

    function toggleEditMode() {
        setIsEditing((prev) => !prev);
    }

    function handleEdit(updatedData) {
        fetch(`http://localhost:5000/turmas/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar apenas os campos alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Envia os dados atualizados
        })
            .then((resp) => {
                if (resp.ok) {
                    // Atualiza os dados do aluno no estado
                    navigate(`/DadosTurmas/${id}`, { state: { message: 'Funcionario atualizado com sucesso!' } });
                    setTurmas((prevTurmas) => ({ ...prevTurmas, ...updatedData }));
                    setIsEditing(false) // Redireciona para a página do aluno após a atualização
                    window.scrollTo(0, 0);
                } else {
                    alert("Erro ao atualizar os dados da turma.");
                }
            })
            .catch((err) => console.log("Erro ao atualizar os dados da turma:", err));
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
            // Exclui os dados do aluno na tabela `alunos`
            fetch(`http://localhost:5000/turmas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => {
                    if (resp.ok) {
                        navigate(`/Turmas`, { state: { message: 'Turma excluída com sucesso!' } });
                        window.scrollTo(0, 0);
                    } else {
                        throw new Error("Erro ao excluir a turma.");
                    }
                })
                .catch((err) => console.log("Erro ao excluir a turma:", err));
        }
    }

    // Computa a lista ordenada conforme sortKey / sortOrder
    function getCompareValue(aluno, key) {
        switch (key) {
            case 'nome':
                return (aluno.nome || '').toLowerCase();
            case 'matricula':
                return Number(aluno.matricula) || 0;
            case 'data':
                return aluno.data ? new Date(aluno.data).getTime() : 0;
            case 'turno': {
                let t = '';
                if (aluno.turno) t = typeof aluno.turno === 'object' ? (aluno.turno.nome || '') : aluno.turno;
                else if (aluno.turma && aluno.turma.turno) t = typeof aluno.turma.turno === 'object' ? (aluno.turma.turno.nome || '') : aluno.turma.turno;
                return t.toLowerCase();
            }
            default:
                return '';
        }
    }

    const sortedAlunos = [...alunosTurma].sort((a, b) => {
        const va = getCompareValue(a, sortKey);
        const vb = getCompareValue(b, sortKey);

        if (typeof va === 'number' && typeof vb === 'number') return sortOrder === 'asc' ? va - vb : vb - va;
        if (va < vb) return sortOrder === 'asc' ? -1 : 1;
        if (va > vb) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        {message && <div className={styles.successmessage}>{message}</div>} {/* Exibe a mensagem, se existir */}
                    </div>
                    <div className={styles.containerdados}>
                        {isEditing ? (
                            <EditarDadosTurmas aluno={turmas} onSave={handleEdit} />
                        ) : (
                            <>
                                {turmas && (
                                    <>
                                        <div className={styles.containercabecalho}>
                                            <InputExibirTurmas
                                                nome_turma={turmas.nome_turma}
                                                inicio_aulas={turmas.inicio_aulas ? (() => {
                                                    const data = new Date(turmas.inicio_aulas);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                previsao_aulas={turmas.previsao_aulas ? (() => {
                                                    const data = new Date(turmas.previsao_aulas);
                                                    const dia = String(data.getDate()).padStart(2, '0');
                                                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                    const ano = data.getFullYear();
                                                    return `${dia}/${mes}/${ano}`;
                                                })() : 'Não informada'}
                                                turma_turno={turmas.turma_turno}
                                                turma_professor={turmas.turma_professor}
                                                turma_diasletivos={turmas.turma_diasletivos}
                                                
                                            />
                                        </div>

                                        {/* Lista de alunos movida para uma seção separada */}
                                    </>
                                )}
                            </>
                        )}
                        <div className={styles.containerbotao}>
                            <Botao
                                title={isEditing ? "Cancelar" : "Editar"}
                                classname={styles.botao}
                                icone={<AiOutlineEdit />}
                                onclick={toggleEditMode} // Alterna entre os modos de edição e exibição
                            />
                            <Botao
                                title="excluir"
                                classname={styles.botao4}
                                icone={<IoTrashBinOutline />}
                                onclick={handleDelete} // Adiciona a função de exclusão ao botão
                            />
                        </div>
                    </div>

                    {/* Seção separada para a lista de alunos da turma */}
                    <div className={styles.containerlista}>
                        <div className={styles.listaHeader}>
                            <h3>Alunos desta turma</h3>
                            <div className={styles.sortControls}>
                                <label>
                                    Ordenar por:&nbsp;
                                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                                        <option value="nome">Nome</option>
                                        <option value="matricula">Matrícula</option>
                                        <option value="data">Data de nascimento</option>
                                        <option value="turno">Turno</option>
                                    </select>
                                </label>
                                <button type="button" onClick={() => setSortOrder((s) => (s === 'asc' ? 'desc' : 'asc'))}>
                                    {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                                </button>
                            </div>
                        </div>

                        <ul>
                            <TituloLista />
                            {sortedAlunos.length > 0 ? (
                                sortedAlunos.map((aluno) => {
                                    const estaPendente = alunosPendentes.has(aluno.id);

                                    // Deriva o turno (compatibilidade com diferentes formatos)
                                    let turnoValor = '';
                                    if (aluno.turno) {
                                        turnoValor = typeof aluno.turno === 'object' ? (aluno.turno.nome || '') : aluno.turno;
                                    } else if (aluno.turma && aluno.turma.turno) {
                                        turnoValor = typeof aluno.turma.turno === 'object' ? (aluno.turma.turno.nome || '') : aluno.turma.turno;
                                    }

                                    return (
                                        <ListaAlunos
                                            key={aluno.matricula}
                                            id={aluno.matricula}
                                            vencido={estaPendente ? <span style={{ color: 'red', fontWeight: 'bold' }} title="Boleto vencido">⚠️</span> : null}
                                            nome={aluno.nome}
                                            responsavel={aluno.resp_financeiro ? aluno.resp_financeiro : ''}
                                            data={aluno.data ? (() => {
                                                const data = new Date(aluno.data);
                                                const dia = String(data.getDate()).padStart(2, '0');
                                                const mes = String(data.getMonth() + 1).padStart(2, '0');
                                                const ano = data.getFullYear();
                                                return `${dia}/${mes}/${ano}`;
                                            })() : 'Não informada'}
                                            turma={aluno.turma ? aluno.turma.nome : ''}
                                            turno={turnoValor}
                                            icone={<CiCircleMore />}
                                            link={`/PaginaAluno/${aluno.id}`}
                                        />
                                    )
                                })
                            ) : (
                                <p>Não há alunos vinculados a esta turma.</p>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}