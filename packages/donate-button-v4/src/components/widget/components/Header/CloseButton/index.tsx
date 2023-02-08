import {
	buttonCss,
	iconCss,
	textCss
} from 'src/components/widget/components/Header/CloseButton/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {CloseIcon} from 'src/components/widget/icons/CloseIcon';

export const CloseButton = () => {
	const {primaryColor} = useConfigContext();
	const {hideWidget} = useWidgetContext();

	return (
		<button type="button" className={buttonCss} onClick={hideWidget}>
			<CloseIcon className={iconCss} size={24} color={primaryColor} />
			<span className={textCss(primaryColor)}>Cancel</span>
		</button>
	);
};
