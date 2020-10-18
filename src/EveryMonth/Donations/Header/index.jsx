import React from 'react'
import useI18n from '../../../hooks/useI18n';

const Header = ({monthlyDonation}) => {
  const lang = useI18n();
  const headingText = monthlyDonation ? lang.monthly : lang.oneTime;

    return (
        <>
            <h1 className="t-heading-primary">{headingText.header}</h1>
            <h2 className="t-heading-secondary">{headingText.info}</h2>
        </>
    )
}

export default Header;
