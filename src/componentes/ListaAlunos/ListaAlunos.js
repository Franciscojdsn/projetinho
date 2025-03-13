import styles from "./ListaAluno.module.css"

export default function ListaAlunos({ matricula, nome, responsavel, data, turma, turno, icone }) {

    return (
        <>
            <div className={styles.container}>
                <li className={styles.titulolista}>
                    <div>
                        <p>{matricula}</p>
                    </div>
                    <div className={styles.div2}>
                        <p>{nome}</p>
                    </div>
                    <div className={styles.div3}>
                        <p>{responsavel}</p>
                    </div>
                    <div className={styles.div4}>
                        <p>{data}</p>
                    </div>
                    <div className={styles.div5}>
                        <p>{turma}</p>
                    </div>
                    <div className={styles.div6}>
                        <p>{turno}</p>
                    </div>
                    <div className={styles.div7}>
                        <p>{icone}</p>
                    </div>
                </li>
            </div>
        </>
    )

}