import {PaymentMethod} from 'src/components/widget/types/payment-method';

export interface DonationRecipient {
	id: string;
	name: string;
	// ISO Alpha-2 code
	countryCode: string;
	nameAndRegistration: string;
	// Not sure if this props will be present
	description?: string;
	paymentMethods: PaymentMethod[];
}
