import React from "react";
import styles from "./DadosDosAlunos.module.css"
import { TfiSave } from "react-icons/tfi";
import { TbTrashX } from "react-icons/tb";

import InfoDosAlunos from "../../componentes/Formulario/InfoDosAlunos/InfoDosAlunos";
import Botao from "../../componentes/Botao";
import Imagem from "../../componentes/Formulario/Cabecalho/Cabecalho";
import InfoDasMaes from "../../componentes/Formulario/InfoDasMaes/InfoDasMaes";
import InfoDosPais from "../../componentes/Formulario/InfoDosPais/InfoDosPais";

const DadosDosAlunos = () => {
    return (
        <>
            <div className={styles.containerdados}>
                <Imagem />
                <InfoDosAlunos />
                <InfoDasMaes />
                <InfoDosPais />
                <div className={styles.containerbotao}>
                    <Botao
                        title="Salvar"
                        icone={<TfiSave />}
                        classname={styles.botao}>
                    </Botao>
                    <Botao
                        title="Limpar"
                        icone={<TbTrashX />}
                        classname={styles.botao2}>
                    </Botao>
                </div>
            </div>
        </>
    )
}

export default DadosDosAlunos;