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
                        <Botao title="HIstórico" classname="botao-separado2"/>
                    </Link>
                    <Botao title="Financeiro" classname="botao-separado2"/>
                </div>
            </div>
        </>
    )

}

export default Cabecalho;