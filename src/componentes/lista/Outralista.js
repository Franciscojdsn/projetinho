function OutraLista ({itens}) {

    return (
        <>
            <h3>Lista de Linguagens</h3>
            {
                itens.length > 0 ? (

                itens.map((item, index) =>(
                    <p key={index}>{item}</p>
                ))) : (<p>Não há itens</p>)
            }
        </>
    )

}

export default OutraLista;