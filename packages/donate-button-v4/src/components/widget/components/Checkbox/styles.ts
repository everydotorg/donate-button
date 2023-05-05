import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';

/* Hide checkbox visually but remain accessible to screen readers.
  Source: https://polished.js.org/docs/#hidevisually */
export const hiddenCheckboxCss = cxs({
	border: 0,
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute',
	whiteSpace: 'nowrap',
	width: '1px'
});

export const checkboxCss = ({
	checked,
	primaryColor
}: {
	checked?: boolean;
	primaryColor: string;
}) =>
	cxs({
		cursor: 'pointer',
		width: '24px',
		minWidth: '24px',
		height: '24px',
		display: 'flex',
		borderRadius: '4px',
		justifyContent: 'center',
		alignItems: 'center',
		border: `1.5px solid ${checked ? primaryColor : COLORS.DarkGray}`,
		...(checked ? {background: primaryColor} : {})
	});

export const checkMarkIconCss = cxs({
	width: '16px',
	height: '16px',
	'& > path': {
		stroke: 'white',
		strokeWidth: '2px'
	}
});

export const checkboxLabelTextCss = cxs({
	cursor: 'pointer'
});

export const checkboxLabelContainerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XS
});
