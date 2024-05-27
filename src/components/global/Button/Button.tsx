import React, {ReactNode} from 'react';
import styles from './button.module.css';


interface ButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) =>void;
}

const Button: React.FC<ButtonProps> = ({children, className, onClick}) => {
    return (
        <div className={`${styles.button} ${className}`} onClick={onClick}>
            {children}
        </div>
    
    );
};

export default Button;