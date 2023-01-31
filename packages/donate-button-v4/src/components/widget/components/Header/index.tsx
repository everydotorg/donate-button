import {CloseButton} from 'src/components/widget/components/Header/CloseButton';
import {containerCss} from 'src/components/widget/components/Header/styles';

export const Header = () => {
	return (
		<div className={containerCss}>
			<CloseButton />
		</div>
	);
};
