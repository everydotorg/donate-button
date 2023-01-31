import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {AvailablePaymentMethods} from 'src/components/widget/types/PaymentMethod';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

export interface DonateButtonOptions {
	/**
	 * Identifier for nonprofit on Every.org; you can get it by going to the
	 * nonprofit's profile on Every.org and looking at its URL
	 *
	 * @example
	 * If the URL is https://www.every.org/givedirectly, the slug is givedirectly
	 */
	readonly nonprofitSlug: string;
	/**
	 * If present, do not show the normal www.every.org background,
	 * only show the donation modal and do not allow people to exit
	 * the modal. Defaults to true.
	 */
	readonly noExit?: boolean;
}

export interface EmbedButtonOptions extends DonateButtonOptions {
	readonly label?: string;
	readonly className?: string;
	readonly withLogo?: boolean;
	readonly bgColor?: string;
	readonly textColor?: string;
	readonly borderRadius?: string;
	readonly fontSize?: string;
	readonly padding?: string;
	readonly target?: string;
	/**
	 * If not present, just a link to hrefUrl
	 */
	readonly onClick?: () => void;
}

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

	arrayMerge: (_destArray, sourceArray, _options) => sourceArray
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
