

import './company.css';

import logo from '../../../assets/logo.svg';
import useI18n from '../../../hooks/useI18n';

const Company = () => {
    const { company } = useI18n();

    const companyLogoSrc = company.logo || logo;

    return (
    <div className="company">
        <img className="company__img" src={companyLogoSrc} alt="Compoany logo" />
        <p className="t-title company__title">{company.name}</p>
        <p className="t-body--small company__subtitle">{company.location}</p>
    </div>
    )
}

export default Company
