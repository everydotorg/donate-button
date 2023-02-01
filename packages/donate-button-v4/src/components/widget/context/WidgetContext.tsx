import {createContext, FunctionalComponent} from 'preact';
import {StateUpdater, useEffect, useState} from 'preact/hooks';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {
	checkPaymentRequest,
	PaymentRequestAvailable
} from 'src/helpers/checkPaymentRequest';

interface WidgetContextProps {
	frequency: DonationFrequency;
	setFrequency: StateUpdater<DonationFrequency>;
	donationAmount?: number;
	setDonationAmount: StateUpdater<number | undefined>;
	submitError: string | null;
	setSubmitError: StateUpdater<string | null>;
	selectedPaymentMethod: PaymentMethod;
	setSelectedPaymentMethod: StateUpdater<PaymentMethod>;
	paymentRequestAvailable: PaymentRequestAvailable;
	hideWidget: () => void;
}

export const WidgetContext = createContext<WidgetContextProps>(
	{} as WidgetContextProps
);

export const WidgetContextProvider: FunctionalComponent<{hide: () => void}> = ({
	children,
	hide
}) => {
	const config = useConfigContext();

	const [frequency, setFrequency] = useState(config.defaultFrequency);
	const [donationAmount, setDonationAmount] = useState(
		config.defaultDonationAmount
	);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		config.methods[0]
	);

	const [paymentRequestAvailable, setPaymentRequestAvailable] =
		useState<PaymentRequestAvailable>({
			googlePay: false,
			applePay: false
		});

	useEffect(() => {
		const check = async () => {
			const response = await checkPaymentRequest();
			setPaymentRequestAvailable(response);
		};

		void check();
	}, []);

	return (
		<WidgetContext.Provider
			value={{
				frequency,
				setFrequency,
				donationAmount,
				setDonationAmount,
				hideWidget: hide,
				submitError,
				setSubmitError,
				selectedPaymentMethod,
				setSelectedPaymentMethod,
				paymentRequestAvailable
			}}
		>
			{children}
		</WidgetContext.Provider>
	);
};
