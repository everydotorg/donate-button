import cxs from 'cxs';
import {StateUpdater, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {COLORS} from 'src/components/widget/theme/colors.enum';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

const frequencyContainerCss = cxs({
	display: 'flex'
});

const labelCss = cxs({
	color: COLORS.Primary,
	fontSize: '1rem',
	lineHeight: 1.5,
	fontWeight: 400,
	letterSpacing: '-0.01em',
	padding: '8px 0px',
	flex: 1,
	textAlign: 'center',
	border: '1px solid',
	borderColor: COLORS.LightGray,
	transition: 'all .2s'
});

const labelSelectedCss = cxs({
	borderColor: COLORS.Primary
});

const separatorBorderSelectedCss = cxs({
	borderRightColor: COLORS.Primary
});

const labelLeftCss = cxs({
	borderRadius: '0.5rem 0 0 0.5rem'
});

const labelRightCss = cxs({
	borderRadius: '0 0.5rem 0.5rem 0',
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
	const labelSeparatorClass =
		frequency === 'monthly' || frequency === 'one-time'
			? [separatorBorderSelectedCss]
			: [];
	const leftLabelClasses = [labelCss, labelLeftCss].concat(
		frequency === 'monthly' ? [labelSelectedCss] : []
	);
	const rightLabelClasses = [labelCss, labelRightCss].concat(
		frequency === 'one-time' ? [labelSelectedCss] : []
	);

	return (
		<div className={frequencyContainerCss}>
			<label
				className={leftLabelClasses.concat(labelSeparatorClass).join(' ')}
				htmlFor="monthly"
				onClick={() => {
					setFrequency('monthly');
				}}
			>
				<input
					className={inputCss}
					type="radio"
					name="frequency"
					value="monthly"
				/>
				Monthly
			</label>
			<label
				className={rightLabelClasses.join(' ')}
				htmlFor="one-time"
				onClick={() => {
					setFrequency('one-time');
				}}
			>
				<input
					className={inputCss}
					type="radio"
					name="frequency"
					value="one-time"
				/>
				One-time
			</label>
		</div>
	);
};
