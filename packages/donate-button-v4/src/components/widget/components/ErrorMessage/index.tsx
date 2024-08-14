import {CloseIcon} from 'src/components/widget/icons/CloseIcon';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

const errorMessageCss = css({
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XXS,
	color: 'rgba(196, 83, 48, 1)',
	'& > svg > path': {
		stroke: 'rgba(196, 83, 48, 1)'
	}
});

export const ErrorMessage = ({message}: {message?: string | null}) => {
	if (!message) {
		return null;
	}

	return (
		<div className={errorMessageCss}>
			<CloseIcon />
			<span>{message}</span>
		</div>
	);
};
