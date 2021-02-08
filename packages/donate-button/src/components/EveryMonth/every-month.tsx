import {useState, useEffect} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import Description from 'src/components/Description';
import Donations from 'src/components/Donations';
import DonateButton from 'src/components/Donations/DonateButton';
import appStyles from 'src/components/EveryMonth/styles';
import Images from 'src/components/Images';
import Company from 'src/components/Images/Company';
import {Styled} from 'src/components/Styled';
import DonationsContext, {AnimationValue} from 'src/contexts/donations-context';
import OptionsContext from 'src/contexts/options-context';
import {DonateButtonOptions} from 'src/helpers/options-types';

interface EveryMonthProps {
	options: DonateButtonOptions;
	hide: () => void;
}
function EveryMonth({options, hide}: EveryMonthProps) {
	const hideOnWrapperClick: JSXInternal.MouseEventHandler<Element> = (
		event
	) => {
		if (event.target === event.currentTarget) {
			hide();
		}
	};

	const [monthlyDonation, setMonthlyDonation] = useState(true);

	const defaultLevel = options.monthly.levels.find((level) => level.default);
	const [donationAmount, setDonationAmount] = useState(
		defaultLevel?.amount ?? options.monthly.levels[0].amount
	);
	const [customDonation, setCustomDonation] = useState('');
	const [triggerAnimation, setTriggerAnimation] = useState<AnimationValue>([
		-1,
		0
	]);
	const [monthlyLevels, setMonthlyLevels] = useState(
		// Custom must be the last level
		[...options.monthly.levels].sort((a, b) =>
			Number.isNaN(Number(b.amount)) ? -1 : 0
		)
	);

	useEffect(() => {
		// Fade in down - fade out down-> [0] > [1]
		// fade in up - fade out up-> [0] < [1]
		const [previousValue, currValue] = triggerAnimation;

		if (previousValue > currValue) {
			const levelClasses = monthlyLevels.map((level, i) => {
				if (i === previousValue) {
					return {
						...level,
						classes: ['fadeOutDown']
					};
				}

				if (i === currValue) {
					return {
						...level,
						classes: ['fadeInDown', 'right-panel__item--active']
					};
				}

				return level;
			});
			setMonthlyLevels(levelClasses);
		}

		if (previousValue < currValue) {
			const levelClasses = monthlyLevels.map((level, i) => {
				if (i === previousValue) {
					return {
						...level,
						classes: ['fadeOutUp']
					};
				}

				if (i === currValue) {
					return {
						...level,
						classes: ['fadeInUp', 'right-panel__item--active']
					};
				}

				return {...level, classes: ['right-panel__item--hidden']};
			});
			setMonthlyLevels(levelClasses);
		}

		const timeout = setTimeout(() => {
			const levelClasses = monthlyLevels.map((level, i) => {
				if (i === currValue) {
					return {
						...level,
						classes: ['right-panel__item--active']
					};
				}

				return {
					...level,
					classes: ['right-panel__item--hidden']
				};
			});

			setMonthlyLevels(levelClasses);
		}, 300);

		return () => {
			clearTimeout(timeout);
		};
	}, [triggerAnimation]);

	return (
		<Styled scoped={false} styles={appStyles}>
			<div>
				<div className="wrapper" onClick={hideOnWrapperClick}>
					<div className="close" onClick={hideOnWrapperClick}></div>
					<OptionsContext.Provider value={options}>
						<DonationsContext.Provider
							value={{
								monthlyDonation,
								setMonthlyDonation,
								donationAmount,
								setDonationAmount,
								customDonation,
								setCustomDonation,
								setTriggerAnimation
							}}
						>
							{options.mode.toUpperCase() === 'SPLIT_PANEL' && (
								<div className="widget widget--split">
									<Donations
										monthlyDonation={monthlyDonation}
										setMonthlyDonation={setMonthlyDonation}
									/>
									<div className="right-panel">
										<Company />
										{monthlyLevels.map((level, i) => {
											return (
												<div
													key={i}
													className={['right-panel__item']
														.concat(level.classes ?? [])
														.join(' ')}
												>
													{level.img && <Images image={level.img} />}
													<Description monthlyBgColor={level.bgColor} />
												</div>
											);
										})}
									</div>
								</div>
							)}
							{options.mode.toUpperCase() === 'SINGLE' && (
								<div className="widget widget--single">
									<Donations
										monthlyDonation={monthlyDonation}
										setMonthlyDonation={setMonthlyDonation}
									/>
								</div>
							)}
							<div className="u-hide-desktop btn-mobile">
								<DonateButton
									monthlyDonation={monthlyDonation}
									extraClasses={['u-hide-desktop']}
								/>
							</div>
						</DonationsContext.Provider>
					</OptionsContext.Provider>
				</div>
			</div>
		</Styled>
	);
}

export default EveryMonth;
