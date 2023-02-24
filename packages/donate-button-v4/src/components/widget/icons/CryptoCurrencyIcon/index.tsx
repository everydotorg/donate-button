import algorand from 'src/components/widget/icons/CryptoCurrencyIcon/algorand.svg';
import apecoin from 'src/components/widget/icons/CryptoCurrencyIcon/apecoin.svg';
import avalanche from 'src/components/widget/icons/CryptoCurrencyIcon/avalanche.svg';
import basic_attention_token from 'src/components/widget/icons/CryptoCurrencyIcon/basic-attention-token.svg';
import bitcoin from 'src/components/widget/icons/CryptoCurrencyIcon/bitcoin.svg';
import chainlink from 'src/components/widget/icons/CryptoCurrencyIcon/chainlink.svg';
import dai from 'src/components/widget/icons/CryptoCurrencyIcon/dai.svg';
import dogecoin from 'src/components/widget/icons/CryptoCurrencyIcon/dogecoin.svg';
import ethereum from 'src/components/widget/icons/CryptoCurrencyIcon/ethereum.svg';
import filecoin from 'src/components/widget/icons/CryptoCurrencyIcon/filecoin.svg';
import graph from 'src/components/widget/icons/CryptoCurrencyIcon/graph.svg';
import litecoin from 'src/components/widget/icons/CryptoCurrencyIcon/litecoin.svg';
import mobilecoin from 'src/components/widget/icons/CryptoCurrencyIcon/mobilecoin.svg';
// import monero from 'src/components/widget/icons/CryptoCurrencyIcon/monero.svg';
import polkadot from 'src/components/widget/icons/CryptoCurrencyIcon/polkadot.svg';
import polygon from 'src/components/widget/icons/CryptoCurrencyIcon/polygon.svg';
import raydium from 'src/components/widget/icons/CryptoCurrencyIcon/raydium.svg';
import saber from 'src/components/widget/icons/CryptoCurrencyIcon/saber.svg';
import samoyed from 'src/components/widget/icons/CryptoCurrencyIcon/samoyed.svg';
import shiba_inu from 'src/components/widget/icons/CryptoCurrencyIcon/shiba-inu.svg';
import solana from 'src/components/widget/icons/CryptoCurrencyIcon/solana.svg';
import stellar from 'src/components/widget/icons/CryptoCurrencyIcon/stellar.svg';
import tether from 'src/components/widget/icons/CryptoCurrencyIcon/tether.svg';
import tezos from 'src/components/widget/icons/CryptoCurrencyIcon/tezos.svg';
import uniswap from 'src/components/widget/icons/CryptoCurrencyIcon/uniswap.svg';
// import usd_coin from 'src/components/widget/icons/CryptoCurrencyIcon/usd-coin.svg';
import zcash from 'src/components/widget/icons/CryptoCurrencyIcon/zcash.svg';
import {CryptoCurrency} from 'src/components/widget/types/Crypto';

const IconForCurrency = {
	[CryptoCurrency.ALGO]: algorand, // 'Algorand',
	[CryptoCurrency.APE]: apecoin, // 'Apecoin',
	[CryptoCurrency.AVAX]: avalanche, // 'Avalanche',
	[CryptoCurrency.BAT]: basic_attention_token, // 'Basic Attention Token',
	[CryptoCurrency.BTC]: bitcoin, // 'Bitcoin',
	[CryptoCurrency.DOGE]: dogecoin, // 'DogeCoin',
	[CryptoCurrency.DAI]: dai, // 'Dai',
	[CryptoCurrency.DOT]: polkadot, // 'Polkadot',
	[CryptoCurrency.ETH]: ethereum, // 'Ethereum',
	[CryptoCurrency.FIL]: filecoin, // 'Filecoin',
	[CryptoCurrency.GRT]: graph, // 'The Graph',
	[CryptoCurrency.LINK]: chainlink, // 'Chainlink',
	[CryptoCurrency.LTC]: litecoin, // 'Litecoin',
	[CryptoCurrency.MATIC]: polygon, // 'Polygon',
	[CryptoCurrency.MOB]: mobilecoin, // 'MobileCoin',
	[CryptoCurrency.RAY]: raydium, // 'Raydium',
	[CryptoCurrency.SAMO]: samoyed, // 'Samoyed',
	[CryptoCurrency.SBR]: saber, // 'Saber',
	[CryptoCurrency.SHIB]: shiba_inu, // 'Shiba Inu',
	[CryptoCurrency.SOL]: solana, // 'Solana',
	[CryptoCurrency.UNI]: uniswap, // 'Uniswap',
	[CryptoCurrency.USDC]: tether, // 'USD Coin',
	[CryptoCurrency.USDT]: stellar, // 'Tether',
	// [CryptoCurrency.XLM]: monero, //"Stellar",
	// [CryptoCurrency.XMR]: usd_coin, // "Monero",
	[CryptoCurrency.XTZ]: tezos, // 'Tezos',
	[CryptoCurrency.ZEC]: zcash // 'ZCash',
};

export const CryptoCurrencyIcon = ({currency}: {currency: CryptoCurrency}) => {
	return (
		<img
			src={IconForCurrency[currency]}
			alt={currency + '_icon'}
			width={24}
			height={24}
		/>
	);
};
