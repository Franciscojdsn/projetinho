import styles from "./ContainerDados.module.css"

export default function ContainerDados({title1, title2, valor1, valor2, primeira, segunda}) {

    return (

        <>
            <div className={styles.containerdados}>
                <div className={styles.containerdadoscontainer}>
                    <div className={styles[primeira]}>
                        <h4>{title1}</h4>
                    </div>
                    <div className={styles[segunda]}>
                        <h4>{title2}</h4>
                    </div>
                </div>
                <div className={styles.containerdadosdados}>
                    <p>{valor1}</p>
                    <p>{valor2}</p>
                </div>
            </div>
        </>
    )

}