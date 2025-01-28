function InfoDasMaes() {

    return (
        <>
            <form>
                <div className="ContainerAluno">
                    <div className="ContainerAluno2">
                        <div>
                            <label>Nome da Mãe</label>
                            <br></br>
                            <input type="text" name="NomeDoAluno" placeholder="Aluno" className="NomeAluno" />
                        </div>
                        <div className="Item1">
                            <label>RG</label>
                            <br></br>
                            <input type="text" name="DataDeNascimento" placeholder="00/00/0000" className="Nascimento" />
                        </div>
                        <div>
                            <label>CPF</label>
                            <br></br>
                            <input type="text" name="DataDeMatricula" placeholder="00/00/0000" className="DataMatricula" />
                        </div>
                        <div>
                            <label>Contato</label>
                            <br></br>
                            <input type="text" name="SexoDoAluno" placeholder="M / F" className="Sexo" />
                        </div>
                        <div>
                            <label>Contato 2</label>
                            <br></br>
                            <input type="text" name="Localidade" placeholder="Localidade" className="Localidade" />
                        </div>
                        <div>
                            <label>E-mail</label>
                            <br></br>
                            <input type="text" name="CPFDoAluno" placeholder="123.456.789-00" className="CPFAluno" />
                        </div>
                        <div>
                            <label>Endereço</label>
                            <br></br>
                            <input type="text" name="ENdereçoDoAluno" placeholder="Endereço" className="Endereco" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )

}

export default InfoDasMaes;