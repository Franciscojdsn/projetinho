import React from "react";
import Perfil from "../../assets/imagens/perfil.jpg"


function Cabecalho() {
    return (
    <header>
        <div className="header-titulo">
            <img src={Perfil} alt="perfil"></img>
            <h1>Nome da Escola</h1>
        </div>
    </header>
    )
}

export default Cabecalho; 