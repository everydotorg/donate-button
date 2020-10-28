import React from 'react';
import './radio-button.css';

const RadioButton = ({name, text, amount, selected, handleClick, description, image, bgColor}) => {
    const groupClasses = ['radio-button'];
    if(selected) {
        groupClasses.push('radio-button--selected')
    }

    const labelClasses = ["radio-button__label"].concat([
        text ? 'u-justify-content-space-between' : 'u-justify-content-center'
    ])

    const isAppleDevice = () => {
        return navigator.platform.indexOf('Mac') > -1 || navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    return (
        <div className={groupClasses.join(' ')}>
            <input onClick={handleClick} className="radio-button__input" type="radio" name={name} id={amount} />
            <label className={labelClasses.join(' ')} htmlFor={amount}>
                {text && <span className="t-title radio-button__text">{text}</span>}
                <span className="t-title radio-button__amount">${amount}</span>
            </label>
            {description && <div style={{backgroundColor: bgColor}} className="radio-button__extra">
                    <img style={{height: isAppleDevice() ? 'auto' : '100%'}} className="radio-button__image" src={image} alt={text} />
                <p className="t-body--small radio-button__description">{description}</p>
            </div>}
        </div>
    )
}

export default RadioButton;