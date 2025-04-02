import styles from './Cabecalho.module.css'
import Botao from "../../Botao"
import { GrNotes } from "react-icons/gr";
import { GoGraph } from "react-icons/go";
import { Link, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Cabecalho({ }) {

    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        // Busca os dados do servidor (db.json)
        fetch('http://localhost:5000/alunos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Dados recebidos do servidor:", data);
                setAlunos(data);// Define o aluno atual
            })
            .catch((err) => console.log("Erro ao buscar os dados:", err));
    }, [id, navigate]);

    return (
        <>
            <div className={styles.containercabecalho}>

                {location.pathname === '/PaginaAluno/:id' ? <div className={styles.containerbotoes}>

                    {alunos && alunos.map((aluno) => {
                        if (aluno.id === id) {
                            return (

                                <h3 key={aluno.id}>{aluno.nome}</h3>
                            )
                        }
                    })}
                </div> : <div></div>}

                {location.pathname === '/PaginaAluno/:id' ? <div className={styles.containerbotoes}>

                    {/* Exibe a imagem do aluno */}
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
