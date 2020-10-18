import React from 'react';
import useI18n from '../../hooks/useI18n';
import { replaceTagWithComponent } from '../../helpers/interpolation';

import logo from '../logo.svg';
import './logo.css';

const getLinkFormatted = (logoText, link) => {
    const comp = 'a';
    const props = {className: 'logo__link', href: link};
    const tag = 'link';

    return replaceTagWithComponent(logoText, tag, comp, props);
}

const Logo = ({monthlyDuration = true}) => {
    const lang = useI18n();
    const logoText = monthlyDuration ? lang.monthly.logo : lang.oneTime.logo;
    
    const logoTextFormatted = getLinkFormatted(logoText.text, logoText.link);
    
    return (
        <div className="logo">
            <img className="logo__img" src={logo} alt="logo" />
            <div className="t-title logo__title">{logoText.header}</div>
            <p className="t-body--small">{logoTextFormatted}</p>
        </div>
    )
}

export default Logo;