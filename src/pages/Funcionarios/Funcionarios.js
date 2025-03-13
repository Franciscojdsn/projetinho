import React from "react";
import InfoFuncionarios from "../../componentes/Funcionarios/InfoFuncionarios";
import ListaFuncionarios from "../../componentes/Funcionarios/ListaFuncionarios";
import Botao from "../../componentes/Botao";

const Funcionarios = () => {
    return (
        <>
            <h1>Pagina Funcionarios</h1>
            <div className="botoes-financeiro">
                <Botao title="Novo Funcionário" classname="botao-separado"/>
            </div>
            <ListaFuncionarios />
            <InfoFuncionarios />
        </>
    )
}

export default Funcionarios;