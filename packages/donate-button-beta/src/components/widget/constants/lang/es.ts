import {Language} from 'src/components/widget/types/language';

export const es: Partial<Language> = {
	frequency: 'Frecuencia',
	monthly: 'Mensualmente',
	monthlyDonation: 'Donación mensual',
	oneTimeDonation: 'Donación única',
	amount: 'Monto',
	amountError: 'Ingrese un monto para donar',
	frequencySelect: 'Seleccione el tipo de donación',
	frequencyPopover:
		'Las donaciones mensuales nos ayudan en nuestra misión e impacto a largo plazo',
	currencyPopover:
		'Es recomendado donar en {{suggestedCurrency}} si tributas en {{country}}. ¿Te gustaría cambiar de {{fromCurrency}} a {{toCurrency}}?',
	switchCurrency: 'Cambiar a {{suggestedCurrency}}',
	noThanks: 'No, gracias',
	donateWithCrypto: 'Donar con Crypto, Stocks o DAF',
	countryTitle: 'País para deducción de impuestos',
	countrySelection: 'Selecciona tu país',
	donate: 'Donar',
	donationRedirectNotice:
		'Vas a ser redireccionado a Every.org para completar tu donación de {{currency}} a una ONG registrada en {{country}}.',
	countryDescription:
		'Apoyo {{projectName}} con una donación a {{nameAndRegistration}}.',
	thanksDonation: '',
	minDonationAmount: 'El monto de donación mínimo es'
};
