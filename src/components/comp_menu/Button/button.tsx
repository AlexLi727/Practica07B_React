import React from "react";
import "./Button.css";

interface ButtonProps {

    action: string;
}



const Button: React.FC<ButtonProps> = ({ action }) => {
    return (
        <button>{action}</button>
    );
};


export default Button;