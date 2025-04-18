export default function Input({ onBlur, type, text, name, placeholder, handleOnChange, value, accept, min, max, maxLength, onInput }) {
    return (
        <div>
            <label htmlFor={name}>{text}</label><br />
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                    min={min}
                    max={max}
                    maxLength={maxLength}
                    onInput={onInput}
                    onBlur={onBlur}
                    {...(type === "file" && { accept })}
                />
        </div>
    );
}