import React from "react";
import "./Button.css";
import App from "../../../App";

interface ButtonProps {
    // action: string;
    onClick: () => void 
}




const Button: React.FC<ButtonProps> = ({ onClick } ) => {
    return (
        <button onClick={onClick}>Prueba</button>
    );
};


export default Button;