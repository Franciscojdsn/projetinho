export default function SelectAtividades({ text, label, name, options, handleOnChange, value }) {

    return (

        <>
            <label htmlFor={name}>{label}</label><br></br>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option> {text}</option>
                {options.map((opt) => (
                    <option value={opt.id} key={opt.id}>{opt.display || opt.nome}</option>
                ))}
            </select>
        </>
    )

}