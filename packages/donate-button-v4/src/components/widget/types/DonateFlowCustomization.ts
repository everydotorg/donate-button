import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export type RequirementLevel = 'required' | 'optional' | null;

export enum CustomFieldType {
	TEXT_AREA = 'textArea',
	DROPDOWN = 'dropdown'
}

export interface CustomField {
	type: CustomFieldType;
	heading: string;
	required: boolean;
	placeholder?: string;
	options?: string[];
}

export interface DonateFlowCustomization {
	paymentMethods?: PaymentMethod[];
	address?: RequirementLevel;
	fields?: CustomField[];
	themeColor?: string;
	designation?: string;
	donorContactInfo?: RequirementLevel;
	fixedAmount?: number;
	frequency?: DonationFrequency;
	minAmount?: number;
	suggestedAmounts?: number[];
}

export const DonateFlowCustomizationFetchError = Symbol(
	'DonateFlowCustomizationFetchError'
);
export const DonateFlowCustomizationFetching = Symbol(
	'DonateFlowCustomizationFetching'
);
