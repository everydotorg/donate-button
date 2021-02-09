import {Fragment} from 'preact';
import {useContext, useState, useEffect, useCallback} from 'preact/hooks';
import DonateButton from 'src/components/Donations/DonateButton';
import Input from 'src/components/Input';
import RadioButton from 'src/components/RadioButton';
import DonationsContext from 'src/contexts/donations-context';
import OptionsContext from 'src/contexts/options-context';
import {replaceTagWithComponent} from 'src/helpers/interpolation';
import {DonationLevel} from 'src/helpers/options-types';
import useI18n from 'src/hooks/use-i18n';

const getLevelOfAmount = (levels: readonly DonationLevel[], amount: string) => {
	return levels.findIndex((l) => l.amount === amount);
};

const getBoldFormatted = (text: string) => {
	const props = {};
	const tag = 'bold';

	return replaceTagWithComponent(
		text,
		tag,
		(props) => <span {...props} />,
		props
	);
};

const DonationsForm = ({monthlyDonation}: {monthlyDonation: boolean}) => {
	const donationsContextValue = useContext(DonationsContext);

	const {monthly, oneTime } = useContext(
		OptionsContext
	);
	const [customInputFocus, setCustomInputFocus] = useState(false);

	const lang = useI18n();
	const formText = monthlyDonation ? lang.monthly : lang.oneTime;

	const handleRadioButtonClick = useCallback(
		(amount: string) => {
			if (!donationsContextValue) {
				return;
			}

			const {
				donationAmount,
				setDonationAmount,
				customDonation,
				setCustomDonation,
				setTriggerAnimation,
				setCustomInputError
			} = donationsContextValue;
			// Custom donation is always the last control
			// If we have a custom donation the previous level is the custom input.
			const previousLevel =
				customDonation || !donationAmount
					? monthly.levels.length - 1
					: getLevelOfAmount(monthly.levels, donationAmount);
			const currLevel = getLevelOfAmount(monthly.levels, amount);

			if (
				monthlyDonation &&
				setTriggerAnimation &&
				currLevel !== previousLevel
			) {
				setTriggerAnimation([previousLevel, currLevel]);
			}

			if (amount !== donationAmount) {
				setDonationAmount(amount);
				setCustomInputError('')
			}

			if (customDonation) {
				setCustomDonation('');
			}
		},
		[monthly.levels, monthlyDonation, donationsContextValue]
	);

	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		if (initialized) {
			return;
		}

		const defaultLevel = monthly.levels.find((level) => level.default);
		if (defaultLevel) {
			handleRadioButtonClick(defaultLevel.amount);
		}

		setInitialized(true);
	}, [initialized, handleRadioButtonClick, monthly.levels]);

	if (!donationsContextValue) {
		return null;
	}

	const {
		donationAmount,
		setDonationAmount,
		customDonation,
		setCustomDonation,
		setTriggerAnimation,
		customInputError,
		setCustomInputError
	} = donationsContextValue;

	const handleCustomInputFocus = () => {
		const previousLevel = donationAmount
			? getLevelOfAmount(monthly.levels, donationAmount)
			: 0;
		const maxLevel = monthly.levels.length - 1;
		if (monthlyDonation && setTriggerAnimation) {
			setTriggerAnimation([previousLevel, maxLevel]);
		}

		if (setDonationAmount) {
			setDonationAmount(customDonation);
		}

		setCustomInputFocus(true);
	};

	const handleCustomInputBlur = () => {
		setCustomInputFocus(false);
	};

	const handleInputChange = (value: string) => {
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
					formText?.levels?.find(
						(langLevel) => langLevel.amount === String(amount)
					)?.name
		  );

	const formClasses = ['donations__form'].concat([
		showLabels ? 'donations__form--one-column' : 'donations__form--two-column'
	]);

	return (
		<Fragment>
			<div className={formClasses.join(' ')}>
				{monthlyDonation && (
					<Fragment>
						{fixedLevels.map((option, i) => {
							const description = formText.levels?.find(
								(level) => level.amount === option.amount
							)?.description1;
							return (
								<RadioButton
									key={option.amount}
									name="amount"
									amount={option.amount}
									selected={donationAmount === option.amount}
									handleClick={() => {
										handleRadioButtonClick(option.amount);
									}}
									text={
										showLabels
											? formText.levels?.find(
													(level) => level.amount === option.amount
											  )?.name ?? ''
											: ''
									}
									description={description && getBoldFormatted(description)}
									image={option.img}
									bgColor={option.bgColor}
								/>
							);
						})}
						{customLevel && (
							<Input
								label={formText.custom.label}
								placeholder={formText.custom.placeholder}
								value={customDonation}
								setValue={handleInputChange}
								description={lang.oneTime.description}
								extraClasses={['donations__input']}
								selected={customInputFocus}
								onFocus={handleCustomInputFocus}
								onBlur={handleCustomInputBlur}
								error={customInputError}
								setError={setCustomInputError}
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
								amount={String(option)}
								selected={donationAmount === String(option)}
								handleClick={() => {
									handleRadioButtonClick(String(option));
								}}
								text={
									showLabels
										? formText?.levels?.find(
												(level) => level?.amount === String(option)
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
								selected={customInputFocus}
								onFocus={handleCustomInputFocus}
								onBlur={handleCustomInputBlur}
								error={customInputError}
								setError={setCustomInputError}
							/>
						)}
					</Fragment>
				)}
			</div>
			<div className="donations__submit">
				<DonateButton
					monthlyDonation={monthlyDonation}
					extraClasses={['u-hide-mobile']}
					disabled={Boolean(customInputError)}
				/>
				<p className="t-body--small">{lang.footer}</p>
			</div>
		</Fragment>
	);
};

export default DonationsForm;
