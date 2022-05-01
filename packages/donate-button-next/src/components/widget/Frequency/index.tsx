import cxs from 'cxs';
import {StateUpdater, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {FrequencyPopoverContent} from 'src/components/widget/Frequency/FrequencyPopoverContent';
import {Popover} from 'src/components/widget/Popover';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

const frequencyContainerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderRadius: Radii.Default,
	height: '56px',
	padding: Spacing.XXS,
	margin: 0,
	'& > #monthly:not(:checked) + label': {
		'&::before': {
			transform: 'translateX(100%)'
		}
	},
	'& > input:is(:checked) + label': {
		color: 'white'
	}
});

const labelCss = cxs({
	...bodyText,
	color: COLORS.Text,
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	cursor: 'pointer',
	// Transition: 'background .3s, color .3s',
	'& > span': {
		zIndex: 10
	}
});

const selectedBlockCss = (primaryColor: string) =>
	cxs({
		position: 'relative',
		'&::before': {
			content: '""',
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			// Transition: 'transform .3s cubic-bezier(.55,.08,0,1)',
			borderRadius: Radii.Default,
			backgroundColor: primaryColor,
			color: COLORS.White
		}
	});

const inputCss = cxs({
	display: 'none'
});

const popoverAnchorCss = cxs({
	position: 'relative',
	width: '100%'
});

interface FrequencyProps {
	frequency: DonationFrequency;
	setFrequency: StateUpdater<DonationFrequency>;
}

export const Frequency = ({frequency, setFrequency}: FrequencyProps) => {
	const {showFrequencyPopover, dismissPopover} = useWidgetContext();
	const {primaryColor} = useConfigContext();
	const i18n = useI18n();

	const popoverAnchorRef = useRef<HTMLDivElement>(null);

	return (
		<Fragment>
			<div className={frequencyContainerCss}>
				<input
					type="radio"
					name="frequency"
					id="monthly"
					className={inputCss}
					defaultChecked={frequency === DonationFrequency.Monthly}
					value={DonationFrequency.Monthly}
				/>
				<label
					className={[labelCss, selectedBlockCss(primaryColor)].join(' ')}
					id="frequency-monthly"
					htmlFor="monthly"
					onClick={() => {
						if (showFrequencyPopover) dismissPopover();
						setFrequency(DonationFrequency.Monthly);
					}}
				>
					<span>{i18n.monthlyDonation}</span>
				</label>

				<input
					className={inputCss}
					type="radio"
					name="frequency"
					id="one-time"
					defaultChecked={frequency === DonationFrequency.OneTime}
					value={DonationFrequency.OneTime}
				/>
				<label
					id="frequency-one-time"
					className={labelCss}
					htmlFor="one-time"
					onClick={() => {
						if (showFrequencyPopover) dismissPopover();
						setFrequency(DonationFrequency.OneTime);
					}}
				>
					<span>{i18n.oneTimeDonation}</span>
				</label>
			</div>

			<div ref={popoverAnchorRef} className={popoverAnchorCss}>
				{showFrequencyPopover && (
					<Popover ref={popoverAnchorRef}>
						<FrequencyPopoverContent onClose={dismissPopover} />
					</Popover>
				)}
			</div>
		</Fragment>
	);
};
