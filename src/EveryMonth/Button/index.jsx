import React from 'react';
import './button.css';

const Button = ({handleClick, children, href}) => {
    return (
        <a href={href} className="btn" onClick={e => {
            e.preventDefault();
            handleClick(e);
        }}>{children}</a>
    )
}

export default Button;