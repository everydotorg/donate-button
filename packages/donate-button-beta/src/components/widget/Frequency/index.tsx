import cxs from 'cxs';
import {StateUpdater, useRef, useState} from 'preact/hooks';
import {FrequencyPopoverContent} from 'src/components/widget/Frequency/blocks/FrequencyPopoverContent';
import {Popover} from 'src/components/widget/Popover';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

const frequencyContainerCss = cxs({
	display: 'flex'
});

const labelCss = cxs({
	...labelText,
	color: COLORS.Primary,
	fontWeight: 400,
	padding: `${Spacing.XS} ${Spacing.Empty}`,
	flex: 1,
	textAlign: 'center',
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	transition: 'border .2s'
});

const labelSelectedCss = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.Primary)
});

const separatorBorderSelectedCss = cxs({
	borderRightColor: COLORS.Primary
});

const labelLeftCss = cxs({
	borderRadius: '8px 0 0 8px'
});

const labelRightCss = cxs({
	borderRadius: '0 8px 8px 0',
	borderLeft: 'none'
});

const inputCss = cxs({
	display: 'none'
});

interface FrequencyProps {
	frequency: DonationFrequency;
	setFrequency: StateUpdater<DonationFrequency>;
}
export const Frequency = ({frequency, setFrequency}: FrequencyProps) => {
	const {showFrequencyPopover, dismissPopover} = useWidgetContext();
	const frequencyPopover = useRef<HTMLDivElement>(null);

	const labelSeparatorClass =
		frequency === DonationFrequency.Monthly ||
		frequency === DonationFrequency.OneTime
			? [separatorBorderSelectedCss]
			: [];
	const leftLabelClasses = [labelCss, labelLeftCss].concat(
		frequency === DonationFrequency.Monthly ? [labelSelectedCss] : []
	);
	const rightLabelClasses = [labelCss, labelRightCss].concat(
		frequency === DonationFrequency.OneTime ? [labelSelectedCss] : []
	);

	return (
		<div ref={frequencyPopover} className={frequencyContainerCss}>
			<label
				className={leftLabelClasses.concat(labelSeparatorClass).join(' ')}
				htmlFor="monthly"
				onClick={() => {
					setFrequency(DonationFrequency.Monthly);
				}}
			>
				<input
					className={inputCss}
					type="radio"
					name="frequency"
					value={DonationFrequency.Monthly}
				/>
				Monthly
			</label>
			<label
				className={rightLabelClasses.join(' ')}
				htmlFor="one-time"
				onClick={() => {
					setFrequency(DonationFrequency.OneTime);
				}}
			>
				<input
					className={inputCss}
					type="radio"
					name="frequency"
					value={DonationFrequency.OneTime}
				/>
				One-time
			</label>
			{showFrequencyPopover ? (
				<Popover ref={frequencyPopover}>
					<FrequencyPopoverContent
						nonprofitSlug="test"
						onClose={dismissPopover}
					/>
				</Popover>
			) : null}
		</div>
	);
};
