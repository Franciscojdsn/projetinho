import Botao from "../Botao";

function InfoAlunos () {

    return (

        <div className="infoalunos">
            <Botao title="matricula" classname="botao-separado" />
            <table>
                <thead className="linha">
                    <tr className="linha">
                        <th className="linha">Total de Alunos</th>
                        <th className="linha">Pendentes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="linha">
                        <td className="linha">000</td>
                        <td>000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default InfoAlunos;