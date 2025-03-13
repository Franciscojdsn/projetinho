import React from "react";
import styles from "./Financeiro.module.css"
import { MdFormatListBulletedAdd } from "react-icons/md";
import DadosFinanceiros from "../../componentes/DadosFinanceiros/DadosFinanceiros";
import Botao from "../../componentes/Botao/index";

const Financeiro = () => {
    return (
        <>
           <DadosFinanceiros />
           <div className={styles.containerrendacomplementar}>
                   <div>
                       <h2>Renda Complementar</h2>
                   </div>
                   <div>
                       <Botao
                            icone={<MdFormatListBulletedAdd />}
                            title="Nova Renda"
                            classname={styles.botao}
                        />
                   </div>
           </div>
        </>
    )
}

export default Financeiro;