import { useEffect, useState } from 'react';
import { CiCircleMore } from "react-icons/ci";

import InfoAlunos from '../../componentes/InfoAlunos/InfoAlunos';
import ListaAlunos from '../../componentes/ListaAlunos/ListaAlunos';
import TituloLista from '../../componentes/TituloLista/TituloLista';
import Cabecalho from '../../componentes/Formulario/Cabecalho/Cabecalho';

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
                setAlunos(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Cabecalho />
            <InfoAlunos />
            <ul>
                <TituloLista />
                {alunos.length > 0 &&
                    alunos.map((aluno) => {
                        const dataFormatada = aluno.data
                            ? (() => {
                                const data = new Date(aluno.data);
                                const dia = String(data.getDate()).padStart(2, '0');
                                const mes = String(data.getMonth() + 1).padStart(2, '0');
                                const ano = data.getFullYear();
                                return `${dia}/${mes}/${ano}`;
                            })()
                            : '';

                        return (
                            <ListaAlunos
                                id={aluno.id}
                                nome={aluno.nome}
                                responsavel={''}
                                data={dataFormatada}
                                turma={aluno.turma ? aluno.turma.nome : ''}
                                turno={aluno.turno ? aluno.turno.nome : ''}
                                icone={<CiCircleMore />}
                            />
                        );
                    })}


            </ul>

        </>
    )
}

export default Home;