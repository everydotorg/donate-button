import {Language} from 'src/components/widget/types/language';

export const es: Language = {
	frequency: 'Frecuencia',
	monthly: 'Donación mensual',
	oneTime: 'Donación única',
	amount: 'Monto',
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
		'Vas a ser redireccionado a Every.org para completar tu donación de {{currency}} a una ONG registrada en {{country}}.'
};
