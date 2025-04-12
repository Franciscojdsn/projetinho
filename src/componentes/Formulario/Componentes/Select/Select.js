export default function SelectAtividades({ text, label, name, options, handleOnChange, value }) {

    return (

        <>
            <label htmlFor={name}>{label}</label><br></br>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option> {text}</option>
                {options.map((turno) => (
                    <option value={turno.id} key={turno.id}>{turno.nome}</option>
                ))}
            </select>
        </>
    )

}