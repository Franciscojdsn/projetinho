import Botao from "../Botao";

function Cabecalho () {

    return (
        <>
            <div className="cabecalho">
                <div className="Item1">
                    <h1>Dados dos Alunos</h1>
                </div>
                <div className="Item2">
                    <Botao title="HIstórico" classname="botao-separado2"/> <br></br>
                    <Botao title="Imprimir" classname="botao-separado2"/>
                </div>
            </div>
        </>
    )

}

export default Cabecalho;