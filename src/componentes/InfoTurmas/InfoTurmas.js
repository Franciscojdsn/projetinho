import styles from "./InfoTurmas.module.css"
import { MdOutlineAddHomeWork } from "react-icons/md";

import Botao from "../Botao/index"

export default function Turmas() {

    return (
        <>
            <div className={styles.tituloturmas}>
                <div>

                </div>
                <div>
                    <h1>Turmas</h1>
                </div>
                    <Botao
                        title="Nova Turma"
                        icone={<MdOutlineAddHomeWork />}
                        classname={styles.botao}>
                    </Botao>
            </div>

            <li className={styles.titulolista}>
                <div >
                    <h5>Nº</h5>
                </div>
                <div className={styles.div2}>
                    <h5>Professor</h5>
                </div>
                <div className={styles.div3}>
                    <h5>Turma</h5>
                </div>
                <div className={styles.div4}>
                    <h5>Turno</h5>
                </div>
                <div className={styles.div5}>
                    <h5>Qtd. aluno</h5>
                </div>
                <div className={styles.div6}>
                    <h5>Config.</h5>
                </div>
            </li>
        </>
    )

}
