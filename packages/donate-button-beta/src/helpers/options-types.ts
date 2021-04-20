import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';

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
	/**
	 * If not present, just a link to hrefUrl
	 */
	readonly onClick?: () => void;
}

const defaultOptions: DonateButtonOptions = {
	nonprofitSlug: 'your-foundation',
	crypto: false
};

const DEEP_MERGE_OPTIONS: DeepMergeOptions = {
	// Don't merge arrays, just overwrite them
	arrayMerge: (_destArray, sourceArray, _options) => sourceArray
};

export function mergeOptionsWithDefault(
	...toMerge: Array<Partial<DonateButtonOptions>>
): DonateButtonOptions {
	return deepMerge.all<DonateButtonOptions>(
		[defaultOptions, ...toMerge],
		DEEP_MERGE_OPTIONS
	);
}
