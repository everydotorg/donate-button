import './donations.css';


import Logo from './Logo';
import ToggleDonationType from './ToggleDonationType';
import Header from './Header';
import DonationsForm from './DonationsForm';
import DonateButton from './DonateButton';
import { Fragment } from 'preact';

const Donations = ({monthlyDonation, setMonthlyDonation}) => {
    return (
      <Fragment>
      <div className="donations">
        <Logo  monthlyDonation={monthlyDonation} />
        <div className="donations__header">
          <Header  monthlyDonation={monthlyDonation} />
        </div>
        <DonationsForm monthlyDonation={monthlyDonation}/>
        <ToggleDonationType handleClick={() => setMonthlyDonation(!monthlyDonation)} monthlyDonation={monthlyDonation} />
      </div>
      </Fragment>
    )
}

export default Donations
