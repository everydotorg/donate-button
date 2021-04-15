import {useContext} from 'preact/hooks';
import {OptionsContext} from 'src/contexts/options-context';
import {I18NOptions} from 'src/helpers/options-types';

const getBrowserLanguage = () => {
	const language = window.navigator.language;

	if (language.includes('-')) {
		// We use the short language name as a key
		// en-US -> en
		return language.split('-')[0];
	}

	return language;
};

const useI18n = (): I18NOptions => {
	const browserLanguage = getBrowserLanguage();
	const {i18n, language: configuredLanguage} = useContext(OptionsContext);

	// Language given in config has priority over user browser lang; default to en
	// since that's always provided by default options
	return i18n[configuredLanguage] ?? i18n[browserLanguage] ?? i18n.en!;
};

export default useI18n;
