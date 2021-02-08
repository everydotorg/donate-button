export enum DonationMode {
	SINGLE = 'SINGLE',
	SPLIT = 'SPLIT'
}
export type DonationFrequency = 'ONCE' | 'MONTHLY';
export interface DonationLevel {
	amount: string;
	bgColor?: string;
	default?: boolean;
	img?: string;
	classes?: readonly string[];
}

/**
 * Donation level as expected in the i18n object
 * TODO: don't duplicate info from DonationLevel
 */
export interface I18NDonationLevel {
	amount: string;
	name?: string;
	description1?: string;
	description2?: string;
}

export type OnSubmitFunction = (parameters: {
	amount: string;
	frequency: DonationFrequency;
}) => void;
export interface OnSubmitObject {
	readonly charity: string;
	readonly params?: {
		readonly share_info?: 0 | 1;
		readonly no_exit?: 0 | 1;
	};
}
export type OnSubmit = OnSubmitFunction | OnSubmitObject;

export interface MonthlyOptions {
	readonly levels: readonly DonationLevel[];
}
export interface OneTimeOptions {
	readonly img?: string;
	readonly levels: number[];
	readonly allowCustom: boolean;
	readonly bgColor?: string;
}
export interface I18NFrequencyOptions {
	readonly logo: {
		readonly header: string;
		readonly text: string;
		readonly link: string;
	};
	readonly name?: string;
	readonly description?: string;
	readonly header: string;
	readonly info: string;
	readonly levels?: readonly I18NDonationLevel[];
	readonly custom: {
		readonly label?: string;
		readonly placeholder: string;
	};
	readonly button: string;
	readonly switch: string;
}
export interface I18NOptions {
	readonly company: {
		readonly logo: string;
		readonly name: string;
		readonly location: string;
	};
	readonly monthly: I18NFrequencyOptions;
	readonly oneTime: I18NFrequencyOptions;
	readonly footer: string;
}
export interface DonateButtonOptions<Languages extends string = string> {
	readonly monthly: MonthlyOptions;
	readonly oneTime: OneTimeOptions;
	readonly onSubmit: OnSubmit;
	readonly currency: string;
	readonly mode: DonationMode;
	readonly show: boolean;
	readonly i18n: Record<Languages, I18NOptions>;
	language: Languages;
}

export const defaultOptions: DonateButtonOptions = {
	show: false,
	language: 'en',
	mode: DonationMode.SPLIT,
	// Configure action when the user submit the donation in the widget.
	// You can pass to us the following parameters to customize it or listen to the callback
	onSubmit: {
		charity: 'your-foundation',
		params: {
			share_info: 1,
			no_exit: 1
		}
	},
	// Also supported:
	// onSubmit: ({amount, frequency}) => { console.log(amount, frequency)},
	currency: 'USD', // Currency to display
	monthly: {
		levels: [
			// Different choices in monthly donation
			{
				amount: '25'
			},
			{
				amount: '50',
				default: true
			},
			{
				amount: '100'
			},
			{
				amount: '200'
			},
			{
				amount: 'custom'
			}
		]
	},
	oneTime: {
		levels: [10, 20, 30, 50, 100, 200], // Different choices in one time donation
		allowCustom: true, // Allow enter custom amount in one time donation
		bgColor: '#BCD9DD'
	},
	i18n: {
		// Different languages of the widget.
		// The keys used here (en, es) are the keys used to change the language via Attrs or Javascript.
		// By default we use the key "en".
		en: {
			company: {
				logo: 'https://assets.every.org/every-month/assets/logo.svg',
				name: 'Your Foundation',
				location: "Your Foundation's Location"
			},
			monthly: {
				logo: {
					header: 'Monthly donation',
					text: 'on <link>every.org</link>',
					link: 'https://every.org'
				},
				header: 'Become a regular supporter',
				info: 'Monthly gifts help us focus on our mission and long-term impact',
				levels: [
					{amount: '5'},
					{amount: '10'},
					{amount: '20'},
					{amount: '50'},
					{amount: '100'},
					{amount: '200'}
				],
				custom: {
					label: 'Custom',
					placeholder: 'Enter amount'
				},
				button: 'Donate {{amount}} Every Month',
				switch: 'Or make a <action>One Time Donation</action>'
			},
			oneTime: {
				logo: {
					header: 'One time donation',
					text: 'on <link>every.org</link>',
					link: 'https://every.org'
				},
				name: 'One time donation',
				header: 'Help us make a difference',
				info: 'Thank you for your support!',
				custom: {
					placeholder: 'Enter custom amount'
				},
				button: 'Donate {{amount}}',
				switch: 'Or make a <action>Monthly donation</action>'
			},
			footer:
				'You will be redirected to a secure page on Every.org to complete your donation.'
		}
	}
};
