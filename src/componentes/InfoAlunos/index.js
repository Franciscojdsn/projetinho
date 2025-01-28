import Botao from "../Botao";
import { Link } from "react-router-dom";

function InfoAlunos () {

    return (

        <div className="infoalunos">
            <Link to="DadosDosAlunos">
                <Botao title="matricula" classname="botao-separado" />
            </Link>
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