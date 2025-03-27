import styles from './PaginaAluno.module.css'
import InputExibir from '../../componentes/Formulario//Componentes/InputExibir/InputExibir';
import Input from "../../componentes/Formulario/Componentes/Input/Input";

function PaginaAluno() {

    return (
        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.div1}>
                        <InputExibir
                            type="text"
                            text="Nome do aluno"
                            name="nome"
                            placeholder="Nome completo"
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data"
                            placeholder="00/00/0000"
                        />
                    </div>
                    <div className={styles.div3}>
                        <Input
                            type="text"
                            text="Naturalidade:"
                            name="naturalidade"
                            placeholder="Loc"
                        />
                    </div>
                    <div className={styles.div4}>

                    </div>
                    <div className={styles.div5}>

                    </div>
                    <div className={styles.div6}>

                    </div>
                    <div className={styles.div7}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf"
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.div8}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco"
                            placeholder="Endereço"
                        />
                    </div>
                    <div className={styles.div9}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n"
                            placeholder="Nº"
                        />
                    </div>
                    <div className={styles.div10}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade"
                            placeholder="Cidade"
                        />
                    </div>
                    <div className={styles.div11}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro"
                            placeholder="Bairro"
                        />
                    </div>
                    <div className={styles.div12}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep"
                            placeholder="000.000-00"
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome da mãe"
                            name="nome_da_mae"
                            placeholder="Nome completo"
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_da_mae"
                            placeholder="00/00/0000"
                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_da_mae"
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_da_mae"
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_da_mae"
                            placeholder="Telefone 1"
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_da_mae"
                            placeholder="Telefone 2"
                        />
                    </div>
                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_da_mae"
                            placeholder="Endereço"

                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_da_mae"
                            placeholder="Nº"

                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_da_mae"
                            placeholder="Cidade"

                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_da_mae"
                            placeholder="Bairro"

                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_da_mae"
                            placeholder="000.000-00"

                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_da_mae"
                            placeholder="E-mail"
 
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome do pai"
                            name="nome_do_pai"
                            placeholder="Nome completo"

                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_do_pai"
                            placeholder="00/00/0000"

                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_do_pai"
                            placeholder="000.000.000-00"

                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_do_pai"
                            placeholder="000.000.000-00"

                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_do_pai"
                            placeholder="Telefone 1"
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_do_pai"
                            placeholder="Telefone 2"
                        />
                    </div>
                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_do_pai"
                            placeholder="Endereço"
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_do_pai"
                            placeholder="Nº"
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_do_pai"
                            placeholder="Cidade"
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_do_pai"
                            placeholder="Bairro"
                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_do_pai"
                            placeholder="000.000-00"
                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_do_pai"
                            placeholder="E-mail"
                        />
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.divmae1}>
                        <Input
                            type="text"
                            text="Nome do responsável financeiro"
                            name="resp_financeiro"
                            placeholder="Nome completo"
                        />
                    </div>
                    <div className={styles.div2}>
                        <Input
                            type="date"
                            text="Data de nasc."
                            name="data_financeiro"
                            placeholder="00/00/0000"
                        />
                    </div>
                    <div className={styles.divmae2}>
                        <Input
                            type="number"
                            text="CPF:"
                            name="cpf_financeiro"
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.divmae3}>
                        <Input
                            type="number"
                            text="RG:"
                            name="rg_financeiro"
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.divmae4}>
                        <Input
                            type="number"
                            text="Telefone 1"
                            name="telefone1_financeiro"
                            placeholder="Telefone 1"
                        />
                    </div>
                    <div className={styles.divmae5}>
                        <Input
                            type="number"
                            text="Telefone 2:"
                            name="telefone2_financeiro"
                            placeholder="Telefone 2"
                        />
                    </div>

                    <div className={styles.divmae6}>
                        <Input
                            type="text"
                            text="Endereço"
                            name="endereco_financeiro"
                            placeholder="Endereço"
                        />
                    </div>
                    <div className={styles.divmae7}>
                        <Input
                            type="number"
                            text="Nº"
                            name="n_financeiro"
                            placeholder="Nº"
                        />
                    </div>
                    <div className={styles.divmae8}>
                        <Input
                            type="text"
                            text="Cidade"
                            name="cidade_financeiro"
                            placeholder="Cidade"
                        />
                    </div>
                    <div className={styles.divmae9}>
                        <Input
                            type="text"
                            text="Bairro"
                            name="bairro_financeiro"
                            placeholder="Bairro"
                        />
                    </div>
                    <div className={styles.divmae10}>
                        <Input
                            type="number"
                            text="CEP"
                            name="cep_financeiro"
                            placeholder="000.000-00"
                        />
                    </div>
                    <div className={styles.divmae11}>
                        <Input
                            type="text"
                            text="E-mail"
                            name="email_financeiro"
                            placeholder="E-mail"
                        />
                    </div>
                </div>
            </form>
        </>
    )

}

export default PaginaAluno;