import {CloseButton} from 'src/components/widget/components/Header/CloseButton';
import {smallScreenCloseButtonCss} from 'src/components/widget/components/Header/CloseButton/styles';
import {containerCss} from 'src/components/widget/components/Header/styles';

export const Header = () => {
	return (
		<div className={containerCss}>
			<CloseButton className={smallScreenCloseButtonCss} />
		</div>
	);
};
