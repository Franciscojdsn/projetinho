import Perfil from "../../assets/imagens/perfil.jpg"
import Cabecalho from "./Cabecalho"

export default function Imagem() {

    return (
        <>
            <div className="containercabecalho">
                <img src={Perfil} alt="FotoDoAluno" className="PerfilDoAluno" />
                <Cabecalho />
            </div>
        </>
    )

}
