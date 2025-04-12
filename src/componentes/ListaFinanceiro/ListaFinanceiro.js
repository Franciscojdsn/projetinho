import styles from "./ListaFinanceiro.module.css"
import { Link } from "react-router-dom"

export default function ListaFinanceiro({ itemKey , link, id, nome, valor, icone }) {

    return (
        <>
            <div className={styles.container}>
                <li className={styles.titulolista}>
                    <div className={styles.div1}>
                        <p>{id}</p>
                    </div>
                    <div className={styles.div2}>
                        <p>{nome}</p>
                    </div>
                    <div className={styles.div3}>
                        <p>{valor}</p>
                    </div>
                    <div className={styles.div7}>
                        <Link to={link}>
                            <p>{icone}</p>
                        </Link>
                    </div>
                </li>
            </div>
        </>
    )

}