import {backButtonCss} from 'src/components/widget/components/PaymentProcess/BackButton/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {ArrowBackIcon} from 'src/components/widget/icons/ArrowBackIcon';

export const BackButton = ({handleClick}: {handleClick?: () => void}) => {
	const {primaryColor} = useConfigContext();

	return (
		<button
			type="button"
			className={backButtonCss(primaryColor)}
			onClick={handleClick}
		>
			<ArrowBackIcon />
			<span>Back</span>
		</button>
	);
};
