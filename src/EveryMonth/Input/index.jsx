import React from 'react';
import './input.css';

const Input = ({value, setValue, extraClasses, label, placeholder}) => {
    const inputClasses = ['input'].concat(extraClasses);
    return (
        <div className={inputClasses.join(' ')}>
            <span className="t-title input__prefix no-line-height">$</span>
            <input className="t-title input__input" placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            {label && <span className="t-title input__suffix no-line-height">{label}</span>}
        </div>
    )
}

export default Input;