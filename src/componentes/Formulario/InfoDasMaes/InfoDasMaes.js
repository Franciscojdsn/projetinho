import styles from './InfoDasMaes.module.css'
import Input from '../Componentes/Input/Input';
import { useState } from 'react';
import { GrDocumentTransfer } from "react-icons/gr";
import Botao from '../../Botao';

function InfoDasMaes({ handleSubmit, dadosData }) {

    const [dados, setDados] = useState(dadosData || {})

    const submit = (e) => {
        e.preventDefault()
        //console.log(dados)
        handleSubmit(dados)
    } 

    function handleChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
        console.log(dados)
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <Input
                            type="text"
                            text="Nome da mãe"
                            name="nome_da_mae"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome_da_mae ? dados.nome_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_da_mae"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cpf_da_mae ? dados.cpf_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_da_mae"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.rg_da_mae ? dados.rg_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_da_mae"
                            placeholder="Telefone 1"
                            handleOnChange={handleChange}
                            value={dados.telefone1_da_mae ? dados.telefone1_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_da_mae"
                            placeholder="Telefone 2"
                            handleOnChange={handleChange}
                            value={dados.telefone2_da_mae ? dados.telefone2_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_da_mae"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco_da_mae ? dados.endereco_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_da_mae"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n_da_mae ? dados.n_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_da_mae"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade_da_mae ? dados.cidade_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_da_mae"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro_da_mae ? dados.bairro_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_da_mae"
                            placeholder="000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cep_da_mae ? dados.cep_da_mae : ''}
                        />
                    </div>
                    <div className={styles.div11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_da_mae"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_da_mae ? dados.email_da_mae : ''}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default InfoDasMaes;