export default function Radioresp ({ handleOnChange, resp }) {

    return (

        <>
            <label htmlFor="gen">Resp <br></br>
                <div>
                    <label htmlFor="resp">Resp. Fin.</label>
                    <input onChange={handleOnChange} type="radio" id="resp" name="resp" value={resp} />
                </div>
            </label>
        </>

    )

}