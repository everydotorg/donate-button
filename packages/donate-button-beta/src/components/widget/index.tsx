import cxs from 'cxs';
import {useState} from 'preact/hooks';
import {FormControl} from 'src/components/widget/FormControl';
import {Frequency} from 'src/components/widget/Frequency';
import {Input} from 'src/components/widget/Input';
import {NonprofitHeader} from 'src/components/widget/NonprofitHeader';
import {NonprofitInfo} from 'src/components/widget/NonprofitInfo';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints.enum';
import {COLORS} from 'src/components/widget/theme/colors.enum';
import {Currency} from 'src/components/widget/types/currency';

cxs.prefix('edoWidget-');

const wrapperCss = cxs({
	position: 'absolute',
	height: '100vh',
	width: '100vw',
	zIndex: 999,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	display: 'flex',
	background: 'rgba(0, 0, 0, 0.5)',
	justifyContent: 'center',
	alignItems: 'center',
	fontFamily: `Basis Grotesque Pro, -apple-system, BlinkMacSystemFont,
    Segoe UI, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Roboto,
    sans-serif`
});

const widgetCss = cxs({
	background: 'white',
	overflow: 'hidden',

	display: 'grid',
	gridTemplateRows: 'max-content 1fr max-content',
	width: '100vw',
	height: '100vh',
	borderRadius: 'unset',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		// Temporary until we have more content inside the widget
		gridTemplateColumns: '60% 40%',
		gridTemplateRows: '1fr max-content max-content',
		height: '70vh',
		width: '60vw',
		borderRadius: '24px'
	}
});

const formCss = cxs({
	gridColumn: '1 / 2',
	gridRow: '1 / 3',
	padding: '1.5rem',
	borderRight: 'none',

	display: 'grid',
	gridTemplateColumns: '1fr',
	gridAutoRows: 'max-content',
	rowGap: '2rem',
	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		borderRight: `1px solid ${COLORS.LightGray}`
	}
});

const nonProfitHeaderCss = cxs({
	height: '190px',
	gridColumn: '1 / -1',
	gridRow: '1 / 2',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		height: 'auto',
		gridColumn: '2 / 3',
		gridRow: '1 / 2'
	}
});

const nonProfitInfoCss = cxs({
	gridColumn: '2 / 3',
	gridRow: '2 / 4'
});

const ctaCss = cxs({
	gridColumn: '1 / -1',
	gridRow: '3 / 4',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		gridColumn: '1 / 2',
		gridRow: '3 / 4'
	}
});

const scrollableContent = cxs({
	display: 'flex',
	flexDirection: 'column',
	overflow: 'auto',
	gridColumn: '1 / -1',
	gridRow: '2 / 3',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		display: 'contents',
		overflow: 'initial'
	}
});

const Widget = ({show}: {show: boolean}) => {
	const [donationAmount, setDonationAmount] = useState<number>(100);
	const [currency, setCurrency] = useState<Currency>('GBP');

	return show ? (
		<div className={wrapperCss}>
			<form className={widgetCss}>
				<div className={scrollableContent}>
					<div className={formCss}>
						<FormControl label="Frequency">
							<Frequency />
						</FormControl>
						<FormControl label="Amount">
							<Input
								selectedCurrency={currency}
								setCurrency={setCurrency}
								value={donationAmount}
								setValue={setDonationAmount}
							/>
						</FormControl>
					</div>
					<NonprofitInfo classes={[nonProfitInfoCss]} />
				</div>
				<button className={ctaCss} type="submit">
					Donate
				</button>
				<NonprofitHeader classes={[nonProfitHeaderCss]} />
			</form>
		</div>
	) : null;
};

export default Widget;
