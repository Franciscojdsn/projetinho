import React from "react";
import './App.scss';
import OutraLista from "./componentes/lista/Outralista";


const Home = () => {

    const meusItens = ['React','Vue' ,'JavaScript', 'Java', 'luup' ]

    return (
        <>
            <OutraLista itens={meusItens}/>
            <OutraLista itens={[]}/>
            {/*<main>
            <Evento title="evento" numero="primeiro"/>
            <Botao title="evento" numero="segundo"/>
            <List/>
            <Cabecalho/>
                <section>
                    <div className="container">
                        
                        <Botao />
                        <div className="botoes">
                            <input type="button" name="matricula" value="Mátricula" className="botao-separado"></input>
                            <input type="button" name="matricula" value="Financeiro" className="botao-separado"></input>
                            <br></br>
                            <input type="button" name="matricula" value="Turmas" className="botao-separado"></input>
                            <input type="button" name="matricula" value="Funcionários" className="botao-separado"></input>
                        </div>
                        <div class="dados">
                            <table>
                                <thead>
                                    <tr className="linha">
                                        <th className="linha">Total de alunos</th>
                                        <th className="linha"> Alunos Pendentes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="linha">
                                        <td className="linha">000</td>
                                        <td className="linha">000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className="tabela">
                    <table >
                        <thead>
                            <tr className="linha">
                                <th className="linha">Matrícula</th>
                                <th className="linha">Total de alunos</th>
                                <th className="linha"> Responsável</th>
                                <th className="linha"> Turma</th>
                            </tr>
                        </thead>
                        <tbody>
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
                            <tr className="linha">
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                            </tr>                            <tr class="linha">
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                                <td className="linha">000</td>
                            </tr>

                        </tbody>
                    </table>
                </section>
            </main> */}
        </>
    )
}

export default Home;