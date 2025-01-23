function Botao(props) {
    return (
        <>

            <button
               onClick={props.event}
                className={props.classname}>
                    {props.title}
            </button>
        </>
    )
}

export default Botao;