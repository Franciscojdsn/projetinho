import InfoDosAlunos from "../Formulario/InfoDosAlunos/InfoDosAlunos";
import Botao from "../Botao/index";

export default function FinanceiroAluno() {

    return (
        <>

            <h1>Financeiro</h1>
            <div className="botoes-financeiro">
                <Botao title="Editar" classname="botao-separado"/>
                <Botao title="Gerar Boleto" classname="botao-separado"/>
            </div>
            <InfoDosAlunos />
            <form>
                <div className="container-financeiro1">
                    <div className="container-financeiro">
                        <div>
                            <label for="input-turma" id="label-turma"> Turma</label>
                            <br></br>
                            <select labelledby="label-turma" id="input-turma" className="dados-financeiro">
                                <option>Maternal II</option>
                                <option>Maternal III</option>
                                <option>Jardim I</option>
                                <option>Jardim II</option>
                            </select>
                        </div>
                        <div>
                            <label for="input-turno" id="label-turno"> Turno</label>
                            <br></br>
                            <select labelledby="label-turno" id="input-turno" className="dados-financeiro">
                                <option>Manhã</option>
                                <option>Tarde</option>
                            </select>
                        </div>
                        <div>
                            <label for="input-nota3" id="label-nota3"> Mesalidade</label>
                            <br></br>
                            <input type="number" labelledby="label-nota3" id="input-nota3" className="dados-financeiro"/>
                        </div>
                        <div>
                            <label for="input-nota3" id="label-nota3"> Mês de início</label>
                            <br></br>
                            <select labelledby="label-turma" id="input-turma" className="dados-financeiro">
                                <option>02/2025</option>
                                <option>03/2025</option>
                                <option>04/2025</option>
                                <option>05/2025</option>
                                <option>06/2025</option>
                                <option>07/2025</option>
                                <option>08/2025</option>
                                <option>09/2025</option>
                            </select>
                        </div>
                    </div>
                    <div className="container-financeiro">
                        <div>
                            <label for="input-nota3" id="label-nota3"> Data de Cobrança</label>
                            <br></br>
                            <input type="number" labelledby="label-nota3" id="input-nota3" className="dados-financeiro"/>
                        </div>
                        <div>
                            <label for="input-nota3" id="label-nota3"> Desconto</label>
                            <br></br>
                            <input type="number" labelledby="label-nota3" id="input-nota3" className="dados-financeiro"/>
                        </div>
                        <div>
                            <label for="input-turno" id="label-turno"> Atividade Complementar</label>
                            <br></br>
                            <select labelledby="label-turno" id="input-turno" className="dados-financeiro">
                                <option>Transporte</option>
                                <option>Informática</option>
                                <option>Judô</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <div className="botoes-financeiro">
                <Botao title="Salvar" classname="botao-separado"/>
                <Botao title="Cancelar" classname="botao-separado"/>
            </div>
        </>
    )

}