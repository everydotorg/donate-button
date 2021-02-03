import {useContext} from 'preact/hooks';

import {OptionsContext} from '../contexts/optionsContext';

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
	const userI18n = getBrowserLanguage();
	const {i18n, language} = useContext(OptionsContext);

	// Language given in config has priority over user browser lang
	if (i18n[language]) {
		return i18n[language];
	}

	return i18n[userI18n] ? i18n[userI18n] : i18n[defaultI18n];
};

export default useI18n;
