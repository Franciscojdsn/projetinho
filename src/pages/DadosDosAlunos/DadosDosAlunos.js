import styles from "./DadosDosAlunos.module.css"
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'

import InfoDosAlunos from "../../componentes/Formulario/InfoDosAlunos/InfoDosAlunos";
import Imagem from "../../componentes/Formulario/Cabecalho/Cabecalho";


const DadosDosAlunos = () => {

    const navigate = useNavigate()

    function addAluno(dados) {

        dados.id = uuid

        fetch('http://localhost:5000/alunos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate('/DadosDosAlunos/Financeiro', {state: {message: 'Projeto criado com sucesso!'} })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={styles.containerdados}>
                    <Imagem />
                    <InfoDosAlunos
                        handleSubmit={addAluno}
                    />
            </div>
        </>
    )
}

export default DadosDosAlunos;