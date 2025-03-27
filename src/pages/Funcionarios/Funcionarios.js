import React, { useState, useEffect } from "react";
import InfoFuncionarios from "../../componentes/InfoFuncionarios/InfoFuncionarios";
import ListaFuncionarios from "../../componentes/ListaFuncionarios/ListaFuncionarios";

const Funcionarios = () => {

    const [funcionarios, setFuncionarios] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/funcionarios', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setFuncionarios(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <InfoFuncionarios />
            {funcionarios?.map((funcionario) => (
                <ListaFuncionarios 
                    id={funcionario.id}
                    funcionario={funcionario.funcionario}
                    funcao={funcionario.funcao}
                    config=""
                />
            ))}
        </>
    )
}

export default Funcionarios;