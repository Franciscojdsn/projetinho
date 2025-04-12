import React from "react";
import Input from "../Componentes/Input/Input";
import Botao from "../../Botao/index";
import styles from "./EditarPopup.module.css";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EditarPopup({ atividade, setIsEditing }) {

    const [dados, setDados] = useState({
        ...atividade,
        valor_atividade: formatarParaReais(atividade.valor_atividade),
    });

    const navigate = useNavigate()

    function formatarParaReais(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor || 0); // Garante que valores nulos ou indefinidos sejam tratados como 0
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setDados((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleChangeReais(e) {
        const { name, value } = e.target;

        // Remove caracteres não numéricos
        const numericValue = value.replace(/\D/g, '');

        // Formata o valor como reais
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numericValue / 100);

        setDados({ ...dados, [name]: formattedValue });
        console.log({ ...dados, [name]: formattedValue });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!dados.valor_atividade || dados.valor_atividade.trim() === '') {
            alert('O campo "Valor da Mensalidade" é obrigatório.');
            return; // Impede o envio do formulário
        }

        // Prepara os dados para envio
        const dadosAtualizados = {
            ...dados,
            valor_atividade: parseFloat(dados.valor_atividade.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
        };

        console.log("Dados enviados:", dadosAtualizados);

        // Chama a função de salvar
        onSave(dadosAtualizados);
    }


    function onSave(dadosAtualizados) {
        console.log("Endpoint:", `http://localhost:5000/renda_complementar/${dadosAtualizados.id}`);
        console.log("Dados enviados:", dadosAtualizados);

        fetch(`http://localhost:5000/renda_complementar/${dadosAtualizados.id}`, {
            method: 'PATCH', // Ou 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then((resp) => {
                console.log("Resposta do servidor:", resp);
                if (resp.ok) {
                    window.location.reload(); 
                    alert('Atividade atualizada com sucesso!');
                    setIsEditing(false);
                    navigate(`/Financeiro`, { state: { message: 'Atividade editada com sucesso!' } });
                } else {
                    alert('Erro ao atualizar os dados financeiros.');
                }
            })
            .catch((err) => console.log('Erro ao salvar os dados financeiros:', err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.popup}>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Nome da Atividade:"
                            name="nome_atividade"
                            placeholder="Nome da Atividade"
                            handleOnChange={handleChange}
                            value={dados.nome_atividade ? dados.nome_atividade : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="text"
                            text="Valor da Atividade:"
                            name="valor_atividade"
                            placeholder="R$ 0,00"
                            handleOnChange={handleChangeReais}
                            value={dados.valor_atividade ? dados.valor_atividade : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Botao
                            icone={<MdFormatListBulletedAdd />}
                            title="Salvar"
                            classname={styles.botao3}
                        />
                        <Botao
                            icone={<MdFormatListBulletedAdd />}
                            title="Cancelar"
                            classname={styles.botao4}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};