import logo from 'src/assets/logo.svg';
import {replaceTagWithComponent} from 'src/helpers/interpolation';
import useI18n from 'src/hooks/use-i18n';

import 'src/components/Donations/Logo/logo.css';

const getLinkFormatted = (logoText: string, link: string) => {
	const props = {className: 'logo__link', href: link};
	const tag = 'link';

	return replaceTagWithComponent(
		logoText,
		tag,
		(props) => <a {...props} />,
		props
	);
};

const Logo = ({monthlyDonation = true, scrolled = false}) => {
	const lang = useI18n();
	const logoText = monthlyDonation ? lang.monthly.logo : lang.oneTime.logo;

	const logoTextFormatted = getLinkFormatted(logoText.text, logoText.link);
	const boxShadow = scrolled
		? 'box-shadow: 0 3px 7px 0px rgba(0, 0, 0, 0.1)'
		: '';
	return (
		<div className="logo" style={boxShadow}>
			<img className="logo__img" src={logo} alt="logo" />
			<div className="t-title logo__title">{logoText.header}</div>
			<p className="t-body--small logo__link">{logoTextFormatted}</p>
		</div>
	);
};

export default Logo;
