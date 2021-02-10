import {useEffect, useRef, useState} from 'preact/hooks';
import DonationsForm from 'src/components/Donations/DonationsForm';
import Header from 'src/components/Donations/Header';
import Logo from 'src/components/Donations/Logo';
import ToggleDonationType from 'src/components/Donations/ToggleDonationType';

import 'src/components/Donations/donations.css';

const Donations = ({
	monthlyDonation,
	setMonthlyDonation
}: {
	monthlyDonation: boolean;
	setMonthlyDonation(v: boolean): void;
}) => {
	const donationsRef = useRef<HTMLDivElement | null>(null);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const element = donationsRef.current;
		const isScrolled = () => {
			if (element) {
				setScrolled(element.scrollTop > 0);
			}
		};

		element?.addEventListener('scroll', isScrolled);
		isScrolled();

		return () => element?.removeEventListener('scroll', isScrolled);
	}, []);

	return (
		<div ref={donationsRef} className="donations">
			<Logo scrolled={scrolled} monthlyDonation={monthlyDonation} />
			<div className="donations__header">
				<Header monthlyDonation={monthlyDonation} />
			</div>
			<DonationsForm monthlyDonation={monthlyDonation} />
			<ToggleDonationType
				handleClick={() => {
					setMonthlyDonation(!monthlyDonation);
				}}
				monthlyDonation={monthlyDonation}
			/>
		</div>
	);
};

export default Donations;
