import React from "react";
import styles from "./Input.module.css"

type InputProps =  {
    input:{id:string,
        type: string,
        min: string,
        max: string,
        step: string,
        defaultValue:string,},
    label:string,
}
const Input = React.forwardRef<HTMLInputElement, InputProps>( ({input, label}, ref) => {
    return <div className={styles.input}>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input}/>
    </div>
});

export default Input;