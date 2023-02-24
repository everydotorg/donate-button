import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {AvailablePaymentMethods} from 'src/components/widget/types/PaymentMethod';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

const defaults: Partial<WidgetConfig> = {
	methods: Object.values(AvailablePaymentMethods),
	show: false,
	addAmounts: [10, 50, 100],
	defaultFrequency: DonationFrequency.OneTime,
	minDonationAmount: 5,
	primaryColor: '#018669'
};

const DEEP_MERGE_OPTIONS: DeepMergeOptions = {
	// Don't merge arrays, just overwrite them

	arrayMerge: (_, sourceArray) => sourceArray
};

export const mergeConfig = (options: Partial<WidgetConfig>): WidgetConfig => {
	const filteredInputMethods = options.methods?.filter((method) =>
		AvailablePaymentMethods.includes(method)
	);

	const methods =
		filteredInputMethods && filteredInputMethods.length > 0
			? filteredInputMethods
			: AvailablePaymentMethods;

	return deepMerge.all<WidgetConfig>(
		[defaults, options, {methods}],
		DEEP_MERGE_OPTIONS
	);
};
