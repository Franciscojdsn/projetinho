import Botao from "../Botao/index"

export default function Turmas() {

    return (
        <>
            
            <div className="tituloturmas">
                    <div className="Turma1">
                        <h1>Turmas</h1>
                    </div>
                    <div className="Turma2">
                        <Botao title="Nova Turma" classname="botao-separado"/>
                    </div>
            </div>
            
            <div className="tabelaturmas">
                <table className="sticky-thc">
                    <thead>
                        <tr className="linha">
                            <th className="linha">Turma</th>
                            <th className="linha">Professor(a)</th>
                            <th className="linha"> Turno</th>
                            <th className="linha"> Qtd. Alunos</th>
                            <th> ***</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr className="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr className="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>                            
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                        <tr class="linha">
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                            <td className="linha">000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}
