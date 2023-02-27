import {
	CryptoCurrency,
	SharedCryptoCurrencyConfig
} from 'src/components/widget/types/Crypto';

export function getStepForCurrencyAmountInput(currency?: CryptoCurrency) {
	if (!currency) return;

	const {decimalOffset} = SharedCryptoCurrencyConfig[currency];
	const zeros = '0'.repeat(decimalOffset - 1);

	return `0.${zeros}1`;
}
