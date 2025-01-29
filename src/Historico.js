import Botao from "./componentes/Botao";
import InfoDosAlunos from "./componentes/Formulario/InfoDosAlunos";
import Perfil from "./assets/imagens/perfil.jpg"
import Notas from "./componentes/Formulario/Notas";

export default function Historico() {

    return (
        <>
            <div className="cabecalho-historico">
                <h1>Histórico</h1>
                <div className="botoes-historico">
                    <Botao title="Imprimir" classname="botao-separado" />
                    <Botao title="Editar" classname="botao-separado" />
                    <Botao title="Novo" classname="botao-separado" />
                </div>
            </div>


            <div className="cabecalho1">
                <img src={Perfil} alt="perfil" />
                <InfoDosAlunos />
            </div>
            <div className="container-nota">
                <h2>2025</h2>
                <Notas />
            </div>

        </>
    )

}