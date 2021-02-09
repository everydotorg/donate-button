import {useContext} from 'preact/hooks';
import {OptionsContext} from 'src/contexts/options-context';

const defaultI18n = 'en';

const getBrowserLanguage = () => {
	const language = window.navigator.language;

	if (language.includes('-')) {
		// We use the short language name as a key
		// en-US -> en
		return language.split('-')[0];
	}

	return language;
};

const useI18n = () => {
	const browserLanguage = getBrowserLanguage();
	const {i18n, language: configuredLanguage} = useContext(OptionsContext);

	// Language given in config has priority over user browser lang
	if (i18n[configuredLanguage]) {
		return i18n[configuredLanguage];
	}

	return i18n[browserLanguage] ? i18n[browserLanguage] : i18n[defaultI18n];
};

export default useI18n;
