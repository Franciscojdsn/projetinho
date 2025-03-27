export default function InputExibir({ type, text, name, placeholder, handleOnChange, value }) {

    return (

        <>
            <div>
                <label htmlFor={name}>{text}</label><br></br>
                <label
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                />
            </div>
        </>

    )

}