import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {en} from 'src/components/widget/constants/lang/en';
import {es} from 'src/components/widget/constants/lang/es';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {WidgetConfig} from 'src/components/widget/types/widget-config';

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
	 * Whether or not to render Crypto donation flow instead of the normal
	 * donation flow
	 *
	 * @default false
	 * For now, only crypto is supported
	 */
	readonly crypto: boolean; // For now only this is supported
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
	show: false,
	name: '',
	description: '',
	forceLanguage: false,
	countrySelection: false, // @check: this is not used anywhere
	currencies: [
		{
			countryCodes: ['GLOBAL'],
			name: 'USD',
			symbol: '$',
			minimumAmount: 10
		}
	],
	defaultFrequency: DonationFrequency.OneTime,
	showInitialMessage: false,
	showInputButtons: true,
	showTaxResidency: false,
	showAlternatePayments: true,
	primaryColor: '#00A37F',
	i18n: {
		en,
		es
	}
};

const DEEP_MERGE_OPTIONS: DeepMergeOptions = {
	// Don't merge arrays, just overwrite them
	arrayMerge: (_destArray, sourceArray, _options) => sourceArray
};

export const mergeConfig = (options: Partial<WidgetConfig>): WidgetConfig => {
	return deepMerge.all<WidgetConfig>([defaults, options], DEEP_MERGE_OPTIONS);
};
