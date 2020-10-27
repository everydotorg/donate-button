import React from 'react';
import './input.css';

const Input = ({value, setValue, extraClasses, label, placeholder, description, selected, ...otherProps}) => {
    const inputClasses = ['input__container'].concat(extraClasses).concat([selected ? 'input--selected' : '']);
    return (
        <div className={inputClasses.join(' ')}>    
            <div className="input">
                <span className="t-title input__prefix no-line-height">$</span>
                <input className="t-title input__input" placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)}  {...otherProps} />
                {label && <span className="t-title input__suffix no-line-height">{label}</span>}
            </div>
            {description && 
                <p className="t-body--small input__description">{description}</p>
            }
        
        </div>
    )
}

export default Input;