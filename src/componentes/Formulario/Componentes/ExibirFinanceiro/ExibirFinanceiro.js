import styles from './ExibirFinanceiro.module.css'

export default function ExibirFinanceiro({ valor_mensalidade, desconto, dia_vencimento, meses, total, atividade }) {

    
    return (

        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <label htmlFor={valor_mensalidade}>Valor da Mensalidade:</label><br></br>
                        <span name={valor_mensalidade} id={valor_mensalidade}>{valor_mensalidade}</span>
                    </div>
                    <div className={styles.div2}>
                        <label htmlFor={desconto}>Desconto:</label><br></br>
                        <span name={desconto} id={desconto}>{desconto}</span>
                    </div>
                    <div className={styles.div3}>
                        <label htmlFor={dia_vencimento}>Dia de vencimento:</label><br></br>
                        <span name={dia_vencimento} id={dia_vencimento}>{dia_vencimento}</span>
                    </div>
                    <div className={styles.div4}>
                        <label htmlFor={meses}>Mês de início:</label><br></br>
                        <span name={meses} id={meses}>{meses}</span>
                    </div>
                    <div className={styles.div5}>
                        <label htmlFor={total}>Total:</label><br></br>
                        <span name={total} id={total}>{total}</span>
                    </div>
                </div>
            </form>
            <div className={styles.container}>
                <label htmlFor={atividade}>Atividade Complementar:</label><br></br>
                <span name={atividade} id={atividade}>
                    {Array.isArray(atividade) && atividade.length > 0 ? (
                        atividade.map((renda, valor, index) => (
                            <ul>
                                <li key={index}>{renda.nome + '-' + "R$" + renda.valor}</li>
                            </ul>
                        ))
                    ) : (
                        <li>Nenhuma renda complementar cadastrada</li>
                    )}</span>
            </div>
        </>

    )

}