function Botao(props) {
    return (
        <button
            onClick={props.event} 
            className="botao-separado">
                {props.title}
        </button>
    )
}

export default Botao;