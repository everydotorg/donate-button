import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	AvailablePaymentMethods,
	DefaultPaymentMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

const defaults: Partial<WidgetConfig> = {
	methods: Object.values(DefaultPaymentMethods),
	show: false,
	addAmounts: [10, 50, 100],
	defaultFrequency: DonationFrequency.OneTime,
	minDonationAmount: 5,
	primaryColor: '#018669',
	showGiftCardOption: false,
	redeemGiftCardInFlow: false
};

const DEEP_MERGE_OPTIONS: DeepMergeOptions = {
	// Don't merge arrays, just overwrite them

	arrayMerge: (_, sourceArray) => sourceArray
};

export const mergeConfig = (options: Partial<WidgetConfig>): WidgetConfig => {
	const filteredInputMethods = options.methods?.filter((method) =>
		AvailablePaymentMethods.includes(method)
	);

	const additionalMethods = options.showGiftCardOption
		? [PaymentMethod.GIFT_CARD]
		: [];

	const methods = (
		filteredInputMethods && filteredInputMethods.length > 0
			? filteredInputMethods
			: DefaultPaymentMethods
	).concat(additionalMethods);

	return deepMerge.all<WidgetConfig>(
		[defaults, options, {methods}],
		DEEP_MERGE_OPTIONS
	);
};
