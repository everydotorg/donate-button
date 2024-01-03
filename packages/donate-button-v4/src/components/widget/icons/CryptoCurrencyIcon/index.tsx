import {
	CryptoCurrency,
	CryptoCurrencyConfig
} from 'src/components/widget/types/Crypto';
import {getCloudinaryUrl} from 'src/helpers/getCloudinaryUrl';

function getSrcForCryptoIcon(currency: CryptoCurrency) {
	const config = CryptoCurrencyConfig[currency];

	if ('icon' in config) {
		return config.icon;
	}

	return getCloudinaryUrl(config.iconCloudinaryId, {width: 24, height: 24});
}

export const CryptoCurrencyIcon = ({currency}: {currency: CryptoCurrency}) => {
	return (
		<img
			src={getSrcForCryptoIcon(currency)}
			alt={currency + '_icon'}
			width={24}
			height={24}
		/>
	);
};
