export default function Radio({ handleOnChange }) {

    return (

        <>
            <label htmlFor="gen">Gênero: <br></br>
                <div>
                    <label htmlFor="masc">M:</label>
                    <input onChange={handleOnChange} type="radio" id="masc" name="sexo" value="M" />
                    <label htmlFor="fem">F:</label>
                    <input onChange={handleOnChange} type="radio" id="fem" name="sexo" value="F" />
                </div>
            </label>
        </>

    )

}