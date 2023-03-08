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
	 * Identifier for fundraiser on Every.org; you can get it by going to the
	 * fundraiser's profile on Every.org and looking at its URL
	 *
	 * @example
	 * If the URL is https://www.every.org/givedirectly/f/my-fundraiser, the slug is "my-fundraiser"
	 */
	fundraiserSlug?: string;
	/**
	 * If present, do not show the normal www.every.org background,
	 * only show the donation modal and do not allow people to exit
	 * the modal. Defaults to true.
	 */
	readonly noExit?: boolean;

	url?: string;
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

export interface CreateButtonInSelectorProps extends EmbedButtonOptions {
	/**
	 * Element to render button in; takes precedence over selector
	 */
	element?: Element;
	/**
	 * Selector to render button in
	 */
	selector?: string;
}
