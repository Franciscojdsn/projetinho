import { useState } from "react";

function Condicional () {

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()

    function enviarEmail(e) {
        e.preventDefault()
        setUserEmail(email)
        console.log(userEmail)
    }

    function limparEmail(e) {
        setUserEmail('')
    }

    return (
        <div>
            <form>
                <input 
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            <button 
                type="submit"
                onClick={enviarEmail}>Enviar Email
                
            </button>
            <button 
                type="submit"
                onClick={limparEmail}>limpar Email
                
            </button>
            {userEmail && (
                <div>
                    <p>O email do usuario é: {userEmail}</p>
                </div>
            ) }
            </form>
        </div>
    )

}

export default Condicional;