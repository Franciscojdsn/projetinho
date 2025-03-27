import Perfil from "../../../assets/imagens/perfil.jpg"
import styles from './Cabecalho.module.css'
import Botao from "../../Botao"
import { GrNotes } from "react-icons/gr";
import { GoGraph } from "react-icons/go";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

export default function Cabecalho() {

    const location = useLocation();

    return (
        <>
            <div className={styles.containercabecalho}>
                <img src={Perfil} alt="FotoDoAluno" className="PerfilDoAluno" />

                

                {location.pathname === '/DadosDosAlunos/Financeiro' && <h3>Nome do Aluno</h3>}


                {location.pathname === '/DadosDosAlunos' ? <div className={styles.containerbotoes}>
                    <Link to="Historico">
                        <Botao
                            icone={<GrNotes />}
                            title="Histórico"
                            classname={styles.botao}
                        />
                    </Link>        
                    <Link to="Financeiro">
                        <Botao
                            icone={<GoGraph />}
                            title="Financeiro"
                            classname={styles.botao}
                        />
                    </Link>
                </div> : <div></div>}

                
            </div>
        </>
    )

}
