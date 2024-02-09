const DefaultLocale = 'en-US';

export function displayCurrencyValue(
	value: string | number,
	currency: string
): string {
	const amountString = new Intl.NumberFormat(DefaultLocale, {
		style: 'currency',
		currency
	}).format(Number.parseFloat(value.toString()));

	// remove 0 cents if present, tolerant to different locale formats
	// https://stackoverflow.com/a/49724581
	const formatted = `${amountString.replace(/\D00(?=\D*$)/, '')} ${currency}`;

	return formatted;
}
