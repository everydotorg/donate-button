export interface PaymentRequestAvailable {
	googlePay: boolean;
	applePay: boolean;
}

const testRequestDetails = {
	total: {label: 'Test Purchase', amount: {currency: 'USD', value: '1.00'}}
};

async function makeRequest(supportedMethods: string): Promise<boolean> {
	const request = new PaymentRequest([{supportedMethods}], testRequestDetails);
	return request.canMakePayment();
}

export async function checkPaymentRequest(): Promise<PaymentRequestAvailable> {
	try {
		const [googlePay, applePay] = await Promise.all([
			makeRequest('https://google.com/pay'),
			makeRequest('https://apple.com/apple-pay')
		]);

		return {googlePay, applePay};
	} catch (error: unknown) {
		return {googlePay: false, applePay: false};
	}
}
