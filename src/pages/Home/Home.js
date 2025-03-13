import { useEffect, useState } from 'react';
import { CiCircleMore } from "react-icons/ci";

import InfoAlunos from '../../componentes/InfoAlunos/InfoAlunos';
import ListaAlunos from '../../componentes/ListaAlunos/ListaAlunos';
import TituloLista from '../../componentes/TituloLista/TituloLista';

const Home = () => {

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/alunos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setAlunos(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <InfoAlunos />
            <ul>
                <TituloLista />
                {alunos.map((aluno) => (
                    <ListaAlunos
                        matricula={aluno.id}
                        nome={aluno.nome}
                        responsavel={aluno.responsavel}
                        data={aluno.data}
                        turma={aluno.turma}
                        turno={aluno.turno}
                        icone={<CiCircleMore />}
                    />
                ))}
            </ul>

        </>
    )
}

export default Home;