import styles from './InputExibirFuncionario.module.css'

export default function InputExibirFuncionario({ nome_funcionario, data_funcionario, naturalidade, genero, cpf_funcionario, endereco_funcionario, n_funcionario, cidade_funcionario, bairro_funcionario, cep_funcionario,
    rg_funcionario, email_funcionario, telefone1_funcionario, telefone2_funcionario, funcao,data_da_entrada_funcionario, pix_funcionario, agencia_funcionario, n_conta_funcionario, salario, digito_funcionario, banco_funcionario
    
}) {


    return (

        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <label htmlFor={nome_funcionario}>Nome do Funcionário:</label><br></br>
                        <span name={nome_funcionario} id={nome_funcionario}>{nome_funcionario}</span>
                    </div>
                    <div className={styles.div2}>
                        <label htmlFor={data_funcionario}>Data nasc.:</label><br></br>
                        <span name={data_funcionario} id={data_funcionario}>{data_funcionario}</span>
                    </div>
                    <div className={styles.div3}>
                        <label htmlFor={naturalidade}>Naturalidade:</label><br></br>
                        <span name={naturalidade} id={naturalidade}>{naturalidade}</span>
                    </div>
                    <div className={styles.div4}>
                        <label htmlFor={genero}>Gênero:</label><br></br>
                        <span name={genero} id={genero}>{genero}</span>
                    </div>
                    <div className={styles.div5}>
                        <label htmlFor={cpf_funcionario}>CPF:</label><br></br>
                        <span name={cpf_funcionario} id={cpf_funcionario}>{cpf_funcionario}</span>
                    </div>
                    <div className={styles.div6}>
                        <label htmlFor={endereco_funcionario}>Endereço:</label><br></br>
                        <span name={endereco_funcionario} id={endereco_funcionario}>{endereco_funcionario}</span>
                    </div>
                    <div className={styles.div7}>
                        <label htmlFor={n_funcionario}>Nº:</label><br></br>
                        <span name={n_funcionario} id={n_funcionario}>{n_funcionario}</span>
                    </div>
                    <div className={styles.div8}>
                        <label htmlFor={funcao}>Funçãoº:</label><br></br>
                        <span name={funcao} id={funcao}>{funcao}</span>
                    </div>
                    <div className={styles.div9}>
                        <label htmlFor={data_da_entrada_funcionario}>Data de entrada:</label><br></br>
                        <span name={data_da_entrada_funcionario} id={data_da_entrada_funcionario}>{data_da_entrada_funcionario}</span>
                    </div>
                    <div className={styles.div10}>
                        <label htmlFor={cidade_funcionario}>Cidade:</label><br></br>
                        <span name={cidade_funcionario} id={cidade_funcionario}>{cidade_funcionario}</span>
                    </div>
                    <div className={styles.div11}>
                        <label htmlFor={bairro_funcionario}>Bairro:</label><br></br>
                        <span name={bairro_funcionario} id={bairro_funcionario}>{bairro_funcionario}</span>
                    </div>
                    <div className={styles.div12}>
                        <label htmlFor={rg_funcionario}>RG:</label><br></br>
                        <span name={rg_funcionario} id={rg_funcionario}>{rg_funcionario}</span>
                    </div>
                    <div className={styles.div13}>
                        <label htmlFor={email_funcionario}>email:</label><br></br>
                        <span name={email_funcionario} id={email_funcionario}>{email_funcionario}</span>
                    </div>
                    <div className={styles.div14}>
                        <label htmlFor={telefone1_funcionario}>Telefone 1:</label><br></br>
                        <span name={telefone1_funcionario} id={telefone1_funcionario}>{telefone1_funcionario}</span>
                    </div>
                    <div className={styles.div15}>
                        <label htmlFor={telefone2_funcionario}>Telefone 2:</label><br></br>
                        <span name={telefone2_funcionario} id={telefone2_funcionario}>{telefone2_funcionario}</span>
                    </div>
                    <div className={styles.div16}>
                        <label htmlFor={pix_funcionario}>Pix:</label><br></br>
                        <span name={pix_funcionario} id={pix_funcionario}>{pix_funcionario}</span>
                    </div>
                    <div className={styles.div17}>
                        <label htmlFor={agencia_funcionario}>Agência:</label><br></br>
                        <span name={agencia_funcionario} id={agencia_funcionario}>{agencia_funcionario}</span>
                    </div>
                    <div className={styles.div18}>
                        <label htmlFor={n_conta_funcionario}>Nº Conta:</label><br></br>
                        <span name={n_conta_funcionario} id={n_conta_funcionario}>{n_conta_funcionario}</span>
                    </div>
                    <div className={styles.div19}>
                        <label htmlFor={digito_funcionario}>Dígito:</label><br></br>
                        <span name={digito_funcionario} id={digito_funcionario}>{digito_funcionario}</span>
                    </div>
                    <div className={styles.div20}>
                        <label htmlFor={banco_funcionario}>Banco:</label><br></br>
                        <span name={banco_funcionario} id={banco_funcionario}>{banco_funcionario}</span>
                    </div>
                    <div className={styles.div21}>
                        <label htmlFor={salario}>Salário:</label><br></br>
                        <span name={salario} id={salario}>{salario}</span>
                    </div>
                    <div className={styles.div22}>
                        <label htmlFor={n_conta_funcionario}>Nº Conta:</label><br></br>
                        <span name={n_conta_funcionario} id={n_conta_funcionario}>{n_conta_funcionario}</span>
                    </div>
                    <div className={styles.div23}>
                        <label htmlFor={n_conta_funcionario}>Nº Conta:</label><br></br>
                        <span name={n_conta_funcionario} id={n_conta_funcionario}>{n_conta_funcionario}</span>
                    </div>
                    <div className={styles.div24}>

                    </div>
                </div>
            </form>
        </>

    )

}