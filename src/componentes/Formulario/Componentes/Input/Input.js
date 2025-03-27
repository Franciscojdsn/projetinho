import styles from './Input.module.css'

export default function Input({ type, text, name, placeholder, handleOnChange, value }) {

    return (

        <>
            <div>
                <label htmlFor={name}>{text}</label><br></br>
                <input 
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