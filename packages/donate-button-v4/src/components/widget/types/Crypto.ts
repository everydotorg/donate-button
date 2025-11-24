import algorand from 'src/components/widget/icons/CryptoCurrencyIcon/algorand.svg';
import apecoin from 'src/components/widget/icons/CryptoCurrencyIcon/apecoin.svg';
import avalanche from 'src/components/widget/icons/CryptoCurrencyIcon/avalanche.svg';
import basic_attention_token from 'src/components/widget/icons/CryptoCurrencyIcon/basic-attention-token.svg';
import binance from 'src/components/widget/icons/CryptoCurrencyIcon/binance.svg';
import bitcoincash from 'src/components/widget/icons/CryptoCurrencyIcon/bitcoin-cash.svg';
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
import raydium from 'src/components/widget/icons/CryptoCurrencyIcon/raydium.svg';
import rlusd from 'src/components/widget/icons/CryptoCurrencyIcon/rlusd.svg';
import saber from 'src/components/widget/icons/CryptoCurrencyIcon/saber.svg';
import samoyed from 'src/components/widget/icons/CryptoCurrencyIcon/samoyed.svg';
import shiba_inu from 'src/components/widget/icons/CryptoCurrencyIcon/shiba-inu.svg';
import solana from 'src/components/widget/icons/CryptoCurrencyIcon/solana.svg';
import stellar from 'src/components/widget/icons/CryptoCurrencyIcon/stellar.svg';
import tether from 'src/components/widget/icons/CryptoCurrencyIcon/tether.svg';
import tezos from 'src/components/widget/icons/CryptoCurrencyIcon/tezos.svg';
import uniswap from 'src/components/widget/icons/CryptoCurrencyIcon/uniswap.svg';
import usdcoin from 'src/components/widget/icons/CryptoCurrencyIcon/usd-coin.svg';
import zcash from 'src/components/widget/icons/CryptoCurrencyIcon/zcash.svg';

export enum CryptoCurrency {
	AAVE = 'AAVE',
	ALCX = 'ALCX',
	ALGO = 'ALGO',
	// ALI = "ALI",
	AMP = 'AMP',
	ANKR = 'ANKR',
	APE = 'APE',
	API3 = 'API3',
	AUDIO = 'AUDIO',
	AVAX = 'AVAX',
	AXS = 'AXS',
	BAT = 'BAT',
	BCH = 'BCH',
	BNB = 'BNB',
	BNT = 'BNT',
	BOME = 'BOME',
	BOND = 'BOND',
	BONK = 'BONK',
	BTC = 'BTC',
	CHILLGUY = 'CHILLGUY',
	CHZ = 'CHZ',
	COMP = 'COMP',
	CRV = 'CRV',
	CTX = 'CTX',
	CUBE = 'CUBE',
	CVC = 'CVC',
	DAI = 'DAI',
	DOGE = 'DOGE',
	DOT = 'DOT',
	ELON = 'ELON',
	ENS = 'ENS',
	ETH = 'ETH',
	FARTCOIN = 'FARTCOIN',
	FET = 'FET',
	FIL = 'FIL',
	FLOKI = 'FLOKI',
	FTM = 'FTM',
	GAL = 'GAL',
	GALA = 'GALA',
	GMT = 'GMT',
	GOAT = 'GOAT',
	GRT = 'GRT',
	GUSD = 'GUSD',
	HNT = 'HNT',
	IMX = 'IMX',
	INJ = 'INJ',
	IOTX = 'IOTX',
	JAM = 'JAM',
	KNC = 'KNC',
	KP3R = 'KP3R',
	LDO = 'LDO',
	LINK = 'LINK',
	LPT = 'LPT',
	LRC = 'LRC',
	LTC = 'LTC',
	MANA = 'MANA',
	MASK = 'MASK',
	MCO2 = 'MCO2',
	MEW = 'MEW',
	MKR = 'MKR',
	MNT = 'MNT',
	MOB = 'MOB',
	MOODENG = 'MOODENG',
	NMR = 'NMR',
	OP = 'OP',
	OXT = 'OXT',
	PAXG = 'PAXG',
	PEPE = 'PEPE',
	PNUT = 'PNUT',
	POL = 'POL',
	POPCAT = 'POPCAT',
	PYTH = 'PYTH',
	QNT = 'QNT',
	QRDO = 'QRDO',
	RARE = 'RARE',
	RAY = 'RAY',
	REN = 'REN',
	RLUSD = 'RLUSD',
	RNDR = 'RNDR',
	SAMO = 'SAMO',
	SAND = 'SAND',
	SBR = 'SBR',
	SHIB = 'SHIB',
	SKL = 'SKL',
	SLP = 'SLP',
	SNX = 'SNX',
	SOL = 'SOL',
	STORJ = 'STORJ',
	SUSHI = 'SUSHI',
	UMA = 'UMA',
	UNI = 'UNI',
	USDC = 'USDC',
	USDT = 'USDT',
	WIF = 'WIF',
	XLM = 'XLM',
	XRP = 'XRP',
	XTZ = 'XTZ',
	YFI = 'YFI',
	ZBC = 'ZBC',
	ZEC = 'ZEC',
	ZRX = 'ZRX'
}

export enum ContractType {
	ERC20 = 'ERC-20',
	SPL = 'SPL'
}

export interface SharedCryptoCurrencyConfig {
	displayName: string;
	abbreviation: string;
	decimalOffset: number;
	contractType?: ContractType;
	coingeckoId: string;
}

export const DISABLED_TOKENS = [
	CryptoCurrency.ALGO,
	CryptoCurrency.MOB,
	CryptoCurrency.XLM,
	CryptoCurrency.BNB
];

export const SharedCryptoCurrencyConfig: {
	[key in CryptoCurrency]: SharedCryptoCurrencyConfig;
} = {
	[CryptoCurrency.AAVE]: {
		displayName: 'Aave',
		abbreviation: 'AAVE',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'aave'
	},
	[CryptoCurrency.ALCX]: {
		displayName: 'Alchemix',
		abbreviation: 'ALCX',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'alchemix'
	},
	[CryptoCurrency.ALGO]: {
		displayName: 'Algorand',
		abbreviation: 'ALGO',
		decimalOffset: 6,
		coingeckoId: 'algorand'
	},
	[CryptoCurrency.AMP]: {
		displayName: 'Amp',
		abbreviation: 'AMP',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'amp-token'
	},
	[CryptoCurrency.ANKR]: {
		displayName: 'Ankr',
		abbreviation: 'ANKR',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'ankr'
	},
	[CryptoCurrency.APE]: {
		displayName: 'Apecoin',
		abbreviation: 'APE',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'apecoin'
	},
	[CryptoCurrency.API3]: {
		displayName: 'API3',
		abbreviation: 'API3',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'api3'
	},
	[CryptoCurrency.AUDIO]: {
		displayName: 'Audius',
		abbreviation: 'AUDIO',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'audius'
	},
	[CryptoCurrency.AVAX]: {
		displayName: 'Avalanche',
		abbreviation: 'AVAX',
		decimalOffset: 9,
		coingeckoId: 'avalanche-2'
	},
	[CryptoCurrency.AXS]: {
		displayName: 'Axie Infinity',
		abbreviation: 'AXS',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'axs'
	},
	[CryptoCurrency.BAT]: {
		displayName: 'Basic Attention Token',
		abbreviation: 'BAT',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'basic-attention-token'
	},
	[CryptoCurrency.BCH]: {
		displayName: 'Bitcoin Cash',
		abbreviation: 'BCH',
		decimalOffset: 8,
		coingeckoId: 'bitcoin-cash'
	},
	[CryptoCurrency.BNB]: {
		displayName: 'Binance Coin',
		abbreviation: 'BNB',
		decimalOffset: 8,
		coingeckoId: 'binancecoin'
	},
	[CryptoCurrency.BNT]: {
		displayName: 'Bancor',
		abbreviation: 'BNT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'bancor'
	},
	[CryptoCurrency.BOME]: {
		displayName: 'BOME',
		abbreviation: 'BOME',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'book-of-meme'
	},
	[CryptoCurrency.BOND]: {
		displayName: 'BarnBridge',
		abbreviation: 'BOND',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'barnbridge'
	},
	[CryptoCurrency.BONK]: {
		displayName: 'Bonk',
		abbreviation: 'BONK',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'bonk'
	},
	[CryptoCurrency.BTC]: {
		displayName: 'Bitcoin',
		abbreviation: 'BTC',
		decimalOffset: 8,
		coingeckoId: 'bitcoin'
	},
	[CryptoCurrency.CHILLGUY]: {
		displayName: 'Just a chill guy',
		abbreviation: 'CHILLGUY',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'chill-guy'
	},
	[CryptoCurrency.CHZ]: {
		displayName: 'Chiliz',
		abbreviation: 'CHZ',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'chiliz'
	},
	[CryptoCurrency.COMP]: {
		displayName: 'Compound',
		abbreviation: 'COMP',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'compound-governance-token'
	},
	[CryptoCurrency.CRV]: {
		displayName: 'Curve DAO Token',
		abbreviation: 'CRV',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'curve-dao-token'
	},
	[CryptoCurrency.CTX]: {
		displayName: 'Cryptex Finance',
		abbreviation: 'CTX',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'cryptex-finance'
	},
	[CryptoCurrency.CUBE]: {
		displayName: 'Cube',
		abbreviation: 'CUBE',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'somnium-space-cubes'
	},
	[CryptoCurrency.CVC]: {
		displayName: 'Civic',
		abbreviation: 'CVC',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'civic'
	},
	[CryptoCurrency.DAI]: {
		displayName: 'Dai',
		abbreviation: 'DAI',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'dai'
	},
	[CryptoCurrency.DOGE]: {
		displayName: 'DogeCoin',
		abbreviation: 'DOGE',
		decimalOffset: 8,
		coingeckoId: 'dogecoin'
	},
	[CryptoCurrency.DOT]: {
		displayName: 'Polkadot',
		abbreviation: 'DOT',
		decimalOffset: 10,
		coingeckoId: 'polkadot'
	},
	[CryptoCurrency.ELON]: {
		displayName: 'Dogelon Mars',
		abbreviation: 'ELON',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'dogelon-mars'
	},
	[CryptoCurrency.ENS]: {
		displayName: 'Ethereum Name Service',
		abbreviation: 'ENS',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'ethereum-name-service'
	},
	[CryptoCurrency.ETH]: {
		displayName: 'Ethereum',
		abbreviation: 'ETH',
		decimalOffset: 18,
		coingeckoId: 'ethereum'
	},
	[CryptoCurrency.FARTCOIN]: {
		displayName: 'Fartcoin',
		abbreviation: 'FARTCOIN',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'fartcoin'
	},
	[CryptoCurrency.FET]: {
		displayName: 'Fetch.ai',
		abbreviation: 'FET',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'fetch-ai'
	},
	[CryptoCurrency.FIL]: {
		displayName: 'Filecoin',
		abbreviation: 'FIL',
		decimalOffset: 18,
		coingeckoId: 'filecoin'
	},
	[CryptoCurrency.FLOKI]: {
		displayName: 'FLOKI',
		abbreviation: 'FLOKI',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'floki'
	},
	[CryptoCurrency.FTM]: {
		displayName: 'Fantom',
		abbreviation: 'FTM',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'fantom'
	},
	[CryptoCurrency.GAL]: {
		displayName: 'Galaxe',
		abbreviation: 'GAL',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'project-galaxy'
	},
	[CryptoCurrency.GALA]: {
		displayName: 'Gala',
		abbreviation: 'GALA',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'gala'
	},
	[CryptoCurrency.GMT]: {
		displayName: 'STEPN',
		abbreviation: 'GMT',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'stepn'
	},
	[CryptoCurrency.GOAT]: {
		displayName: 'Goatcoin',
		abbreviation: 'GOAT',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'goatseus-maximus'
	},
	[CryptoCurrency.GRT]: {
		displayName: 'The Graph',
		abbreviation: 'GRT',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'the-graph'
	},
	[CryptoCurrency.GUSD]: {
		displayName: 'Gemini Dollar',
		abbreviation: 'GUSD',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'gemini-dollar'
	},
	[CryptoCurrency.HNT]: {
		displayName: 'Helium',
		abbreviation: 'HNT',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'helium'
	},
	[CryptoCurrency.IMX]: {
		displayName: 'Immutable X',
		abbreviation: 'IMX',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'immutable-x'
	},
	[CryptoCurrency.INJ]: {
		displayName: 'Injective Protocol',
		abbreviation: 'INJ',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'injective-protocol'
	},
	[CryptoCurrency.IOTX]: {
		displayName: 'IoTeX',
		abbreviation: 'IOTX',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'iotex'
	},
	[CryptoCurrency.JAM]: {
		displayName: 'Geojam',
		abbreviation: 'JAM',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'geojam'
	},
	[CryptoCurrency.KNC]: {
		displayName: 'Kyber types.Network',
		abbreviation: 'KNC',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'kyber-network-crystal'
	},
	[CryptoCurrency.KP3R]: {
		displayName: 'Keep3rV1',
		abbreviation: 'KP3R',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'keep3rv1'
	},
	[CryptoCurrency.LDO]: {
		displayName: 'Lido DAO',
		abbreviation: 'LDO',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'lido-dao'
	},
	[CryptoCurrency.LINK]: {
		displayName: 'Chainlink',
		abbreviation: 'LINK',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'chainlink'
	},
	[CryptoCurrency.LPT]: {
		displayName: 'Livepeer',
		abbreviation: 'LPT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'livepeer'
	},
	[CryptoCurrency.LRC]: {
		displayName: 'Loopring',
		abbreviation: 'LRC',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'loopring'
	},
	[CryptoCurrency.LTC]: {
		displayName: 'Litecoin',
		abbreviation: 'LTC',
		decimalOffset: 8,
		coingeckoId: 'litecoin'
	},
	[CryptoCurrency.MANA]: {
		displayName: 'Mana',
		abbreviation: 'MANA',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'decentraland'
	},
	[CryptoCurrency.MASK]: {
		displayName: 'Mask Network',
		abbreviation: 'MASK',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'mask-network'
	},
	[CryptoCurrency.MCO2]: {
		displayName: 'Moss Carbon Credit',
		abbreviation: 'MCO2',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'moss-carbon-credit'
	},
	[CryptoCurrency.MEW]: {
		displayName: 'MEW',
		abbreviation: 'MEW',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'cat-in-a-dogs-world'
	},
	[CryptoCurrency.MKR]: {
		displayName: 'Maker',
		abbreviation: 'MKR',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'maker'
	},
	[CryptoCurrency.MNT]: {
		displayName: 'Mantle',
		abbreviation: 'MNT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'mantle'
	},
	[CryptoCurrency.MOB]: {
		displayName: 'MobileCoin',
		abbreviation: 'MOB',
		decimalOffset: 12,
		coingeckoId: 'mobilecoin'
	},
	[CryptoCurrency.MOODENG]: {
		displayName: 'MOODENG',
		abbreviation: 'MOODENG',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'moo-deng'
	},
	[CryptoCurrency.NMR]: {
		displayName: 'Numeraire',
		abbreviation: 'NMR',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'numeraire'
	},
	[CryptoCurrency.OP]: {
		displayName: 'Optimism',
		abbreviation: 'OP',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'optimism'
	},
	[CryptoCurrency.OXT]: {
		displayName: 'Orchid',
		abbreviation: 'OXT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'orchid-protocol'
	},
	[CryptoCurrency.PAXG]: {
		displayName: 'PAX Gold',
		abbreviation: 'PAXG',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'pax-gold'
	},
	[CryptoCurrency.PEPE]: {
		displayName: 'PEPE',
		abbreviation: 'PEPE',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'pepe'
	},
	[CryptoCurrency.PNUT]: {
		displayName: 'Peanut',
		abbreviation: 'PNUT',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'peanut-the-squirrel'
	},
	[CryptoCurrency.POL]: {
		displayName: 'Polygon',
		abbreviation: 'POL',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'polygon-ecosystem-token'
	},
	[CryptoCurrency.POPCAT]: {
		displayName: 'Popcat',
		abbreviation: 'POPCAT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'popcat'
	},
	[CryptoCurrency.PYTH]: {
		displayName: 'Pyth Network',
		abbreviation: 'PYTH',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'pyth-network'
	},
	[CryptoCurrency.QNT]: {
		displayName: 'Quant',
		abbreviation: 'QNT',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'quant-network'
	},
	[CryptoCurrency.QRDO]: {
		displayName: 'Qredo',
		abbreviation: 'QRDO',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'qredo'
	},
	[CryptoCurrency.RARE]: {
		displayName: 'SuperRare',
		abbreviation: 'RARE',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'superrare'
	},
	[CryptoCurrency.RAY]: {
		displayName: 'Raydium',
		abbreviation: 'RAY',
		decimalOffset: 6,
		contractType: ContractType.SPL,
		coingeckoId: 'raydium'
	},
	[CryptoCurrency.REN]: {
		displayName: 'Ren',
		abbreviation: 'REN',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'republic-protocol'
	},
	[CryptoCurrency.RLUSD]: {
		displayName: 'Ripple USD',
		abbreviation: 'RLUSD',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'ripple-usd'
	},
	[CryptoCurrency.RNDR]: {
		displayName: 'Render Token',
		abbreviation: 'RNDR',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'render-token'
	},
	[CryptoCurrency.SAMO]: {
		displayName: 'Samoyed',
		abbreviation: 'SAMO',
		decimalOffset: 9,
		contractType: ContractType.SPL,
		coingeckoId: 'samoyedcoin'
	},
	[CryptoCurrency.SAND]: {
		displayName: 'Sandbox',
		abbreviation: 'SAND',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'the-sandbox'
	},
	[CryptoCurrency.SBR]: {
		displayName: 'Saber',
		abbreviation: 'SBR',
		decimalOffset: 6,
		contractType: ContractType.SPL,
		coingeckoId: 'saber'
	},
	[CryptoCurrency.SHIB]: {
		displayName: 'Shiba Inu',
		abbreviation: 'SHIB',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'shiba-inu'
	},
	[CryptoCurrency.SKL]: {
		displayName: 'Skale',
		abbreviation: 'SKL',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'skale'
	},
	[CryptoCurrency.SLP]: {
		displayName: 'Smooth Love Potion',
		abbreviation: 'SLP',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'smooth-love-potion'
	},
	[CryptoCurrency.SNX]: {
		displayName: 'Synthetix',
		abbreviation: 'SNX',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'havven'
	},
	[CryptoCurrency.SOL]: {
		displayName: 'Solana',
		abbreviation: 'SOL',
		decimalOffset: 9,
		coingeckoId: 'solana'
	},
	[CryptoCurrency.STORJ]: {
		displayName: 'Storj',
		abbreviation: 'STORJ',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'storj'
	},
	[CryptoCurrency.SUSHI]: {
		displayName: 'SushiSwap',
		abbreviation: 'SUSHI',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'sushi'
	},
	[CryptoCurrency.UMA]: {
		displayName: 'UMA',
		abbreviation: 'UMA',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'uma'
	},
	[CryptoCurrency.UNI]: {
		displayName: 'Uniswap',
		abbreviation: 'UNI',
		decimalOffset: 18,
		contractType: ContractType.ERC20,
		coingeckoId: 'uniswap'
	},
	[CryptoCurrency.USDC]: {
		displayName: 'USD Coin',
		abbreviation: 'USDC',
		decimalOffset: 6,
		contractType: ContractType.ERC20,
		coingeckoId: 'usd-coin'
	},
	[CryptoCurrency.USDT]: {
		displayName: 'Tether',
		abbreviation: 'USDT',
		decimalOffset: 6,
		contractType: ContractType.ERC20,
		coingeckoId: 'tether'
	},
	[CryptoCurrency.WIF]: {
		displayName: 'dogwifhat',
		abbreviation: 'WIF',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'dogwifcoin'
	},
	[CryptoCurrency.XLM]: {
		displayName: 'Stellar',
		abbreviation: 'XLM',
		decimalOffset: 7,
		coingeckoId: 'stellar'
	},
	[CryptoCurrency.XRP]: {
		displayName: 'XRP',
		abbreviation: 'XRP',
		decimalOffset: 6,
		coingeckoId: 'ripple'
	},
	[CryptoCurrency.XTZ]: {
		displayName: 'Tezos',
		abbreviation: 'XTZ',
		decimalOffset: 6,
		coingeckoId: 'tezos'
	},
	[CryptoCurrency.YFI]: {
		displayName: 'Yearn Finance',
		abbreviation: 'YFI',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: 'yearn-finance'
	},
	[CryptoCurrency.ZBC]: {
		displayName: 'Zebec Protocol',
		abbreviation: 'ZBC',
		contractType: ContractType.SPL,
		decimalOffset: 9,
		coingeckoId: 'zebec-protocol'
	},
	[CryptoCurrency.ZEC]: {
		displayName: 'ZCash',
		abbreviation: 'ZEC',
		decimalOffset: 8,
		coingeckoId: 'zcash'
	},
	[CryptoCurrency.ZRX]: {
		displayName: '0x',
		abbreviation: 'ZRX',
		contractType: ContractType.ERC20,
		decimalOffset: 18,
		coingeckoId: '0x'
	}
};

export interface CryptoCurrencyOption {
	value: CryptoCurrency;
	label: string;
	contractType: string;
}

type WebsiteCryptoCurrencyConfig =
	| {
			icon: string;
	  }
	| {
			iconCloudinaryId: string;
	  };

const WebsiteCryptoCurrencyConfig: {
	[key in CryptoCurrency]: WebsiteCryptoCurrencyConfig;
} = {
	[CryptoCurrency.AAVE]: {
		iconCloudinaryId: 'crypto/aave_oszkzj'
	},
	[CryptoCurrency.ALCX]: {
		iconCloudinaryId: 'crypto/alcx_agfvh3'
	},
	[CryptoCurrency.AMP]: {
		iconCloudinaryId: 'crypto/amp_zrgutx'
	},
	[CryptoCurrency.ANKR]: {
		iconCloudinaryId: 'crypto/ankr_vipelu'
	},
	[CryptoCurrency.ALGO]: {
		icon: algorand
	},
	[CryptoCurrency.APE]: {
		icon: apecoin
	},
	[CryptoCurrency.AVAX]: {
		icon: avalanche
	},
	[CryptoCurrency.AXS]: {
		iconCloudinaryId: 'crypto/axs_vdwbc0'
	},
	[CryptoCurrency.BAT]: {
		icon: basic_attention_token
	},
	[CryptoCurrency.BCH]: {
		icon: bitcoincash
	},
	[CryptoCurrency.BNB]: {
		icon: binance
	},
	[CryptoCurrency.BTC]: {
		icon: bitcoin
	},
	[CryptoCurrency.CHZ]: {
		iconCloudinaryId: 'crypto/chiliz_j11blm'
	},
	[CryptoCurrency.DAI]: {
		icon: dai
	},
	[CryptoCurrency.DOGE]: {
		icon: dogecoin
	},
	[CryptoCurrency.DOT]: {
		icon: polkadot
	},
	[CryptoCurrency.ETH]: {
		icon: ethereum
	},
	[CryptoCurrency.FARTCOIN]: {
		iconCloudinaryId: 'crypto/fartcoin_lc4soe'
	},
	[CryptoCurrency.FIL]: {
		icon: filecoin
	},
	[CryptoCurrency.GRT]: {
		icon: graph
	},
	[CryptoCurrency.LINK]: {
		icon: chainlink
	},
	[CryptoCurrency.LTC]: {
		icon: litecoin
	},
	[CryptoCurrency.MNT]: {
		iconCloudinaryId: 'Mantle-Logo-mark_yfifiz'
	},
	[CryptoCurrency.MOB]: {
		icon: mobilecoin
	},
	[CryptoCurrency.RAY]: {
		icon: raydium
	},
	[CryptoCurrency.SAMO]: {
		icon: samoyed
	},
	[CryptoCurrency.SBR]: {
		icon: saber
	},
	[CryptoCurrency.SHIB]: {
		icon: shiba_inu
	},
	[CryptoCurrency.SLP]: {
		iconCloudinaryId: 'crypto/slp_clp71c'
	},
	[CryptoCurrency.SOL]: {
		icon: solana
	},
	[CryptoCurrency.UNI]: {
		icon: uniswap
	},
	[CryptoCurrency.USDC]: {
		icon: usdcoin
	},
	[CryptoCurrency.USDT]: {
		icon: tether
	},
	[CryptoCurrency.XLM]: {
		icon: stellar
	},
	[CryptoCurrency.XRP]: {
		iconCloudinaryId: 'crypto/xrp_uwcehg'
	},
	[CryptoCurrency.XTZ]: {
		icon: tezos
	},
	[CryptoCurrency.ZEC]: {
		icon: zcash
	},
	// [CryptoCurrency.ALI]: { iconCloudinaryId: "crypto/clt7rs4wap5nvyerm2gr" },
	[CryptoCurrency.API3]: {iconCloudinaryId: 'crypto/xb8xoz6kxev0uytaejlo'},
	[CryptoCurrency.AUDIO]: {iconCloudinaryId: 'crypto/ucctvvgwedku9hexplp7'},
	[CryptoCurrency.BNT]: {iconCloudinaryId: 'crypto/jgb6ub5gckohghdrt1ig'},
	[CryptoCurrency.BOME]: {iconCloudinaryId: 'crypto/bqqz7kifthzfat7jyjqs'},
	[CryptoCurrency.BOND]: {iconCloudinaryId: 'crypto/cidlkxmdqdoi2ezygfjj'},
	[CryptoCurrency.BONK]: {iconCloudinaryId: 'crypto/tu3cprnhlpkew6ijzmyn'},
	[CryptoCurrency.COMP]: {iconCloudinaryId: 'crypto/ayjushqknohuz9x3hcx5'},
	[CryptoCurrency.CRV]: {iconCloudinaryId: 'crypto/txyb4aa9a0skuhoyjcti'},
	[CryptoCurrency.CTX]: {iconCloudinaryId: 'crypto/mpno6vbbahgx8lgxmb4a'},
	[CryptoCurrency.CUBE]: {iconCloudinaryId: 'crypto/n8su92fe1atqx79hrhqf'},
	[CryptoCurrency.CVC]: {iconCloudinaryId: 'crypto/cw8ahifxtnfw8pbgh5o9'},
	[CryptoCurrency.ELON]: {iconCloudinaryId: 'crypto/fvsarijyyz1v9j5w1sh2'},
	[CryptoCurrency.ENS]: {iconCloudinaryId: 'crypto/naiw9tgamtvxcxctwxog'},
	[CryptoCurrency.FET]: {iconCloudinaryId: 'crypto/mwfznnuw28qqeia4uwov'},
	[CryptoCurrency.FTM]: {iconCloudinaryId: 'crypto/laq3m7el5wdfmlhwwtk0'},
	[CryptoCurrency.GAL]: {iconCloudinaryId: 'crypto/a5km5rat7dpiz6ckkvfi'},
	[CryptoCurrency.GALA]: {iconCloudinaryId: 'crypto/rifljrw1ry9wu1i7mxji'},
	[CryptoCurrency.GMT]: {iconCloudinaryId: 'crypto/uyyddnskoabbpei7olin'},
	[CryptoCurrency.GOAT]: {iconCloudinaryId: 'crypto/eur83ufigc8id1ouov6k'},
	[CryptoCurrency.GUSD]: {iconCloudinaryId: 'crypto/w8zltgl5ngsz1lqch17g'},
	[CryptoCurrency.IMX]: {iconCloudinaryId: 'crypto/dzbiyoog90osmjwx1col'},
	[CryptoCurrency.INJ]: {iconCloudinaryId: 'crypto/gi0voz42gn33azwaa11a'},
	[CryptoCurrency.IOTX]: {iconCloudinaryId: 'crypto/pkc4lx0unriaayfdx8us'},
	[CryptoCurrency.JAM]: {iconCloudinaryId: 'crypto/xmn1xxzccz84xiej1esw'},
	[CryptoCurrency.KNC]: {iconCloudinaryId: 'crypto/mqdyhpc07mle6dkfomye'},
	[CryptoCurrency.KP3R]: {iconCloudinaryId: 'crypto/eoabgtxyhpqqfhv1bxud'},
	[CryptoCurrency.LDO]: {iconCloudinaryId: 'crypto/thmvnuxks9z3gthhypwb'},
	[CryptoCurrency.LPT]: {iconCloudinaryId: 'crypto/setl154mkwd9kpfly7om'},
	[CryptoCurrency.LRC]: {iconCloudinaryId: 'crypto/sazpx9zyfsgbmprmfag9'},
	[CryptoCurrency.MANA]: {iconCloudinaryId: 'crypto/ekefdi1p3jgoeb08oszc'},
	[CryptoCurrency.MASK]: {iconCloudinaryId: 'crypto/ykwym7djaofb2q6lcn5n'},
	[CryptoCurrency.MCO2]: {iconCloudinaryId: 'crypto/ysuyysfrukryu1jw2wrh'},
	[CryptoCurrency.MEW]: {iconCloudinaryId: 'crypto/u5yaemgk4ajviyqriav6'},
	[CryptoCurrency.MKR]: {iconCloudinaryId: 'crypto/tpdipvaap6m150j2hdec'},
	[CryptoCurrency.MOODENG]: {iconCloudinaryId: 'crypto/csrl7ferznsrkjcwg5lq'},
	[CryptoCurrency.NMR]: {iconCloudinaryId: 'crypto/bqecgq3rawel0k99tohj'},
	[CryptoCurrency.OP]: {iconCloudinaryId: 'crypto/mg3ut47msiik6ote2vvy'},
	[CryptoCurrency.OXT]: {iconCloudinaryId: 'crypto/ietkmjcp0yj71vlg0zjy'},
	[CryptoCurrency.PAXG]: {iconCloudinaryId: 'crypto/yb5x1aizhhdn8mprrn2m'},
	[CryptoCurrency.PEPE]: {iconCloudinaryId: 'crypto/li6d622yragqd5qktcel'},
	[CryptoCurrency.PNUT]: {iconCloudinaryId: 'crypto/blutzmogx9bihtkcgvlh'},
	[CryptoCurrency.POPCAT]: {iconCloudinaryId: 'crypto/kcu6of08mi1dpxk5dadu'},
	[CryptoCurrency.QNT]: {iconCloudinaryId: 'crypto/dwdx02ifn9fsvbw1pgfz'},
	[CryptoCurrency.QRDO]: {iconCloudinaryId: 'crypto/jzbmlpvwoogroaaazkxz'},
	[CryptoCurrency.RARE]: {iconCloudinaryId: 'crypto/dau8mznijmzzcd6jdc6s'},
	[CryptoCurrency.REN]: {iconCloudinaryId: 'crypto/ili8nkjwnifmbfra20ly'},
	[CryptoCurrency.RNDR]: {iconCloudinaryId: 'crypto/tm0klwno0hqjbcxsuvrp'},
	[CryptoCurrency.RLUSD]: {icon: rlusd},
	[CryptoCurrency.SAND]: {iconCloudinaryId: 'crypto/w6g6ep4ghqpsz54vqzmy'},
	[CryptoCurrency.SKL]: {iconCloudinaryId: 'crypto/zccvwa5yin8r32s4sfqy'},
	[CryptoCurrency.SNX]: {iconCloudinaryId: 'crypto/sxvudvsjujuhdupwssvz'},
	[CryptoCurrency.STORJ]: {iconCloudinaryId: 'crypto/le1ikh3apsrxyttjxg64'},
	[CryptoCurrency.SUSHI]: {iconCloudinaryId: 'crypto/iivxx5mfdz1bckmhom1f'},
	[CryptoCurrency.UMA]: {iconCloudinaryId: 'crypto/imxydvsf4mydmyjukbel'},
	[CryptoCurrency.YFI]: {iconCloudinaryId: 'crypto/mal5muwn4fcsbuuyhohz'},
	[CryptoCurrency.ZBC]: {iconCloudinaryId: 'crypto/hhiopvuac8qbpcnupgle'},
	[CryptoCurrency.ZRX]: {iconCloudinaryId: 'crypto/ge5jqonw89ffg200z0in'},
	[CryptoCurrency.CHILLGUY]: {
		iconCloudinaryId: 'crypto/j75hb0lxbsbapieemaye'
	},
	[CryptoCurrency.FLOKI]: {iconCloudinaryId: 'crypto/rlxx86vydn8ccfxtm4vp'},
	[CryptoCurrency.HNT]: {iconCloudinaryId: 'crypto/pet5gmpzfy2x2mhun0hn'},
	[CryptoCurrency.POL]: {iconCloudinaryId: 'crypto/i1m8h4uzfijyjcfeeydg'},
	[CryptoCurrency.PYTH]: {iconCloudinaryId: 'crypto/wyrrhmpb286mabrfuvm1'},
	[CryptoCurrency.WIF]: {iconCloudinaryId: 'crypto/kbpw2ho4rnvleavinyxj'}
};

export const CryptoCurrencyConfig = Object.fromEntries(
	Object.values(CryptoCurrency).map((cc: CryptoCurrency) => [
		cc,
		{...SharedCryptoCurrencyConfig[cc], ...WebsiteCryptoCurrencyConfig[cc]}
	])
) as {
	[key in CryptoCurrency]: SharedCryptoCurrencyConfig &
		WebsiteCryptoCurrencyConfig;
};
