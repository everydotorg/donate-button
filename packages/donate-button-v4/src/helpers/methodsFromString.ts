import {
	AvailablePaymentMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';

export function methodsFromString(string?: string | null) {
	if (!string) {
		return;
	}

	return string
		.split(',')
		.filter((method): method is PaymentMethod =>
			AvailablePaymentMethods.includes(method as PaymentMethod)
		);
}
