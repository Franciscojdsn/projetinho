import styles from './InfoDosPais.module.css'
import Input from '../Componentes/Input/Input';
import { useState } from 'react';
import { GrDocumentTransfer } from "react-icons"

function InfoDosPais({ handleSubmit, dadosData }) {

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
                            text="Nome do pai"
                            name="nome_do_pai"
                            placeholder="Nome completo"
                            handleOnChange={handleChange}
                            value={dados.nome_do_pai ? dados.nome_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cpf_do_pai ? dados.cpf_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_do_pai"
                            placeholder="000.000.000-00"
                            handleOnChange={handleChange}
                            value={dados.rg_do_pai ? dados.rg_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_do_pai"
                            placeholder="Telefone 1"
                            handleOnChange={handleChange}
                            value={dados.telefone1_do_pai ? dados.telefone1_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_do_pai"
                            placeholder="Telefone 2"
                            handleOnChange={handleChange}
                            value={dados.telefone2_do_pai ? dados.telefone2_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_do_pai"
                            placeholder="Endereço"
                            handleOnChange={handleChange}
                            value={dados.endereco_do_pai ? dados.endereco_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_do_pai"
                            placeholder="Nº"
                            handleOnChange={handleChange}
                            value={dados.n_do_pai ? dados.n_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_do_pai"
                            placeholder="Cidade"
                            handleOnChange={handleChange}
                            value={dados.cidade_do_pai ? dados.cidade_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_do_pai"
                            placeholder="Bairro"
                            handleOnChange={handleChange}
                            value={dados.bairro_do_pai ? dados.bairro_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_do_pai"
                            placeholder="000.000-00"
                            handleOnChange={handleChange}
                            value={dados.cep_do_pai ? dados.cep_do_pai : ''}
                        />
                    </div>
                    <div className={styles.div11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_do_pai"
                            placeholder="E-mail"
                            handleOnChange={handleChange}
                            value={dados.email_do_pai ? dados.email_do_pai : ''}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default InfoDosPais;