import React from "react";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";

import ListaTurmas from "../../componentes/ListaTurmas/ListaTurmas";
import InfoTurmas from "../../componentes/InfoTurmas/InfoTurmas";

const Turmas = () => {

    const [turmas, setTurmas] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/turmas', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setTurmas(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <ul>
                <InfoTurmas />
                {turmas.map((turma) => (
                    <ListaTurmas
                        idturma={turma.id}
                        professor={turma.professor}
                        turma={turma.turma}
                        turno={turma.turno}
                        qtdalunos={turma.qtdalunos}
                        config={<CiCircleMore />}
                    />
                ))}

            </ul>
        </>

    )
}

export default Turmas;