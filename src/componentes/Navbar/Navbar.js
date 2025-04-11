import { Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { useNavbar } from "../../context/NavbarContext";


import styles from "./Navbar.module.css"
import Perfil from "../../assets/imagens/perfil.jpg"
import Botao from "../Botao/index";

function Navbar() {
    const { isNavbarDisabled } = useNavbar();

    return (
        <div className={styles.container}>
            <div className={styles.children}>
                <Link to="/"
                    className={isNavbarDisabled ? styles.disabled : ""}
                    tabIndex={isNavbarDisabled ? -1 : 0}
                ><img src={Perfil} alt="Perfil" /></Link>
                <h1>Nome da Escola</h1>
                <ul>
                    <Link to="Financeiro"
                        className={isNavbarDisabled ? styles.disabled : ""}
                        tabIndex={isNavbarDisabled ? -1 : 0}
                    >
                        <Botao
                            title="Financeiro"

                            classname={styles.botao}
                            icone={<GoGraph />}
                        />
                    </Link>
                    <Link to="Turmas"
                        className={isNavbarDisabled ? styles.disabled : ""}
                        tabIndex={isNavbarDisabled ? -1 : 0}
                    >
                        <Botao
                            title="Turmas"
                            classname={styles.botao}
                            icone={<SiGoogleclassroom />}
                        />
                    </Link>
                    <Link to="Funcionarios"
                        className={isNavbarDisabled ? styles.disabled : ""}
                        tabIndex={isNavbarDisabled ? -1 : 0}
                    >
                        <Botao
                            title="Funcionários"
                            classname={styles.botao}
                            icone={<FaPeopleGroup />}
                        />
                    </Link>
                </ul>
            </div>
        </div>
    )

}

export default Navbar;
