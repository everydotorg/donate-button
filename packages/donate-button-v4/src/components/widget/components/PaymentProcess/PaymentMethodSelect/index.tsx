import {useMemo} from 'preact/hooks';
import {IconForPaymentMethod} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect/IconForPaymentMethod';
import {NameForPaymentMethod} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect/NameForPaymentMethod';
import {
	largePaymentMethodSelectListCss,
	largePaymentMethodButtonCss,
	smallPaymentMethodFieldSetCss,
	smallPaymentMethodSelectListCss,
	smallPaymentMethodButtonCss
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect/styles';
import {legendCss} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {
	OneTimeFrequencyMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';

const usePaymentMethods = () => {
	const {methods, lockMonthlyFrequency} = useConfigContext();
	const {paymentRequestAvailable} = useWidgetContext();

	const filteredMethods = useMemo(
		() =>
			methods.filter((method) => {
				if (lockMonthlyFrequency && OneTimeFrequencyMethods.includes(method)) {
					return false;
				}

				if (method === PaymentMethod.PAYMENT_REQUEST) {
					return (
						paymentRequestAvailable.applePay ||
						paymentRequestAvailable.googlePay
					);
				}

				return true;
			}),
		[methods, lockMonthlyFrequency, paymentRequestAvailable]
	);

	return filteredMethods;
};

export const LargePaymentMethodSelect = () => {
	const methods = usePaymentMethods();
	const {selectedPaymentMethod, setSelectedPaymentMethod} = useWidgetContext();

	return (
		<ul className={largePaymentMethodSelectListCss}>
			{methods.map((method) => (
				<li key={method}>
					<button
						type="button"
						className={largePaymentMethodButtonCss(
							method === selectedPaymentMethod
						)}
						onClick={() => {
							setSelectedPaymentMethod(method);
						}}
					>
						<IconForPaymentMethod method={method} />
						<NameForPaymentMethod method={method} />
					</button>
				</li>
			))}
		</ul>
	);
};

export const SmallPaymentMethodSelect = () => {
	const methods = usePaymentMethods();
	const {primaryColor} = useConfigContext();
	const {selectedPaymentMethod, setSelectedPaymentMethod} = useWidgetContext();

	return (
		<fieldset className={smallPaymentMethodFieldSetCss}>
			<legend className={legendCss}>Payment method</legend>
			<ul className={smallPaymentMethodSelectListCss}>
				{methods.map((method) => (
					<li key={method}>
						<button
							type="button"
							className={smallPaymentMethodButtonCss(
								method === selectedPaymentMethod,
								primaryColor
							)}
							onClick={() => {
								setSelectedPaymentMethod(method);
							}}
						>
							<IconForPaymentMethod method={method} />
							<NameForPaymentMethod method={method} />
						</button>
					</li>
				))}
			</ul>
		</fieldset>
	);
};
