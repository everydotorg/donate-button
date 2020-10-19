import React from 'react'
import './toggle-donation-type.css';

const ToggleDonationType = ({handleClick, children}) => {
    return (
        <p className="donation-type">Or make a <span onClick={handleClick}>{children}</span></p>
    )
}

export default ToggleDonationType
