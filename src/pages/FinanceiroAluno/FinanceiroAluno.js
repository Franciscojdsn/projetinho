import FormularioFinanceiro from "../../componentes/Formulario/FomularioFinanceiro/FormularioFinanceiro";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './FinanceiroAluno.module.css';

export default function FinanceiroAluno() {

    const { id } = useParams();
    const [aluno, setAluno] = useState(null);

    useEffect(() => {
        // Busca os dados do aluno pelo ID
        fetch(`http://localhost:5000/alunos/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAluno(data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>      
            <div className={styles.container}>
                {aluno && (
                    <>
                        <div className={styles.cabecalho}>
                            <div>
                                <h1>Aluno: {aluno.nome}</h1>
                                <h1>Responsável: {aluno.resp_financeiro}</h1>
                            </div>
                            <img
                                src={aluno.imagem} // Exibe a imagem do primeiro aluno
                                alt="Foto do Aluno"
                            />
                        </div>
                    </>
                )}
                <FormularioFinanceiro />
            </div>
        </>

    )

}