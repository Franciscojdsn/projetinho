import Cabecalho from "../../componentes/Formulario/Cabecalho/Cabecalho";
import FormularioFinanceiro from "../../componentes/Formulario/FomularioFinanceiro/FormularioFinanceiro";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FinanceiroAluno() {

    const navigate = useNavigate()
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
            {aluno && (
                <>
                    <h1>Financeiro do Aluno: {aluno.nome}</h1>
                    <img
                        src={aluno.imagem} // Exibe a imagem do primeiro aluno
                        alt="Foto do Aluno"
                    />
                </>
            )}
            <FormularioFinanceiro />
        </>

    )

}