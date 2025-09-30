import styles from './InputExibirFuncionario.module.css'

export default function InputExibirFuncionario({ nome_funcionario, data_nasc, naturalidade, genero, turma, turno, cpf_aluno, endereco_aluno, n_aluno, cidade_aluno, bairro_aluno, cep_aluno,
    nome_mae, rg_mae, data_mae, cpf_mae, endereco_mae, n_mae, cidade_mae, bairro_mae, cep_mae, telefone1_mae, telefone2_mae, email_mae,
    nome_pai, rg_pai, data_pai, cpf_pai, endereco_pai, n_pai, cidade_pai, bairro_pai, cep_pai, telefone1_pai, telefone2_pai, email_pai,
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
                        <label htmlFor={data_nasc}>Data nasc.:</label><br></br>
                        <span name={data_nasc} id={data_nasc}>{data_nasc}</span>
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
                        <label htmlFor={turma}>Turma:</label><br></br>
                        <span name={turma} id={turma}>{turma}</span>
                    </div>
                    <div className={styles.div6}>
                        <label htmlFor={turno}>Turno:</label><br></br>
                        <span name={turno} id={turno}>{turno}</span>
                    </div>
                    <div className={styles.div7}>
                        <label htmlFor={cpf_aluno}>CPF:</label><br></br>
                        <span name={cpf_aluno} id={cpf_aluno}>{cpf_aluno}</span>
                    </div>
                    <div className={styles.div8}>
                        <label htmlFor={endereco_aluno}>Endereço:</label><br></br>
                        <span name={endereco_aluno} id={endereco_aluno}>{endereco_aluno}</span>
                    </div>
                    <div className={styles.div9}>
                        <label htmlFor={n_aluno}>Nº:</label><br></br>
                        <span name={n_aluno} id={n_aluno}>{n_aluno}</span>
                    </div>
                    <div className={styles.div10}>
                        <label htmlFor={cidade_aluno}>Cidade:</label><br></br>
                        <span name={cidade_aluno} id={cidade_aluno}>{cidade_aluno}</span>
                    </div>
                    <div className={styles.div11}>
                        <label htmlFor={bairro_aluno}>Bairro:</label><br></br>
                        <span name={bairro_aluno} id={bairro_aluno}>{bairro_aluno}</span>
                    </div>
                    <div className={styles.div12}>
                        <label htmlFor={cep_aluno}>Cep:</label><br></br>
                        <span name={cep_aluno} id={cep_aluno}>{cep_aluno}</span>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <label htmlFor={nome_mae}>Nome da mãe:</label><br></br>
                        <span name={nome_mae} id={nome_mae}>{nome_mae}</span>
                    </div>
                    <div className={styles.divmae2}>
                        <label htmlFor={data_mae}>Data nasc.:</label><br></br>
                        <span name={data_mae} id={data_mae}>{data_mae}</span>
                    </div>
                    <div className={styles.divmae3}>
                        <label htmlFor={cpf_mae}>CPF:</label><br></br>
                        <span name={cpf_mae} id={cpf_mae}>{cpf_mae}</span>
                    </div>
                    <div className={styles.divmae4}>
                        <label htmlFor={rg_mae}>Rg:</label><br></br>
                        <span name={rg_mae} id={rg_mae}>{rg_mae}</span>
                    </div>
                    <div className={styles.divmae5}>
                        <label htmlFor={telefone1_mae}>Telefone 1:</label><br></br>
                        <span name={telefone1_mae} id={telefone1_mae}>{telefone1_mae}</span>
                    </div>
                    <div className={styles.divmae6}>
                        <label htmlFor={telefone2_mae}>Telefone 2:</label><br></br>
                        <span name={telefone2_mae} id={telefone2_mae}>{telefone2_mae}</span>
                    </div>
                    <div className={styles.divmae7}>
                        <label htmlFor={endereco_mae}>Endereço:</label><br></br>
                        <span name={endereco_mae} id={endereco_mae}>{endereco_mae}</span>
                    </div>
                    <div className={styles.divmae8}>
                        <label htmlFor={n_mae}>Nº:</label><br></br>
                        <span name={n_mae} id={n_mae}>{n_mae}</span>
                    </div>
                    <div className={styles.divmae9}>
                        <label htmlFor={cidade_mae}>Cidade:</label><br></br>
                        <span name={cidade_mae} id={cidade_mae}>{cidade_mae}</span>
                    </div>
                    <div className={styles.divmae10}>
                        <label htmlFor={bairro_mae}>Bairro:</label><br></br>
                        <span name={bairro_mae} id={bairro_mae}>{bairro_mae}</span>
                    </div>
                    <div className={styles.divmae11}>
                        <label htmlFor={cep_mae}>CEP:</label><br></br>
                        <span name={cep_mae} id={cep_mae}>{cep_mae}</span>
                    </div>
                    <div className={styles.divmae12}>
                        <label htmlFor={email_mae}>Email:</label><br></br>
                        <span name={email_mae} id={email_mae}>{email_mae}</span>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <label htmlFor={nome_pai}>Nome do pai:</label><br></br>
                        <span name={nome_pai} id={nome_pai}>{nome_pai}</span>
                    </div>
                    <div className={styles.divmae2}>
                        <label htmlFor={data_pai}>Data nasc.:</label><br></br>
                        <span name={data_pai} id={data_pai}>{data_pai}</span>
                    </div>
                    <div className={styles.divmae3}>
                        <label htmlFor={cpf_pai}>CPF:</label><br></br>
                        <span name={cpf_pai} id={cpf_pai}>{cpf_pai}</span>
                    </div>
                    <div className={styles.divmae4}>
                        <label htmlFor={rg_pai}>Rg:</label><br></br>
                        <span name={rg_pai} id={rg_pai}>{rg_pai}</span>
                    </div>
                    <div className={styles.divmae5}>
                        <label htmlFor={telefone1_pai}>Telefone 1:</label><br></br>
                        <span name={telefone1_pai} id={telefone1_pai}>{telefone1_pai}</span>
                    </div>
                    <div className={styles.divmae6}>
                        <label htmlFor={telefone2_pai}>Telefone 2:</label><br></br>
                        <span name={telefone2_pai} id={telefone2_pai}>{telefone2_pai}</span>
                    </div>
                    <div className={styles.divmae7}>
                        <label htmlFor={endereco_pai}>Endereço:</label><br></br>
                        <span name={endereco_pai} id={endereco_pai}>{endereco_pai}</span>
                    </div>
                    <div className={styles.divmae8}>
                        <label htmlFor={n_pai}>Nº:</label><br></br>
                        <span name={n_pai} id={n_pai}>{n_pai}</span>
                    </div>
                    <div className={styles.divmae9}>
                        <label htmlFor={cidade_pai}>Cidade:</label><br></br>
                        <span name={cidade_pai} id={cidade_pai}>{cidade_pai}</span>
                    </div>
                    <div className={styles.divmae10}>
                        <label htmlFor={bairro_pai}>Bairro:</label><br></br>
                        <span name={bairro_pai} id={bairro_pai}>{bairro_pai}</span>
                    </div>
                    <div className={styles.divmae11}>
                        <label htmlFor={cep_pai}>CEP:</label><br></br>
                        <span name={cep_pai} id={cep_pai}>{cep_pai}</span>
                    </div>
                    <div className={styles.divmae12}>
                        <label htmlFor={email_pai}>Email:</label><br></br>
                        <span name={email_pai} id={email_pai}>{email_pai}</span>
                    </div>
                </div>
            </form>
        </>

    )

}