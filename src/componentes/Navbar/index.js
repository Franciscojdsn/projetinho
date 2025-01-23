import Perfil from "../../assets/imagens/perfil.jpg"
import Botao from "../Botao/index";
import { Link } from "react-router-dom";

function Navbar() {

    return (
        <div className="container">
                <Link to="/"><img src={Perfil} alt="Perfil" /></Link>
            <div className="espaço">
                    <h1>Nome da Escola</h1>
                <ul className="botao-navbar">
                    <Link to="Financeiro">
                        <Botao title="Financeiro" classname="botao-separado"  />
                    </Link>
                    <Link to="Turmas">
                        <Botao title="Turmas" classname="botao-separado" />
                    </Link>
                    <Link to="Funcionarios">
                        <Botao title="Funcionários" classname="botao-separado" />
                    </Link>
                </ul>
            </div>
        </div>
    )

}

export default Navbar;
