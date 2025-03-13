function Botao({event, classname, title, icone}) {
    return (
        <>

            <button
               onClick={event}
                className={classname}>
                    {icone}
                    {title}
            </button>
        </>
    )
}

export default Botao;