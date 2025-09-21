import styles from "./ContainerDados.module.css"

export default function ContainerDados({ title1, title2, valor1, valor2, primeira, segunda, onClickEntrada, onClickSaida }) {

    return (
        <>
            <div className={styles.containerdados} style={{ width: '100%' }}>
                <div className={styles.containerdadoscontainer}>
                    <div
                        //Div que torna o primeiro container clicavel
                        className={styles[primeira]}
                        onClick={onClickEntrada}
                        style={onClickEntrada ? { cursor: 'pointer' } : {}}
                        >
                        <h4>{title1}</h4>
                    </div>

                    <div
                        //Div que torna o segundo container clicavel
                        className={styles[segunda]}
                        onClick={onClickSaida}
                        style={onClickSaida ? { cursor: 'pointer' } : {}}
                    >
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