import styles from './InfoDasMaes.module.css'
import { GrDocumentTransfer } from "react-icons/gr";

function InfoDasMaes() {

    return (
        <>
            <div className={styles.container}>
                <div>
                    <label>Nome da mãe:</label>
                    <br></br>
                    <input type="text" name="mae" placeholder="Nome Completo" />
                </div>
                <div>
                    <label for="cpf">CPF:</label>
                    <br></br>
                    <input type="text" id='cpf' name="cpf" placeholder="CPF" />
                </div>
                <div className="Item1">
                    <label for="rg">RG:</label>
                    <br></br>
                    <input type="text" id="rg" name="rg" placeholder="RG" />
                </div>
                <div>
                    <label for="contato">Contato:</label>
                    <br></br>
                    <input type="number" id="contato" name="contato" placeholder="Contato 1" />
                </div>
                <div>
                    <label for="contato2">Contato 2:</label>
                    <br></br>
                    <input type="number" id='contato2' name="contato2" placeholder="Contato 2" />
                </div>
                <div>
                    <label for="email">E-mail:</label>
                    <br></br>
                    <input type="text" id='email' name="email" placeholder="E-mail" />
                </div>
                <div >
                    <label for="end">Endereço:</label><br></br>
                    <input type="text" id="end" name="end" placeholder='Endereço' />
                    <GrDocumentTransfer />
                </div>
                <div >
                    <label for="n">Nº:</label><br></br>
                    <input type="text" id="n" name="n" placeholder='Nº' />
                </div>
                <div >
                    <label for="cidade">Cidade:</label><br></br>
                    <input type="text" id="cidade" name="cidade" placeholder='Cidade' />
                </div>
                <div >
                    <label for="bairro">Bairro:</label><br></br>
                    <input type="text" id="bairro" name="bairro" placeholder='Bairro' />
                </div>
                <div >
                    <label for="cep">CEP:</label><br></br>
                    <input type="text" id="cep" name="cep" placeholder='CEP' />
                </div>
                <div className={styles.radio}>
                    <label for="fin">Resp. financeiro:</label>
                    <input  type="radio" id="fin" name="fin"/>
                </div>
            </div>
        </>
    )
}

export default InfoDasMaes;