function Botao({ id, classname, title, icone, type, onclick}) {
    return (
        <>

            <button
                id={id}
                onClick={onclick}
                type={type}
                className={classname}>{icone}{title}</button>
        </>
    )
}

export default Botao;