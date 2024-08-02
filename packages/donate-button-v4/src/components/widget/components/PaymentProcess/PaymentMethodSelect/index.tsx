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
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	OneTimeFrequencyMethods,
	PaymentMethod,
	PaymentMethodsOrder
} from 'src/components/widget/types/PaymentMethod';

const usePaymentMethods = () => {
	const {methods, frequency: fixedFrequency} = useConfigContext();
	const {paymentRequestAvailable} = useWidgetContext();

	const filteredMethods = useMemo(
		() =>
			methods
				.filter((method) => {
					if (
						fixedFrequency === DonationFrequency.Monthly &&
						OneTimeFrequencyMethods.includes(method)
					) {
						return false;
					}

					if (method === PaymentMethod.PAYMENT_REQUEST) {
						return (
							paymentRequestAvailable.applePay ||
							paymentRequestAvailable.googlePay
						);
					}

					return true;
				})
				.sort(
					(a, b) =>
						PaymentMethodsOrder.indexOf(a) - PaymentMethodsOrder.indexOf(b)
				),
		[methods, fixedFrequency, paymentRequestAvailable]
	);

	return filteredMethods;
};

export const LargePaymentMethodSelect = () => {
	const methods = usePaymentMethods();
	const {selectedPaymentMethod, setSelectedPaymentMethod} = useWidgetContext();

	if (methods.length === 1) {
		return null;
	}

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

	if (methods.length === 1) {
		return null;
	}

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
