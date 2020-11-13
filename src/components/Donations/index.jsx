;
import './donations.css';


import Logo from './Logo';
import ToggleDonationType from './ToggleDonationType';
import Header from './Header';
import DonationsForm from './DonationsForm';

const Donations = ({monthlyDonation, setMonthlyDonation}) => {
    return (
      <div className="donations">
        <Logo  monthlyDonation={monthlyDonation} />
        <div className="donations__header">
          <Header  monthlyDonation={monthlyDonation} />
        </div>
        <DonationsForm monthlyDonation={monthlyDonation}/>
        <ToggleDonationType handleClick={() => setMonthlyDonation(!monthlyDonation)} monthlyDonation={monthlyDonation} />
      </div>
    )
}

export default Donations
