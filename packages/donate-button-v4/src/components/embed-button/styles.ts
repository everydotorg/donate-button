import cxs from 'cxs';
import {FontFamily} from 'src/components/widget/theme/font-family';

cxs.prefix('every-embedded-');

export const buttonCss = cxs({
	display: 'flex',
	alignItems: 'center',
	width: 'max-content',
	border: 'none',
	outline: 'none',
	fontFamily: FontFamily.BasisGrotesque,
	fontWeight: 500,
	lineHeight: 1,
	cursor: 'pointer',
	textDecoration: 'none',
	backfaceVisibility: 'hidden',
	transition: 'background-color 0.25s',

	padding: '12px 20px',
	color: '#fff',
	backgroundColor: '#00a380',
	borderRadius: '100px',
	fontSize: '16px',
	'&:hover': {backgroundColor: '#2F806D'}
});

export const logoCss = cxs({
	width: '16px',
	height: '16px',
	fill: '#fff',
	marginRight: '8px'
});

export const verticalCenterTextCss = cxs({
	transform: 'translateY(0.08em)'
});
