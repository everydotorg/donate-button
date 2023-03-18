import cxs from 'cxs';

export const inputLabelCss = (primaryColor: string) =>
	cxs({
		position: 'relative',
		cursor: 'pointer',
		display: 'flex',
		width: '100%',
		height: '36px',
		alignItems: 'center',
		justifyContent: 'center',
		color: primaryColor,
		fontWeight: 500,
		border: `2px solid ${primaryColor}`,
		borderRight: 'none'
	});

export const inputItemCss = (primaryColor: string) =>
	cxs({
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 0px',

		'& > input': {
			appearance: 'none',
			height: 0
		},

		'& > input:checked + label': {
			backgroundColor: primaryColor,
			color: 'white'
		},

		'& > input:checked + label:hover': {
			backgroundColor: primaryColor,
			color: 'white'
		}
	});

export const inputContainerCss = (primaryColor: string) =>
	cxs({
		display: 'flex',
		width: '100%',

		'& > div:first-of-type > label': {
			borderRadius: '6px 0 0 6px',
			'&::after': {
				borderRadius: '6px 0 0 6px'
			}
		},

		'& > div:last-of-type > label': {
			borderRadius: '0 6px 6px 0',
			borderRight: `2px solid ${primaryColor}`,
			'&::after': {
				borderRadius: '0 6px 6px 0'
			}
		}
	});
