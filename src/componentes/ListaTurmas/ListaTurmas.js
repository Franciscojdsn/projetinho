import styles from './ListaTurmas.module.css'

export default function ListaTurmas ({idturma, turma, professor, turno, qtdalunos, config}) {

    return (

        <>
            <li className={styles.listaturmas}>
                <div className={styles.div1}>
                    <p>{idturma}</p>
                </div>
                <div className={styles.div2}>
                    <p>{professor}</p>
                </div>
                <div className={styles.div3}>
                    <p>{turma}</p>
                </div>
                <div className={styles.div4}>
                    <p>{turno}</p>
                </div>
                <div className={styles.div5}>
                    <p>{qtdalunos}</p>
                </div>
                <div className={styles.div6}>
                    <p>{config}</p>
                </div>
            </li>
        </>

    )

}