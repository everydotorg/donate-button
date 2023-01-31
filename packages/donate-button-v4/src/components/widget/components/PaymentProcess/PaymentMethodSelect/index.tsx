import {useCallback} from 'preact/hooks';
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
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import constructEveryUrl from 'src/helpers/constructEveryUrl';

const InstantRedirectPaymentMethods = new Set([
	PaymentMethod.CRYPTO,
	PaymentMethod.STOCKS,
	PaymentMethod.DAF
]);

const useOnSelectPaymentMethod = () => {
	const {nonprofitSlug, completeDonationInNewTab} = useConfigContext();
	const {setSelectedPaymentMethod} = useWidgetContext();

	const onSelectPaymentMethod = useCallback(
		(method: PaymentMethod) => {
			if (InstantRedirectPaymentMethods.has(method)) {
				window.open(
					constructEveryUrl({
						nonprofitSlug,
						method
					}),
					completeDonationInNewTab ? '_blank' : '_self'
				);
			} else {
				setSelectedPaymentMethod(method);
			}
		},
		[nonprofitSlug, completeDonationInNewTab, setSelectedPaymentMethod]
	);

	return onSelectPaymentMethod;
};

export const LargePaymentMethodSelect = () => {
	const {methods} = useConfigContext();
	const {selectedPaymentMethod} = useWidgetContext();
	const onSelectPaymentMethod = useOnSelectPaymentMethod();

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
							onSelectPaymentMethod(method);
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
	const {methods, primaryColor} = useConfigContext();
	const {selectedPaymentMethod} = useWidgetContext();
	const onSelectPaymentMethod = useOnSelectPaymentMethod();

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
								onSelectPaymentMethod(method);
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
