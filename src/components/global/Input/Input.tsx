import React from "react";
import styles from './input.module.css';


interface InputProps extends React.HTMLProps<HTMLInputElement>{
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // name?: string;
    // value: string;
    // type: string;
    // placeholder?: string;
    label?: string; 
}

const Input: React.FC<InputProps> = ({onChange, name, value, type, placeholder, label}) => {

    // const valid = ():boolean => {
    //     if(type ==='email') {   
    //         const emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //         return emailRegex.test(value);
    //     }
    //     return true;

    // }

    
    return (
        <div className={styles.container}>
        <p className={styles.label}>{label}</p>
        <input className={styles.input}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />        
        </div>
    )
}


export default Input;