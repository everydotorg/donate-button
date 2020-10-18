import React from 'react'
import './company.css';

import logo from '../../logo.svg';

const Company = () => {
    return (
    <div className="company">
        <img className="company__img" src={logo} alt="Compoany logo" />
        <div className="t-title company__title">Fungi Foundation</div>
        <p className="t-body--small company__subtitle">Santiago, chile</p>
    </div>
    )
}

export default Company
