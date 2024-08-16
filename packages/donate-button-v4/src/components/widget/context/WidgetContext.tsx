import {createContext, FunctionalComponent} from 'preact';
import {StateUpdater, useEffect, useState} from 'preact/hooks';
import {useCheckPaymentRequest} from 'src/components/widget/hooks/useCheckPaymentRequest';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {CryptoCurrency} from 'src/components/widget/types/Crypto';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	PaymentMethod,
	PaymentRequestAvailable
} from 'src/components/widget/types/PaymentMethod';

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

	publicTestimony?: string;
	setPublicTestimony: StateUpdater<string | undefined>;

	giftCardCode?: string;
	setGiftCardCode: StateUpdater<string | undefined>;

	subMethod: 'apple' | 'google';
	setSubMethod: StateUpdater<'apple' | 'google'>;
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
		config.amount ?? config.defaultDonationAmount
	);

	useEffect(() => {
		setDonationAmount(config.amount);
	}, [config.amount]);

	const [submitError, setSubmitError] = useState<string | null>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		config.methods[0]
	);

	useEffect(() => {
		if (!config.methods.includes(selectedPaymentMethod)) {
			setSelectedPaymentMethod(config.methods[0]);
		}
	}, [config.methods, selectedPaymentMethod]);

	const [stockAmount, setStockAmount] = useState<number>();
	const [stockSymbol, setStockSymbol] = useState<string>();

	const [cryptoAmount, setCryptoAmount] = useState<number>();
	const [cryptoCurrency, setCryptoCurrency] = useState<CryptoCurrency>();

	const paymentRequestAvailable = useCheckPaymentRequest();

	const [privateNote, setPrivateNote] = useState<string>();
	const [publicTestimony, setPublicTestimony] = useState<string>();

	const [giftCardCode, setGiftCardCode] = useState<string>();

	const [subMethod, setSubMethod] = useState<'apple' | 'google'>('apple');

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
				setPrivateNote,
				publicTestimony,
				setPublicTestimony,
				giftCardCode,
				setGiftCardCode,
				subMethod,
				setSubMethod
			}}
		>
			{children}
		</WidgetContext.Provider>
	);
};
