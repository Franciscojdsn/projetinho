export default function Select({ text, label, name, options, handleOnChange, value }) {

    return (

        <>
            <label htmlFor={name}>{label}</label><br></br>
            <select
                name={name}
                onChange={handleOnChange}
                value={value}
            >
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    )

}