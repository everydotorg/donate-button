import cxs from 'cxs';
import {Ref} from 'preact';
import {forwardRef} from 'preact/compat';
import {Popover} from 'src/components/widget/Popover';
import {COLORS} from 'src/components/widget/theme/colors.enum';

const containerCss = cxs({
	padding: '1rem'
});

const bodyCss = cxs({
	fontSize: '1rem',
	lineHeight: 1.5,
	letterSpacing: '-0.01em',
	color: COLORS.Text,
	fontWeight: 'normal',
	margin: '0 0 1rem 0'
});

const actionsCss = cxs({
	display: 'flex'
});

const buttonPrimaryCss = cxs({
	color: 'white',
	background: COLORS.Primary,
	padding: '0.5rem 1rem',
	borderRadius: '100px',
	border: '1px solid transparent',
	marginRight: '0.75rem',
	cursor: 'pointer'
});

const buttonSecondaryCss = cxs({
	color: COLORS.Primary,
	background: '#fff',
	padding: '0.5rem 1rem',
	borderRadius: '100px',
	border: `1px solid ${COLORS.LightGray}`,
	cursor: 'pointer'
});

export const CurrencySuggestion = forwardRef(
	(_props, ref: Ref<HTMLDivElement>) => {
		return (
			<Popover ref={ref} arrowPosition="85%">
				<div className={containerCss}>
					<p className={bodyCss}>
						It’s recommended to donate <strong>USD</strong> if you are getting a
						US tax receipt, would you like to switch from{' '}
						<strong>160 GBP</strong> to <strong>160 USD</strong>
					</p>
					<div className={actionsCss}>
						<button type="button" className={buttonPrimaryCss}>
							Change to USD
						</button>
						<button type="button" className={buttonSecondaryCss}>
							No thanks
						</button>
					</div>
				</div>
			</Popover>
		);
	}
);
