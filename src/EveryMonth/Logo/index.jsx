import React from 'react'
import logo from '../logo.svg';
import './logo.css';

const Logo = () => {
    return (
        <div className="logo">
            <img className="logo__img" src={logo} alt="logo" />
            <h3 className="t-title logo__title">Monthly donation</h3>
            <p className="t-body--small">on <a className="logo__link" href="https://every.org">every.org</a></p>
        </div>
    )
}

export default Logo;