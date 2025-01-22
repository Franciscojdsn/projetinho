import Item from "./Item"

function List () {
    return (
        <>
            <h1>Minha Lista</h1>
            <ul>
                <Item aluno="Jose" responsavel="Julio"/>
                <Item aluno="Emilio" responsavel="Adoleta"/>
                <Item aluno="Cade" responsavel="Vivenci"/>
                <Item/>
            </ul>
        </>
    )

}

export default List;