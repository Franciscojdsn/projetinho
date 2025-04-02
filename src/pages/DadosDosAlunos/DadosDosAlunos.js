import styles from "./DadosDosAlunos.module.css"
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'

import InfoDosAlunos from "../../componentes/Formulario/InfoDosAlunos/InfoDosAlunos";
import Cabecalho from "../../componentes/Formulario/Cabecalho/Cabecalho";


const DadosDosAlunos = () => {

    
    const navigate = useNavigate()

    function addAluno(dados) {
        // Busca todos os alunos para determinar o maior número de matrícula
        fetch('http://localhost:5000/alunos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((alunos) => {
                // Determina o próximo número de matrícula
                const ultimaMatricula = alunos.length > 0
                    ? Math.max(...alunos.map((aluno) => aluno.matricula || 0))
                    : 0;
                const novaMatricula = ultimaMatricula + 1;
    
                // Adiciona o número de matrícula ao objeto `dados`
                dados.matricula = novaMatricula;
    
                // Adiciona o ID único ao objeto `dados`
                dados.id = uuid();
    
                // Envia os dados para o servidor
                return fetch('http://localhost:5000/alunos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados),
                });
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Aluno criado com sucesso:", data);
                navigate(`/DadosDosAlunos/Financeiro/${dados.id}`, { state: { message: 'Aluno criado com sucesso!' } });
            })
            .catch((err) => console.log("Erro ao adicionar aluno:", err));
    }

    return (
        <>
            <div className={styles.containerdados}>
                <Cabecalho />
                <InfoDosAlunos
                    handleSubmit={addAluno}
                />
            </div>
        </>
    )
}

export default DadosDosAlunos;