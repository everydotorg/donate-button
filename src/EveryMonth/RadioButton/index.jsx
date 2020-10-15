import React from 'react';
import './radio-button.css';

const RadioButton = ({name, text, amount, selected, handleClick}) => {
    const groupClasses = ['radio-button'];
    if(selected) {
        groupClasses.push('radio-button--selected')
    }

    return (
        <div className={groupClasses.join(' ')}>
            <input onClick={handleClick} className="radio-button__input" type="radio" name={name} id={amount} />
            <label className="radio-button__label" htmlFor={amount}>
                <span className="t-title radio-button__text">{text}</span>
                <span className="t-title radio-button__amount">${amount}</span>
            </label>
        </div>
    )
}

export default RadioButton;