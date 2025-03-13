import styles from './InfoDosAlunos.module.css'

function InfoDosAlunos() {

    return (
        <>
            <div className={styles.container}>
                    <div className={styles.grupo1}>
                        <label for="aluno">Nome do aluno:</label><br></br>
                        <input type="text" id="aluno" name="aluno" placeholder="Nome Completo" />
                    </div>
                    <div className={styles.grupo2}>
                        <label for="nasc">Data de nasc.:</label><br></br>
                        <input type="text" id="nasc" name="nasc" placeholder="00/00/0000" />
                    </div>
                    <div className={styles.grupo3}>
                        <fieldset required>
                            <label for="gen">Gênero: <br></br>
                                <div>
                                    <label for="masc">M:</label>
                                    <input type="radio" id="masc" name="sexo" value="f" />
                                    <label for="fem">F:</label>
                                    <input type="radio" id="fem" name="sexo" value="f" />
                                </div>
                            </label>
                        </fieldset>
                    </div>
                    <div className={styles.grupo4}>
                        <label for="cpf">CPF:</label><br></br>
                        <input type="text" id="cpf" name="cpf" placeholder='CPF'/>
                    </div>
                    <div className={styles.grupo5}>
                        <label for="end">Endereço:</label><br></br>
                        <input type="text" id="end" name="end" placeholder='Endereço'/>
                    </div>
                    <div className={styles.grupo6}>
                        <label for="n">Nº:</label><br></br>
                        <input type="text" id="n" name="n" placeholder='Nº'/>
                    </div>
                    <div className={styles.grupo7}>
                        <label for="cidade">Cidade:</label><br></br>
                        <input type="text" id="cidade" name="cidade" placeholder='Cidade'/>
                    </div>
                    <div className={styles.grupo8}>
                        <label for="bairro">Bairro:</label><br></br>
                        <input type="text" id="bairro" name="bairro" placeholder='Bairro'/>
                    </div>
                    <div className={styles.grupo9}>
                        <label for="cep">CEP:</label><br></br>
                        <input type="text" id="cep" name="cep" placeholder='CEP'/>
                    </div>
                    <div className={styles.grupo10}>
                        <label for="turma">Turma:</label><br></br>
                        <select name="turma">
                            <option value="" disabled selected></option>
                            <option value="maternalii">Maternal II</option>
                            <option value="maternaliii">Maternal III</option>
                            <option value="jardimi">Jardim I</option>
                            <option value="jardimii">Jardim II</option>
                            <option value="1ano">1º Ano</option>
                            <option value="1ano">2º Ano</option>
                            <option value="1ano">3º Ano</option>
                            <option value="1ano">4º Ano</option>
                            <option value="1ano">5º Ano</option>
                        </select>
                    </div>
                    <div className={styles.grupo11}>
                        <label for="turma">turno:</label><br></br>
                        <select name="turma">
                            <option disabled selected></option>
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                        </select>
                    </div>
            </div>
        </>
    )

}

export default InfoDosAlunos;