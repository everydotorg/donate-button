import {Stripe, loadStripe} from '@stripe/stripe-js';
import {useState, useCallback, useEffect} from 'preact/hooks';
import {PaymentRequestAvailable} from 'src/components/widget/types/PaymentMethod';
import {STRIPE_API_VERSION, STRIPE_PUBLIC_KEY} from 'src/constants/stripe';

declare global {
	interface Window {
		ApplePaySession: any;
	}
}

function useStripe() {
	const [stripePromise, setStripe] = useState<Stripe | null>(null);
	useEffect(() => {
		(async () => {
			try {
				const stripe = await loadStripe(STRIPE_PUBLIC_KEY, {
					apiVersion: STRIPE_API_VERSION
				});

				setStripe(stripe);
			} catch {
				// do nothing
			}
		})();
	}, []);
	return stripePromise;
}

export function useCheckPaymentRequest(): PaymentRequestAvailable {
	const stripe = useStripe();

	const [canMakePayment, setCanMakePayment] = useState<boolean>(false);

	const initializePaymentRequest = useCallback(async (stripe: Stripe) => {
		const pr = stripe?.paymentRequest({
			country: 'US',
			currency: 'usd',
			total: {label: 'test', amount: 0},
			requestPayerName: false,
			requestPayerEmail: false
		});
		const canMakePayment = Boolean(await pr?.canMakePayment());
		setCanMakePayment(canMakePayment);
	}, []);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		void initializePaymentRequest(stripe);
	}, [initializePaymentRequest, stripe]);

	const isApplePay = Boolean(window.ApplePaySession);

	return {googlePay: canMakePayment, applePay: canMakePayment && isApplePay};
}
