import { useState } from "react";

function Form () {

    function cadastrarUsuario (e) {
        e.preventDefault()
        console.log(`Cadastrou o usuario ${aluno} com a senha: ${senha}`)
    }

    const [aluno, setAluno] = useState()
    const [senha, setSenha] = useState()

    return (
        <div>
            <h1>Meu cadastro:</h1>
            <form onSubmit={cadastrarUsuario}>
                <div>
                    <label htmlFor="aluno"></label>
                    <input 
                        onChange={(e) => setAluno(e.target.value)} 
                        type="text" 
                        name="aluno" 
                        id="aluno" 
                        placeholder="Digiteseu nome"
                        ></input>
                </div>
                <div>
                    <label htmlFor="senha"></label>
                    <input 
                        onChange={(e) => setSenha(e.target.value)} 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        placeholder="Digite sua senha"
                        ></input>
                </div>
                <div>
                    <input type="submit" value="Cadastrar"></input>
                </div>
            </form>
        </div>
    )
}

export default Form;