import React from "react";

const DadosFinanceiros = () => {
    return (
        <>
            <h1>Pagina Financeiro</h1>
            <div className="tabela-financeiro">
                <div className="info-financeiro">
                    <table className="tabela-financeiro1">
                        <thead>
                            <th className="linha">Entrada Mensal</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R$ 1.000,00</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tabela-financeiro1">
                        <thead>
                            <th className="linha">Saída Mensal</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R$ 1.000,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="info-financeiro">
                    <table className="tabela-financeiro1">
                        <thead>
                            <th className="linha">Total Alunos</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R$ 1.000,00</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tabela-financeiro1">
                        <thead>
                            <th className="linha">Alunos Pendentes</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R$ 1.000,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DadosFinanceiros;