import {buttonCss} from 'src/components/widget/components/Header/CloseButton/styles';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {CloseIcon} from 'src/components/widget/icons/CloseIcon';
import joinClassNames from 'src/helpers/joinClassNames';

export const CloseButton = ({className}: {className?: string}) => {
	const {hideWidget} = useWidgetContext();
	return (
		<button
			type="button"
			className={joinClassNames([buttonCss, className])}
			onClick={hideWidget}
		>
			<CloseIcon />
		</button>
	);
};
