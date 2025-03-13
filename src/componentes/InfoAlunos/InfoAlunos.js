import { Link } from "react-router-dom";
import { BsPersonAdd } from "react-icons/bs";
import Botao from "../Botao";
import styles from "./InfoAlunos.module.css"
import ContainerDados from "../ContainerDados/ContainerDados";



function InfoAlunos() {

    return (

        <div className={styles.containerinfoalunos}>
            <div>

                <Link to="DadosDosAlunos">
                    <Botao
                        title="Mátricula"
                        icone={<BsPersonAdd />}
                        classname={styles.botao}>
                    </Botao>
                </Link>
            </div>
            <ContainerDados 
                title1="Total Alunos"
                title2="Pendentes" 
                valor1="80"
                valor2="10"
            />
        </div>
    )

}

export default InfoAlunos;