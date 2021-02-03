import {Fragment} from 'preact';
import {useContext, useState, useEffect} from 'preact/hooks';

import DonationsContext from '../../../contexts/donationsContext';
import OptionsContext from '../../../contexts/optionsContext';
import {replaceTagWithComponent} from '../../../helpers/interpolation';
import useI18n from '../../../hooks/useI18n';
import Input from '../../Input';
import RadioButton from '../../RadioButton';
import DonateButton from '../DonateButton';

const getLevelOfAmount = (levels, amount) => {
	return levels.findIndex((l) => l.amount == amount);
};

const getBoldFormatted = (text) => {
	const comp = 'span';
	const props = {};
	const tag = 'bold';

	return replaceTagWithComponent(text, tag, comp, props);
};

const DonationsForm = ({monthlyDonation}) => {
	const {
		donationAmount,
		setDonationAmount,
		customDonation,
		setCustomDonation,
		setTriggerAnimation
	} = useContext(DonationsContext);

	const {monthly, oneTime, onSubmit, currency, mode} = useContext(
		OptionsContext
	);
	const [customInputFocus, setCustomInputFocus] = useState(false);

	const lang = useI18n();
	const formText = monthlyDonation ? lang.monthly : lang.oneTime;

	useEffect(() => {
		const defaultLevel = monthly.levels.find((level) => level.default);
		if (defaultLevel) {
			handleRadioButtonClick(monthly.levels[0].amount);
			const defaultSelectionTimeout = setTimeout(() => {
				handleRadioButtonClick(defaultLevel.amount);
			});

			return () => {
				clearTimeout(defaultSelectionTimeout);
			};
		}
	}, []);

	const handleCustomInputFocus = () => {
		const previousLevel = getLevelOfAmount(monthly.levels, donationAmount);
		const currLevel = monthly.levels.length - 1;
		if (monthlyDonation) {
			setTriggerAnimation([previousLevel, currLevel]);
		}

		setDonationAmount(customDonation);
		setCustomInputFocus(true);
	};

	const handleCustomInputBlur = () => {
		setCustomInputFocus(false);
	};

	const handleRadioButtonClick = (amount) => {
		// Custom donation is always the last control
		// If we have a custom donation the previous level is the custom input.
		const previousLevel =
			customDonation || !donationAmount
				? monthly.levels.length - 1
				: getLevelOfAmount(monthly.levels, donationAmount);
		const currLevel = getLevelOfAmount(monthly.levels, amount);

		if (monthlyDonation) {
			setTriggerAnimation([previousLevel, currLevel]);
		}

		setDonationAmount(amount);
		setCustomDonation('');
	};

	const handleInputChange = (value) => {
		setDonationAmount(value);
		setCustomDonation(value);
	};

	const fixedLevels = monthly.levels.filter(
		(level) => level.amount !== 'custom'
	);
	const customLevel = monthly.levels.find((level) => level.amount === 'custom');

	const showLabels = monthlyDonation
		? fixedLevels.every(
				(level) =>
					formText?.levels?.find(
						(langLevel) => langLevel.amount === level.amount
					)?.name
		  )
		: oneTime.levels.every(
				(amount) =>
					formText?.levels?.find((langLevel) => langLevel.amount === amount)
						?.name
		  );

	const formClasses = ['donations__form'].concat([
		showLabels ? 'donations__form--one-column' : 'donations__form--two-column'
	]);

	return (
		<Fragment>
			<div className={formClasses.join(' ')}>
				{monthlyDonation && (
					<Fragment>
						{fixedLevels.map((option, i) => (
							<RadioButton
								key={i}
								name="amount"
								amount={option.amount}
								selected={donationAmount === option.amount}
								handleClick={() => {
									handleRadioButtonClick(option.amount);
								}}
								text={
									showLabels
										? formText.levels.find(
												(level) => level.amount === option.amount
										  )?.name
										: ''
								}
								description={getBoldFormatted(
									formText.levels.find(
										(level) => level.amount === option.amount
									)?.description1
								)}
								image={option.img}
								bgColor={option.bgColor}
							/>
						))}
						{customLevel && (
							<Input
								label={formText.custom.label}
								placeholder={formText.custom.placeholder}
								value={customDonation}
								setValue={handleInputChange}
								description={lang.oneTime.description}
								extraClasses={['donations__input']}
								onFocus={handleCustomInputFocus}
								onBlur={handleCustomInputBlur}
								selected={customInputFocus}
							/>
						)}
					</Fragment>
				)}

				{!monthlyDonation && (
					<Fragment>
						{oneTime.levels.map((option) => (
							<RadioButton
								key={option}
								name="amount"
								amount={option}
								selected={donationAmount === option}
								handleClick={() => {
									handleRadioButtonClick(option);
								}}
								text={
									showLabels
										? formText?.levels?.find(
												(level) => level?.amount === option
										  )?.name
										: ''
								}
							/>
						))}
						{oneTime.allowCustom && (
							<Input
								placeholder={formText.custom.placeholder}
								value={customDonation}
								setValue={handleInputChange}
								extraClasses={['donations__input']}
								onFocus={handleCustomInputFocus}
								onBlur={handleCustomInputBlur}
								selected={customInputFocus}
							/>
						)}
					</Fragment>
				)}
			</div>
			<div className="donations__submit">
				<DonateButton
					monthlyDonation={monthlyDonation}
					extraClasses={['u-hide-mobile']}
				/>
				<p className="t-body--small">{lang.footer}</p>
			</div>
		</Fragment>
	);
};

export default DonationsForm;
