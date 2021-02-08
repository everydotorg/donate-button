import 'src/components/Images/Company/company.css';

import logo from 'src/assets/logo.svg';
import useI18n from 'src/hooks/use-i18n';

const Company = () => {
	const {company} = useI18n();

	const companyLogoSrc = company.logo || logo;

	return (
		<div className="company">
			<img className="company__img" src={companyLogoSrc} alt="Compoany logo" />
			<p className="t-title company__title">{company.name}</p>
			<p className="t-body--small company__subtitle">{company.location}</p>
		</div>
	);
};

export default Company;
