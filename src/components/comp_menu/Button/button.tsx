import React from "react";
import "./Button.css";


interface ButtonProps {
    // action: string;
    onClick: () => void 
}




const Button: React.FC<ButtonProps> = ({ onClick } ) => {
    return (
        <button onClick={onClick}>Comenzar</button>
    );
};


export default Button;