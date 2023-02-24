export enum CryptoCurrency {
	ALGO = 'ALGO',
	APE = 'APE',
	AVAX = 'AVAX',
	BAT = 'BAT',
	BTC = 'BTC',
	DAI = 'DAI',
	DOGE = 'DOGE',
	DOT = 'DOT',
	ETH = 'ETH',
	FIL = 'FIL',
	GRT = 'GRT',
	LINK = 'LINK',
	LTC = 'LTC',
	MATIC = 'MATIC',
	MOB = 'MOB',
	RAY = 'RAY',
	SAMO = 'SAMO',
	SBR = 'SBR',
	SHIB = 'SHIB',
	SOL = 'SOL',
	UNI = 'UNI',
	USDC = 'USDC',
	USDT = 'USDT',
	// Mistakenly thought these were supported by TGB
	// XLM = "XLM",
	// XMR = "XMR",
	XTZ = 'XTZ',
	ZEC = 'ZEC'
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
}

export const DISABLED_TOKENS = [
	// Wyre may or may not be dying - check back in in a few months
	// (comment by rahul, 2023-01-24)
	CryptoCurrency.ALGO,
	CryptoCurrency.MOB
];

/**
 * Base configuration for crypto. Backend and frontend-specific configuration
 * are configured in //packages/api/src/helpers/cryptoCurrency.ts and
 * //packages/website-next/src/utility/cryptoCurrency.ts respectively.
 */
export const SharedCryptoCurrencyConfig: {
	[key in CryptoCurrency]: SharedCryptoCurrencyConfig;
} = {
	[CryptoCurrency.ALGO]: {
		displayName: 'Algorand',
		abbreviation: 'ALGO',
		decimalOffset: 6
	},
	[CryptoCurrency.APE]: {
		displayName: 'Apecoin',
		abbreviation: 'APE',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.AVAX]: {
		displayName: 'Avalanche',
		abbreviation: 'AVAX',
		decimalOffset: 9
	},
	[CryptoCurrency.BAT]: {
		displayName: 'Basic Attention Token',
		abbreviation: 'BAT',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.BTC]: {
		displayName: 'Bitcoin',
		abbreviation: 'BTC',
		decimalOffset: 8
	},
	[CryptoCurrency.DOGE]: {
		displayName: 'DogeCoin',
		abbreviation: 'DOGE',
		decimalOffset: 8
	},
	[CryptoCurrency.DAI]: {
		displayName: 'Dai',
		abbreviation: 'DAI',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.DOT]: {
		displayName: 'Polkadot',
		abbreviation: 'DOT',
		decimalOffset: 10
	},
	[CryptoCurrency.ETH]: {
		displayName: 'Ethereum',
		abbreviation: 'ETH',
		decimalOffset: 18
	},
	[CryptoCurrency.FIL]: {
		displayName: 'Filecoin',
		abbreviation: 'FIL',
		decimalOffset: 18
	},
	[CryptoCurrency.GRT]: {
		displayName: 'The Graph',
		abbreviation: 'GRT',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.LINK]: {
		displayName: 'Chainlink',
		abbreviation: 'LINK',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.LTC]: {
		displayName: 'Litecoin',
		abbreviation: 'LTC',
		decimalOffset: 8
	},
	[CryptoCurrency.MATIC]: {
		displayName: 'Polygon',
		abbreviation: 'MATIC',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.MOB]: {
		displayName: 'MobileCoin',
		abbreviation: 'MOB',
		decimalOffset: 12
	},
	[CryptoCurrency.RAY]: {
		displayName: 'Raydium',
		abbreviation: 'RAY',
		decimalOffset: 6,
		contractType: ContractType.SPL
	},
	[CryptoCurrency.SAMO]: {
		displayName: 'Samoyed',
		abbreviation: 'SAMO',
		decimalOffset: 9,
		contractType: ContractType.SPL
	},
	[CryptoCurrency.SBR]: {
		displayName: 'Saber',
		abbreviation: 'SBR',
		decimalOffset: 6,
		contractType: ContractType.SPL
	},
	[CryptoCurrency.SHIB]: {
		displayName: 'Shiba Inu',
		abbreviation: 'SHIB',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.SOL]: {
		displayName: 'Solana',
		abbreviation: 'SOL',
		decimalOffset: 9
	},
	[CryptoCurrency.UNI]: {
		displayName: 'Uniswap',
		abbreviation: 'UNI',
		decimalOffset: 18,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.USDC]: {
		displayName: 'USD Coin',
		abbreviation: 'USDC',
		decimalOffset: 6,
		contractType: ContractType.ERC20
	},
	[CryptoCurrency.USDT]: {
		displayName: 'Tether',
		abbreviation: 'USDT',
		decimalOffset: 6
	},
	// [CryptoCurrency.XLM]: {
	//   displayName: "Stellar",
	//   abbreviation: "XLM",
	//   decimalOffset: 7,
	// },
	// [CryptoCurrency.XMR]: {
	//   displayName: "Monero",
	//   abbreviation: "XMR",
	//   decimalOffset: 12,
	// },
	[CryptoCurrency.XTZ]: {
		displayName: 'Tezos',
		abbreviation: 'XTZ',
		decimalOffset: 6
	},
	[CryptoCurrency.ZEC]: {
		displayName: 'ZCash',
		abbreviation: 'ZEC',
		decimalOffset: 8
	}
};

export interface CryptoCurrencyOption {
	value: CryptoCurrency;
	label: string;
	contractType: string;
}
