import {useEffect, useState} from 'preact/hooks';
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
	const [
		donationsElement,
		setDonationsElement
	] = useState<HTMLDivElement | null>(null);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const isScrolled = () => {
			if (donationsElement) {
				setScrolled(donationsElement.scrollTop > 0);
			}
		};

		donationsElement?.addEventListener('scroll', isScrolled);
		isScrolled();

		return () => donationsElement?.removeEventListener('scroll', isScrolled);
	}, [donationsElement]);

	return (
		<div
			ref={(element) => {
				setDonationsElement(element);
			}}
			className="donations"
		>
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
