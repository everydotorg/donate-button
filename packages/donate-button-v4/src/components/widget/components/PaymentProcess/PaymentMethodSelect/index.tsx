import React from 'preact/compat';
import {useMemo, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
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
import {AppleIcon} from 'src/components/widget/icons/AppleIcon';
import {GoogleIcon} from 'src/components/widget/icons/GoogleIcon';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	OneTimeFrequencyMethods,
	PaymentMethod,
	PaymentMethodsOrder
} from 'src/components/widget/types/PaymentMethod';
import css from 'src/helpers/css';
interface PaymentMethodButtonProps {
	onClick: () => void;
	small?: boolean;
	selected: boolean;
	icon: React.ReactNode;
	label: React.ReactNode | string;
}
interface PaymentMethodListItemProps {
	method: PaymentMethod;
	small?: boolean;
}

const usePaymentMethods = () => {
	const {methods, frequency: fixedFrequency, previewMode} = useConfigContext();
	const {paymentRequestAvailable} = useWidgetContext();

	const filteredMethods = useMemo(
		() =>
			methods
				.filter((method) => {
					if (previewMode) {
						return true;
					}

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
		[methods, fixedFrequency, paymentRequestAvailable, previewMode]
	);

	return filteredMethods;
};

const PaymentMethodButton = (props: PaymentMethodButtonProps) => {
	const {primaryColor} = useConfigContext();
	const getClassName = props.small
		? smallPaymentMethodButtonCss
		: largePaymentMethodButtonCss;

	return (
		<button
			type="button"
			className={getClassName(props.selected, primaryColor)}
			onClick={props.onClick}
		>
			{props.icon}
			{typeof props.label === 'string' ? (
				<span className={css({...textSize.s})}>{props.label}</span>
			) : (
				props.label
			)}
		</button>
	);
};

const AppleAndGooglePayListItem = () => {
	const {
		selectedPaymentMethod,
		setSelectedPaymentMethod,
		subMethod,
		setSubMethod
	} = useWidgetContext();

	return (
		<Fragment>
			<li>
				<PaymentMethodButton
					selected={
						selectedPaymentMethod === PaymentMethod.PAYMENT_REQUEST &&
						subMethod === 'apple'
					}
					icon={<AppleIcon />}
					label="Apple Pay"
					onClick={() => {
						setSelectedPaymentMethod(PaymentMethod.PAYMENT_REQUEST);
						setSubMethod('apple');
					}}
				/>
			</li>
			<li>
				<PaymentMethodButton
					selected={
						selectedPaymentMethod === PaymentMethod.PAYMENT_REQUEST &&
						subMethod === 'google'
					}
					icon={<GoogleIcon />}
					label="Google Pay"
					onClick={() => {
						setSelectedPaymentMethod(PaymentMethod.PAYMENT_REQUEST);
						setSubMethod('google');
					}}
				/>
			</li>
		</Fragment>
	);
};

const PaymentMethodListItem = (props: PaymentMethodListItemProps) => {
	const {selectedPaymentMethod, setSelectedPaymentMethod} = useWidgetContext();
	const {previewMode} = useConfigContext();
	if (previewMode && props.method === PaymentMethod.PAYMENT_REQUEST) {
		return <AppleAndGooglePayListItem />;
	}

	return (
		<li>
			<PaymentMethodButton
				small={props.small}
				selected={props.method === selectedPaymentMethod}
				icon={<IconForPaymentMethod method={props.method} />}
				label={<NameForPaymentMethod method={props.method} />}
				onClick={() => {
					setSelectedPaymentMethod(props.method);
				}}
			/>
		</li>
	);
};

export const LargePaymentMethodSelect = () => {
	const methods = usePaymentMethods();

	if (methods.length === 1) {
		return null;
	}

	return (
		<ul className={largePaymentMethodSelectListCss}>
			{methods.map((method) => (
				<PaymentMethodListItem key={method} method={method} />
			))}
		</ul>
	);
};

export const SmallPaymentMethodSelect = () => {
	const methods = usePaymentMethods();

	if (methods.length === 1) {
		return null;
	}

	return (
		<fieldset className={smallPaymentMethodFieldSetCss}>
			<legend className={legendCss}>Payment method</legend>
			<ul className={smallPaymentMethodSelectListCss}>
				{methods.map((method) => (
					<PaymentMethodListItem key={method} small method={method} />
				))}
			</ul>
		</fieldset>
	);
};
