export default function Notas() {

    return (
        <>
            <form>
                <div className="infonotas">
                    <div className="notas">
                        <label htmlFor="input-nota1" id="label-nota1"> Nota 1</label>
                        <input type="number" labelledby="label-nota1" id="input-nota1" className="nota"/>
                    </div>
                    <div className="notas">
                        <label htmlFor="input-nota2" id="label-nota2"> Nota 2</label>
                        <input type="number" labelledby="label-nota2" id="input-nota2" className="nota"/>
                    </div>
                    <div className="notas">
                        <label htmlFor="input-nota3" id="label-nota3"> Nota 3</label>
                        <input type="number" labelledby="label-nota3" id="input-nota3" className="nota"/>
                    </div>
                    <div className="notas">
                        <label htmlFor="input-nota4" id="label-nota4"> Nota 4</label>
                        <input type="number" labelledby="label-nota4" id="input-nota4" className="nota"/>
                    </div>
                    <div className="media">
                        <label htmlFor="input-media" id="label-media"> Média</label>
                        <input type="number" labelledby="label-media" id="input-media" className="nota"/>
                    </div>
                </div>
                <div className="infonotas">
                    <div className="notas">
                        <label htmlFor="input-nota1" id="label-nota1"> Presença</label>
                        <input type="number" labelledby="label-nota1" id="input-nota1" className="presença"/>
                    </div>
                    <div className="notas">
                        <label htmlFor="input-nota2" id="label-nota2"> Nota 2</label>
                        <select labelledby="label-nota1" id="input-nota2" className="selecao">
                            <option>Aprovado</option>
                            <option>Reprovado</option>
                        </select>
                    </div>

                </div>
            </form>
        </>
    )

}