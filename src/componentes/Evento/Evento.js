import Botao from "../Botao"

function Evento() {

    function meuEvento () {
        console.log(`Opa `)
    }

    function segundoEvento () {
        console.log (`Segundo evento`)
    }

    return (
        <div>
            <Botao
                title="Clique!"
                event={meuEvento}/>
            <Botao
                title="Clique!"
                event={segundoEvento}/>
        </div>
    )
}

export default Evento