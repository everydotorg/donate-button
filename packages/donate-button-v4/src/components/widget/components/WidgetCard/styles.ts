import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const widgetCss = (height: number | null) =>
	css({
		background: 'white',
		width: '100%',
		height: '100%',
		borderRadius: 'unset',
		position: 'relative',
		overflow: 'auto',
		padding: `0`,
		paddingBottom: Spacing.XXL,

		[BREAKPOINTS.TabletLandscapeUp]: {
			height: height ? `${height}px` : 'unset',
			background: '#f3f6f6',
			minHeight: '378px',
			maxHeight: `calc(100vh - 2 * ${Spacing.XL})`,
			width: '1000px',
			overflow: 'unset',
			overflowY: 'scroll',
			/* Hide sc rollbar  */
			'-ms-overflow-style': 'none' /* IE and Edge */,
			scrollbarWidth: 'none' /* Firefox */,
			'::-webkit-scrollbar': {
				display: 'none'
			},
			borderRadius: Radii.Medium,
			padding: Spacing.XL
		}
	});
