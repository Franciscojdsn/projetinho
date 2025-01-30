import React from "react";
import DadosFinanceiros from "./componentes/Financeiro/DadosFinanceiros";
import ListaFinanceiro from "./componentes/Financeiro/ListaFinanceiro";
import Botao from "./componentes/Botao/index";

const Financeiro = () => {
    return (
        <>
           <DadosFinanceiros />
           <ListaFinanceiro />
           <div className="titulo-renda-complementar">
               <h2>Renda Complementar</h2>
               <Botao title="Nova Renda" classname="botao-separado"/>
           </div>
            <ListaFinanceiro />
        </>
    )
}

export default Financeiro;