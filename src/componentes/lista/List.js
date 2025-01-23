import Item from "./Item"

function List () {
    return (
        <>
            <h3>Aluno - Responsável</h3>
            <ul className="listaalunos">
                <Item aluno="Jose" responsavel="Julio"/>
                <Item aluno="Emilio" responsavel="Adoleta"/>
                <Item aluno="Cade" responsavel="Vivenci"/>
                <Item/>
            </ul>
        </>
    )

}

export default List;