import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {DonateFlowCustomization} from 'src/components/widget/types/DonateFlowCustomization';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	AvailablePaymentMethods,
	DefaultPaymentMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {customizationToWidgetConfig} from 'src/helpers/customizationToWidgetConfig';
import getScriptParameters from 'src/helpers/getScriptParameters';

const PREVIEW_MODE_PARAM = 'previewMode';

const defaults: Partial<WidgetConfig> = {
	methods: Object.values(DefaultPaymentMethods),
	show: false,
	addAmounts: [10, 50, 100],
	defaultFrequency: DonationFrequency.Unselected,
	minDonationAmount: 10,
	primaryColor: '#018669',
	showGiftCardOption: false,
	redeemGiftCardInFlow: false,
	previewMode: getScriptParameters()?.[PREVIEW_MODE_PARAM] === '1'
};

const DEEP_MERGE_OPTIONS: DeepMergeOptions = {
	// Don't merge arrays, just overwrite them

	arrayMerge: (_, sourceArray) => sourceArray
};

export const mergeConfig = (
	options: Partial<WidgetConfig>,
	customization?: DonateFlowCustomization | null
): WidgetConfig => {
	const customizationConfig = customization
		? customizationToWidgetConfig(customization)
		: {};

	// Determine methods: options > customization > defaults
	const sourceMethods =
		options.methods ?? customizationConfig.methods ?? DefaultPaymentMethods;

	const filteredInputMethods = sourceMethods.filter((method) =>
		AvailablePaymentMethods.includes(method)
	);

	const additionalMethods =
		options.showGiftCardOption ??
		(customizationConfig as Partial<WidgetConfig>).showGiftCardOption
			? [PaymentMethod.GIFT_CARD]
			: [];

	const methods = (
		filteredInputMethods.length > 0
			? filteredInputMethods
			: DefaultPaymentMethods
	).concat(additionalMethods);

	return deepMerge.all<WidgetConfig>(
		[defaults, customizationConfig, options, {methods}],
		DEEP_MERGE_OPTIONS
	);
};
