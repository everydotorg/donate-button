import {createContext, FunctionalComponent} from 'preact';
import {StateUpdater, useEffect, useState} from 'preact/hooks';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {CryptoCurrency} from 'src/components/widget/types/Crypto';
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

	stockAmount?: number;
	setStockAmount: StateUpdater<number | undefined>;

	stockSymbol?: string;
	setStockSymbol: StateUpdater<string | undefined>;

	cryptoAmount?: number;
	setCryptoAmount: StateUpdater<number | undefined>;

	cryptoCurrency?: CryptoCurrency;
	setCryptoCurrency: StateUpdater<CryptoCurrency | undefined>;

	paymentRequestAvailable: PaymentRequestAvailable;
	hideWidget: () => void;

	privateNote?: string;
	setPrivateNote: StateUpdater<string | undefined>;
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

	const [stockAmount, setStockAmount] = useState<number>();
	const [stockSymbol, setStockSymbol] = useState<string>();

	const [cryptoAmount, setCryptoAmount] = useState<number>();
	const [cryptoCurrency, setCryptoCurrency] = useState<CryptoCurrency>();

	const [paymentRequestAvailable, setPaymentRequestAvailable] =
		useState<PaymentRequestAvailable>({
			googlePay: false,
			applePay: false
		});

	const [privateNote, setPrivateNote] = useState<string>();

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
				stockAmount,
				setStockAmount,
				stockSymbol,
				setStockSymbol,
				cryptoAmount,
				setCryptoAmount,
				cryptoCurrency,
				setCryptoCurrency,
				paymentRequestAvailable,
				privateNote,
				setPrivateNote
			}}
		>
			{children}
		</WidgetContext.Provider>
	);
};
