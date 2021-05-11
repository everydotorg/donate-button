import cxs from 'cxs';
import {Frequency} from 'src/components/widget/Frequency';
import { NonprofitHeader } from 'src/components/widget/NonprofitHeader';
import { NonprofitInfo } from 'src/components/widget/NonprofitInfo';
import { BREAKPOINTS } from 'src/components/widget/theme/breakpoints.enum';
import {COLORS} from 'src/components/widget/theme/colors.enum';

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
	// Temporary until we have more content inside the widget
	height: '70vh',
	width: '60vw',

	display: 'grid',
	gridTemplateColumns: '60% 40%',
	gridTemplateRows: '1fr max-content max-content',
	background: 'white',
	borderRadius: '24px',
	overflow: 'hidden',

	[`${BREAKPOINTS.Tablet}`]:{
		gridTemplateRows: 'max-content 1fr max-content',
		width: '100vw',
		height: '100vh',
		borderRadius: 'unset'
	}
});

const formCss = cxs({
	gridColumn: '1 / 2',
	gridRow: '1 / 3',
	borderRight: `1px solid ${COLORS.LightGray}`,
	padding: '1.5rem',

	[`${BREAKPOINTS.Tablet}`]: {
		borderRight: 'none'
	}
});

const nonProfitHeaderCss = cxs({
	gridColumn: '2 / 3',
	gridRow: '1 / 2',

	[`${BREAKPOINTS.Tablet}`]: {
		height: '190px',
		gridColumn: '1 / -1',
		gridRow: '1 / 2'
	}
})

const nonProfitInfoCss = cxs({
	gridColumn: '2 / 3',
	gridRow: '2 / 4',
})

const ctaCss = cxs({
	gridColumn: '1 / 2',
	gridRow: '3 / 4',
	[`${BREAKPOINTS.Tablet}`]: {
		gridColumn: '1 / -1',
		gridRow: '3 / 4'
	}
})

const scrollableContent = cxs({
	display:'contents',

	[`${BREAKPOINTS.Tablet}`]: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',
		gridColumn: '1 / -1',
		gridRow: '2 / 3'
	}
})

const Widget = ({show}: {show: boolean}) => {
	return show ? (
		<div className={wrapperCss}>
			<form className={widgetCss}>
				<div className={scrollableContent}>
					<div className={formCss}>
						<Frequency />
					</div>
					<NonprofitInfo classes={[nonProfitInfoCss]} />
				</div>
				<button className={ctaCss}>Donate</button>
				<NonprofitHeader classes={[nonProfitHeaderCss]} />
			</form>
		</div>
	) : null;
};

export default Widget;
