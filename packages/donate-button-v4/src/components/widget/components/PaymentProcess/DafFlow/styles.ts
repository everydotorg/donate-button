import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

const CAHRIOT_GREEN = '#ADEFD1';
const CAHRIOT_DARK_GREEN = '#7ce6b6';
const CHARIOT_DARK_BLUE = '#00203F';

export const chariotButtonCss = css({
	outline: 'none',
	border: 'none',
	fontFamily: 'inherit',
	background: CAHRIOT_GREEN,
	color: CHARIOT_DARK_BLUE,
	alignSelf: 'center',
	borderRadius: Radii.Big,
	padding: `${Spacing.M} ${Spacing.XL}`,
	display: 'flex',
	alignItems: 'center',
	fontWeight: 500,
	...textSize.s,
	gap: Spacing.XS,
	cursor: 'pointer',
	':hover': {
		background: CAHRIOT_DARK_GREEN
	}
});

export const manualButtonCss = (primaryColor: string) =>
	css({
		outline: 'none',
		border: 'none',
		background: 'none',
		fontFamily: 'inherit',
		color: primaryColor,
		alignSelf: 'center',
		display: 'flex',
		alignItems: 'center',
		fontWeight: 500,
		...textSize.s,
		gap: Spacing.XS,
		cursor: 'pointer',
		':hover': {
			opacity: 0.9
		}
	});
