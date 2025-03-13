import styles from "./TituloLista.module.css"

export default function TituloLista () {

    return (
        <>
            <li className={styles.titulo}>
                <div>
                    <h5>Nº</h5>
                </div>
                <div className={styles.div2}>
                    <h5>Nome do aluno</h5>
                </div>
                <div className={styles.div3}>
                    <h5>Nome do resp.</h5>
                </div>
                <div className={styles.div4}>
                    <h5>Data de nasc.</h5>
                </div>
                <div className={styles.div5}>
                    <h5>Turma</h5>
                </div>
                <div className={styles.div6}>
                    <h5>Turno</h5>
                </div>
                <div className={styles.div7}>
                    <h5>config.</h5>
                </div>
            </li>
        </>

    )

}