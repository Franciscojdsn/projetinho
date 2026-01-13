import styles from './InputExibirTurmas.module.css'

export default function InputExibirTurmas({ nome_turma, inicio_aulas, turma_turno, turma_professor, id, turma_diasletivos, previsao_aulas }) {


    const getProfessorNome = (p) => {
        if (!p) return '';
        if (typeof p === 'string') return p;
        return p.nome || p.nome_funcionario || p.name || '';
    };

    const professorNome = getProfessorNome(turma_professor);
    const professorId = typeof turma_professor === 'object' ? (turma_professor.id || '') : (typeof turma_professor === 'string' ? turma_professor : '');

    return (

        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <label htmlFor={nome_turma}>Nome da Turma:</label><br></br>
                        <span name={nome_turma} id={nome_turma}>{nome_turma}</span>
                    </div>
                    <div className={styles.div2}>
                        <label htmlFor={inicio_aulas}>Início das Aulas:</label><br></br>
                        <span name={inicio_aulas} id={inicio_aulas}>{inicio_aulas}</span>
                    </div>
                    <div className={styles.div3}>
                        <label htmlFor={turma_turno}>Turno:</label><br></br>
                        <span name={turma_turno} id={turma_turno}>{turma_turno}</span>
                    </div>
                    <div className={styles.div4}>
                        <label htmlFor={professorId}>Prof:</label><br></br>
                        <span name={professorNome} id={professorId}>{professorNome}</span>
                    </div>
                    <div className={styles.div5}>
                        <label htmlFor={turma_diasletivos}>Dias Letivos:</label><br></br>
                        <span name={turma_diasletivos} id={turma_diasletivos}>{turma_diasletivos}</span>
                    </div>
                    <div className={styles.div6}>
                        <label htmlFor={previsao_aulas}>Previsão de Término:</label><br></br>
                        <span name={previsao_aulas} id={previsao_aulas}>{previsao_aulas}</span>
                    </div>
                    
                </div>
            </form>
        </>

    )

}