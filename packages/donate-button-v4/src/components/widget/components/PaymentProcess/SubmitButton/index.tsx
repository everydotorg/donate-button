import {ComponentChildren} from 'preact';
import {
	btnCss,
	btnDisabledCss,
	btnActiveColor,
	btnPreviewCss
} from 'src/components/widget/components/PaymentProcess/SubmitButton/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';
import joinClassNames from 'src/helpers/joinClassNames';

interface ButtonProps {
	handleClick?: () => void;
	children: ComponentChildren;
	disabled?: boolean;
}

export const SubmitButton = ({
	handleClick,
	disabled,
	children
}: ButtonProps) => {
	const {primaryColor, previewMode} = useConfigContext();

	if (previewMode) {
		return <PreviewSubmitButton disabled={disabled} />;
	}

	return (
		<button
			type="submit"
			className={joinClassNames([
				btnCss,
				disabled ? btnDisabledCss : btnActiveColor(primaryColor)
			])}
			disabled={disabled}
			onClick={handleClick}
		>
			<span>{children}</span>
		</button>
	);
};

export const PreviewSubmitButton = ({
	disabled
}: Pick<ButtonProps, 'disabled'>) => {
	const {primaryColor} = useConfigContext();
	const {selectedPaymentMethod, subMethod} = useWidgetContext();

	return (
		<button
			type="button"
			className={joinClassNames([
				btnCss,
				btnPreviewCss,
				disabled ? btnDisabledCss : btnActiveColor(primaryColor)
			])}
			disabled={disabled}
		>
			<span>
				{getSubmitButtonText({
					method: selectedPaymentMethod,
					paymentRequestIsApplePay: subMethod === 'apple'
				})}
			</span>
		</button>
	);
};
