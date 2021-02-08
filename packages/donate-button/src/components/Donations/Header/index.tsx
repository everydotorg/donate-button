import {Fragment} from 'preact';
import useI18n from 'src/hooks/use-i18n';

const Header = ({monthlyDonation}: {monthlyDonation: boolean}) => {
	const lang = useI18n();
	const headingText = monthlyDonation ? lang.monthly : lang.oneTime;

	return (
		<Fragment>
			<h1 className="t-heading-primary">{headingText.header}</h1>
			<h2 className="t-heading-secondary">{headingText.info}</h2>
		</Fragment>
	);
};

export default Header;
