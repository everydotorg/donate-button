import React from 'react';
import './radio-button.css';

const RadioButton = ({name, text, amount, selected, handleClick}) => {
    const groupClasses = ['radio-button'];
    if(selected) {
        groupClasses.push('radio-button--selected')
    }

    const labelClasses = ["radio-button__label"].concat([
        text ? 'u-justify-content-space-between' : 'u-justify-content-center'
    ])

    return (
        <div className={groupClasses.join(' ')}>
            <input onClick={handleClick} className="radio-button__input" type="radio" name={name} id={amount} />
            <label className={labelClasses.join(' ')} htmlFor={amount}>
                {text && <span className="t-title radio-button__text">{text}</span>}
                <span className="t-title radio-button__amount">${amount}</span>
            </label>
        </div>
    )
}

export default RadioButton;