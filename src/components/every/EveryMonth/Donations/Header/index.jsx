
import useI18n from '../../../hooks/useI18n';
import { Fragment } from 'preact'

const Header = ({monthlyDonation}) => {
  const lang = useI18n();
  const headingText = monthlyDonation ? lang.monthly : lang.oneTime;

    return (
        <Fragment>
            <h1 className="t-heading-primary">{headingText.header}</h1>
            <h2 className="t-heading-secondary">{headingText.info}</h2>
        </Fragment>
    )
}

export default Header;
