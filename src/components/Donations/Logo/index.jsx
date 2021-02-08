
import useI18n from '../../../hooks/useI18n';
import { replaceTagWithComponent } from '../../../helpers/interpolation';

import logo from '../../../assets/logo.svg';
import './logo.css';

const getLinkFormatted = (logoText, link) => {
    const comp = 'a';
    const props = {className: 'logo__link', href: link};
    const tag = 'link';

    return replaceTagWithComponent(logoText, tag, comp, props);
}

const Logo = ({monthlyDonation = true, scrolled = false}) => {
    const lang = useI18n();
    const logoText = monthlyDonation ? lang.monthly.logo : lang.oneTime.logo;

    const logoTextFormatted = getLinkFormatted(logoText.text, logoText.link);
    const boxShadow = scrolled ? 'box-shadow: 0 3px 7px 0px rgba(0, 0, 0, 0.1)': '';
    return (
        <div className="logo" style={boxShadow}>
            <img className="logo__img" src={logo} alt="logo" />
            <div className="logo__heading">
                <h3 className="t-title logo__title">{logoText.header}</h3>
                <p className="t-body--small logo__link">{logoTextFormatted}</p>
            </div>
        </div>
    )
}

export default Logo;