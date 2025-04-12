import React from "react";
import Input from "../Componentes/Input/Input";
import Botao from "../../../componentes/Botao/index";
import styles from "./Popup.module.css";
import { MdFormatListBulletedAdd } from "react-icons/md";

export default function Popup ({ showPopup, dados, handleInputChange, handleChangeReais, submit, fechar }) {
    if (!showPopup) return null; // Não renderiza nada se o popup não estiver visível

    

    return (
        <div className={styles.popup}>
            <div className={styles.container}>
                <div className={styles.div1}>
                    <Input
                        type="text"
                        text="Nome da Atividade:"
                        name="nome_atividade"
                        placeholder="Nome da Atividade"
                        handleOnChange={handleInputChange}
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
                        onclick={submit}
                    />
                    <Botao
                        icone={<MdFormatListBulletedAdd />}
                        title="Cancelar"
                        classname={styles.botao4}
                        onclick={fechar}
                    />
                </div>
            </div>
        </div>
    );
};