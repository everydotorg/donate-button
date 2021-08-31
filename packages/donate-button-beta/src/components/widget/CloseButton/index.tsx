import cxs from 'cxs';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';

const closeBoxCss = cxs({
	padding: Spacing.Inset_XS,
	cursor: 'pointer'
});

const closeWidgetCss = (color: string) =>
	cxs({
		width: '16px',
		height: '2px',
		background: color,
		transform: 'rotate(45deg)',
		position: 'relative',
		'&:after': {
			content: '""',
			position: 'absolute',
			left: 0,
			background: color,
			width: '16px',
			height: '2px',

			transform: 'rotate(-90deg)'
		}
	});

interface CloseButtonProps {
	positionCss: string;
	color: string;
}

export const CloseButton = ({positionCss, color}: CloseButtonProps) => {
	const {hideWidget} = useWidgetContext();
	const closeWidgetCssColored = closeWidgetCss(color);
	return (
		<div
			className={[closeBoxCss].concat(positionCss).join(' ')}
			onClick={hideWidget}
		>
			<div role="button" className={closeWidgetCssColored} />
		</div>
	);
};
