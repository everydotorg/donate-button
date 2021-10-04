import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Close} from 'src/components/widget/svg/Close';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';

const buttonCss = cxs({
	cursor: 'pointer',
	height: '32px',
	width: '32px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 0,
	border: 'none',
	backgroundColor: COLORS.White,
	borderRadius: Radii.Default
});

const iconCss = cxs({
	height: '100%'
});

interface CloseButtonProps {
	positionCss: string;
}

export const CloseButton = ({positionCss}: CloseButtonProps) => {
	const {primaryColor} = useConfigContext();
	const {hideWidget} = useWidgetContext();

	return (
		<button
			type="button"
			className={[buttonCss, positionCss].join(' ')}
			onClick={hideWidget}
		>
			<Close className={iconCss} size={20} color={primaryColor} />
		</button>
	);
};
