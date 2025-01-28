import React from "react";
import InfoDosAlunos from "./componentes/Formulario/InfoDosAlunos";
import InfoDosPais from "./componentes/Formulario/InfoDosPais";
import InfoDasMaes from "./componentes/Formulario/InfoDasMaes";
import Botao from "./componentes/Botao";
import Imagem from "./componentes/Formulario/Imagem";

const DadosDosAlunos = () => {
    return (
        <>
            <div className="containerdados">
                <Imagem />
                <InfoDosAlunos />
                <InfoDosPais />
                <InfoDasMaes />
                <Botao title="Salvar" classname="botao-separado"/>
                <Botao title="Editar" classname="botao-separado"/>
                <Botao title="Limpar" classname="botao-separado"/>
            </div>
        </>
    )
}

export default DadosDosAlunos;