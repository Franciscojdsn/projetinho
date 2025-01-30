export default function InfoFuncionarios() {

    return (
        <>
            <div className="ContainerAluno2">
                <div>
                    <label>Nome do Funcionario</label>
                    <input type="text" name="NomeDoAluno" placeholder="Aluno" className="NomeAluno" />
                </div>
                <div className="Item1">
                    <label>Data de nascimento</label>
                    <input type="text" name="DataDeNascimento" placeholder="00/00/0000" className="Nascimento" />
                </div>
                <div>
                    <label>Função</label>
                    <br></br>
                    <input type="text" name="DataDeMatricula" placeholder="00/00/0000" className="DataMatricula" />
                </div>
                <div>
                    <label>Sexo</label>
                    <br></br>
                    <input type="text" name="SexoDoAluno" placeholder="M / F" className="Sexo" />
                </div>
                <div>
                    <label>Localidade</label>
                    <br></br>
                    <input type="text" name="Localidade" placeholder="Localidade" className="Localidade" />
                </div>
                <div>
                    <label>CPF</label>
                    <br></br>
                    <input type="text" name="CPFDoAluno" placeholder="123.456.789-00" className="CPFAluno" />
                </div>
                <div>
                    <label>RG</label>
                    <br></br>
                    <input type="text" name="CPFDoAluno" placeholder="123.456.789-00" className="CPFAluno" />
                </div>
                <div>
                    <label>Endereço do Aluno</label>
                    <br></br>
                    <input type="text" name="ENdereçoDoAluno" placeholder="Endereço" className="Endereco" />
                </div>
            </div>
        </>
    )

}