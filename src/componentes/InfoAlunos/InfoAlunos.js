import { Link } from "react-router-dom";
import { BsPersonAdd } from "react-icons/bs";
import { useState, useEffect } from "react";

import Botao from "../Botao";
import styles from "./InfoAlunos.module.css"
import ContainerDados from "../ContainerDados/ContainerDados";



function InfoAlunos() {
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [alunosPendentes, setAlunosPendentes] = useState(0);

    useEffect(() => {
        // Busca todos os alunos
        fetch('http://localhost:5000/alunos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((alunosData) => {
                setTotalAlunos(alunosData.length);
                // Busca todos os dados financeiros
                fetch('http://localhost:5000/financeiro', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((resp) => resp.json())
                    .then((financeiroData) => {
                        // Data atual
                        const hoje = new Date();
                        // Conta alunos com ao menos um boleto vencido
                        const alunosComBoletoVencido = financeiroData.filter(fin => {
                            if (!fin.boletos || !Array.isArray(fin.boletos)) return false;
                            return fin.boletos.some(boleto => {
                                if (!boleto.data_vencimento) return false;
                                const [dia, mes, ano] = boleto.data_vencimento.split('/');
                                const dataVencimento = new Date(`${ano}-${mes}-${dia}`);
                                return dataVencimento < hoje;
                            });
                        });
                        setAlunosPendentes(alunosComBoletoVencido.length);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.containerinfoalunos}>
            <div>
                <Link to="DadosDosAlunos">
                    <Botao
                        title="Mátricula"
                        icone={<BsPersonAdd />}
                        classname={styles.botao}>
                    </Botao>
                </Link>
            </div>
            <ContainerDados
                title1="Total Alunos"
                title2="Pendentes"
                valor1={totalAlunos}
                valor2={alunosPendentes}
            />
        </div>
    )

}

export default InfoAlunos;