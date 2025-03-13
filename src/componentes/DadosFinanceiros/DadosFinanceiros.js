import React from "react";
import styles from './DadosFinanceiros.module.css'
import ContainerDados from "../ContainerDados/ContainerDados";

const DadosFinanceiros = () => {
    return (
        <>
            <div className={styles.containerdados}>
                <div className={styles.containerdadosfilho}>
                    <ContainerDados
                        primeira="entrada"
                        segunda="segunda"
                        title1="Entrada"
                        title2="Saída"
                        valor1="1.000"
                        valor2="1.000"
                        />
                </div>
                <div>
                    <ContainerDados
                        
                        title1="Valor total"
                        title2="Pendentes"
                        valor1="1.000"
                        valor2="1.000"
                    />
                </div>
            </div>
        </>
    )
}

export default DadosFinanceiros;