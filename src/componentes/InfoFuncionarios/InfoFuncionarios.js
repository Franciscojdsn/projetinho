import { Link } from 'react-router-dom'

import Botao from '../Botao'
import styles from './InfoFuncionarios.module.css'

export default function InfoFuncionarios() {

    return (

        <>
            <div className={styles.titulofuncionarios}>
                <div>

                </div>
                <div>
                    <h1>Funcionários</h1>
                </div>
                <div>
                    <Link to="DadosDosFuncionarios">
                        <Botao
                            title="Novo Funcionário"
                            icone=""
                            classname={styles.botao}>
                        </Botao>
                    </Link>
                </div>
            </div>

            <li className={styles.titulolistafuncionarios}>
                <div>
                    <h5>Nº</h5>
                </div>
                <div className={styles.div2}>
                    <h5>Funcionário</h5>
                </div>
                <div className={styles.div3}>
                    <h5>Função</h5>
                </div>
                <div className={styles.div4}>
                    <h5>Config</h5>
                </div>
            </li>
        </>

    )
}


