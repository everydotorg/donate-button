import './donations.css';

import {Fragment} from 'preact';
import {useRef, useEffect, useState} from 'preact/hooks';

import DonationsForm from './DonationsForm';
import Header from './Header';
import Logo from './Logo';
import ToggleDonationType from './ToggleDonationType';

const Donations = ({monthlyDonation, setMonthlyDonation}) => {
	const donationsRef = useRef(null);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const isScrolled = () => {
			if (donationsRef.current) {
				setScrolled(donationsRef.current.scrollTop > 0);
			}
		};

		donationsRef.current.addEventListener('scroll', isScrolled);
		isScrolled();

		return () => donationsRef.current.removeEventListener('scroll', isScrolled);
	}, []);

	return (
		<Fragment>
			<div ref={donationsRef} className="donations">
				<Logo scrolled={scrolled} monthlyDonation={monthlyDonation} />
				<div className="donations__header">
					<Header monthlyDonation={monthlyDonation} />
				</div>
				<DonationsForm monthlyDonation={monthlyDonation} />
				<ToggleDonationType
					handleClick={() => setMonthlyDonation(!monthlyDonation)}
					monthlyDonation={monthlyDonation}
				/>
			</div>
		</Fragment>
	);
};

export default Donations;
