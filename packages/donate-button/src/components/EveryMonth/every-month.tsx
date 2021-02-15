import {useState, useEffect, useMemo, useRef} from 'preact/hooks';
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
import {
	DefaultFrequency,
	DonateButtonOptions,
	LayoutMode
} from 'src/helpers/options-types';

interface EveryMonthProps {
	options: DonateButtonOptions;
	hide: () => void;
}
const EveryMonth = ({options, hide}: EveryMonthProps) => {
	const hideOnWrapperClick: JSXInternal.MouseEventHandler<Element> = (
		event
	) => {
		if (event.target === event.currentTarget) {
			hide();
		}
	};

	const isMonthlyDefault = options.defaultMode !== DefaultFrequency.ONE_TIME;
	const [monthlyDonation, setMonthlyDonation] = useState(isMonthlyDefault);

	const defaultLevelIdx = options.monthly.levels.findIndex(
		(level) => level.default
	);
	const defaultLevel = options.monthly.levels[defaultLevelIdx];

	const [donationAmount, setDonationAmount] = useState(
		defaultLevel?.amount ?? options.monthly.levels[0].amount
	);
	const [customDonation, setCustomDonation] = useState('');
	const [customInputError, setCustomInputError] = useState('');
	const [triggerAnimation, setTriggerAnimation] = useState<AnimationValue>([
		-1,
		defaultLevelIdx
	]);
	// Custom must be the last level
	const monthlyLevels = [...options.monthly.levels].sort((a, b) =>
		Number.isNaN(Number(b.amount)) ? -1 : 0
	);

	const [_, currentLevel] = triggerAnimation;
	const [previousLevel, setPreviousLevel] = useState(currentLevel);
	let levelClasses;
	if (previousLevel > currentLevel) {
		levelClasses = monthlyLevels.map((level, i) => {
			if (i === previousLevel) {
				return {
					...level,
					classes: ['fadeOutDown']
				};
			}

			if (i === currentLevel) {
				return {
					...level,
					classes: ['fadeInDown', 'right-panel__item--active']
				};
			}

			return {
				...level,
				classes: ['right-panel__item--hidden']
			};
		});
	} else if (previousLevel < currentLevel) {
		levelClasses = monthlyLevels.map((level, i) => {
			if (i === previousLevel) {
				return {
					...level,
					classes: ['fadeOutUp']
				};
			}

			if (i === currentLevel) {
				return {
					...level,
					classes: ['fadeInUp', 'right-panel__item--active']
				};
			}

			return {
				...level,
				classes: ['right-panel__item--hidden']
			};
		});
	} else {
		levelClasses = monthlyLevels.map((level, i) => {
			if (i === currentLevel) {
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
	}

	// After the animation has completed, set previousLevel equal to current
	useEffect(() => {
		if (currentLevel !== previousLevel) {
			const timeout = setTimeout(() => {
				setPreviousLevel(currentLevel);
			}, 300);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [currentLevel, previousLevel]);

	const donationsContextValue = useMemo(
		() => ({
			customInputError,
			setCustomInputError,
			monthlyDonation,
			setMonthlyDonation,
			donationAmount,
			setDonationAmount,
			customDonation,
			setCustomDonation,
			setTriggerAnimation
		}),
		[
			customInputError,
			setCustomInputError,
			monthlyDonation,
			setMonthlyDonation,
			donationAmount,
			setDonationAmount,
			customDonation,
			setCustomDonation,
			setTriggerAnimation
		]
	);

	return (
		<Styled scoped={false} styles={appStyles}>
			<div>
				<div className="wrapper" onClick={hideOnWrapperClick}>
					<div className="close" onClick={hideOnWrapperClick} />
					<OptionsContext.Provider value={options}>
						<DonationsContext.Provider value={donationsContextValue}>
							{options.mode.toUpperCase() === LayoutMode.SPLIT && (
								<div className="widget widget--split">
									<Donations
										monthlyDonation={monthlyDonation}
										setMonthlyDonation={setMonthlyDonation}
									/>
									<div className="right-panel">
										<Company />
										{levelClasses.map((level) => {
											return (
												<div
													key={level.amount}
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
							{options.mode.toUpperCase() === LayoutMode.SINGLE && (
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
};

export default EveryMonth;
