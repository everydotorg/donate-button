import cxs from 'cxs';
import {Frequency} from 'src/components/widget/Frequency';
import {COLORS} from 'src/components/widget/theme/colors.enum';

cxs.prefix('edoWidget-');

const wrapperCss = cxs({
	position: 'absolute',
	height: '100vh',
	width: '100vh',
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
	background: 'white',
	borderRadius: '24px'
});

const formCss = cxs({
	gridColumn: '1 / 2',
	borderRight: `1px solid ${COLORS.LightGray}`,
	padding: '1.5rem'
});

const Widget = ({show}: {show: boolean}) => {
	return show ? (
		<div className={wrapperCss}>
			<form className={widgetCss}>
				<div className={formCss}>
					<Frequency />
				</div>
				<div>WIP</div>
			</form>
		</div>
	) : null;
};

export default Widget;
