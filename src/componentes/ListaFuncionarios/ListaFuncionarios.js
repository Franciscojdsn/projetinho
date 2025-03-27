import styles from './ListaFuncionarios.module.css'

export default function ListaFuncionarios ({id, funcionario, funcao, config}) {

    return(

        <>
            <li className={styles.container}>
                <div>
                    <p>{id}</p>
                </div>
                <div className={styles.div2}>
                    <p>{funcionario}</p>
                </div>
                <div className={styles.div3}>
                    <p>{funcao}</p>
                </div>
                <div className={styles.div4}>
                    <p>{config}</p>
                </div>
            </li>
        </>

    )

}