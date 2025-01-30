import Botao from "../Botao";
import { Link } from "react-router-dom";

function Cabecalho () {


    return (
        <>
            <div className="cabecalho">
                <div className="Item1">
                    <h1>Dados dos Alunos</h1>
                </div>
                <div className="Item2">
                    <Link to="Historico">
                        <Botao title="Histórico" classname="botao-separado2"/>
                    </Link>
                    <Link to="FinanceiroAluno">
                        <Botao title="Financeiro" classname="botao-separado2"/>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default Cabecalho;