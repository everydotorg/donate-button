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
import zcash from 'src/components/widget/icons/CryptoCurrencyIcon/zcash.svg';
import {CryptoCurrency} from 'src/components/widget/types/Crypto';

const IconForCurrency = {
	[CryptoCurrency.ALGO]: algorand,
	[CryptoCurrency.APE]: apecoin,
	[CryptoCurrency.AVAX]: avalanche,
	[CryptoCurrency.BAT]: basic_attention_token,
	[CryptoCurrency.BTC]: bitcoin,
	[CryptoCurrency.DOGE]: dogecoin,
	[CryptoCurrency.DAI]: dai,
	[CryptoCurrency.DOT]: polkadot,
	[CryptoCurrency.ETH]: ethereum,
	[CryptoCurrency.FIL]: filecoin,
	[CryptoCurrency.GRT]: graph,
	[CryptoCurrency.LINK]: chainlink,
	[CryptoCurrency.LTC]: litecoin,
	[CryptoCurrency.MATIC]: polygon,
	[CryptoCurrency.MOB]: mobilecoin,
	[CryptoCurrency.RAY]: raydium,
	[CryptoCurrency.SAMO]: samoyed,
	[CryptoCurrency.SBR]: saber,
	[CryptoCurrency.SHIB]: shiba_inu,
	[CryptoCurrency.SOL]: solana,
	[CryptoCurrency.UNI]: uniswap,
	[CryptoCurrency.USDC]: tether,
	[CryptoCurrency.USDT]: stellar,
	[CryptoCurrency.XTZ]: tezos,
	[CryptoCurrency.ZEC]: zcash
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
