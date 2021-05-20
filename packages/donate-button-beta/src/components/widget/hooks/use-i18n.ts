import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {Language} from 'src/components/widget/types/language';

const getBrowserLanguage = () => {
	const language = window.navigator.language;

	return language.includes('-') ? language.split('-')[0] : language;
};

const useI18n = (): Language => {
	const {i18n, forceLanguage} = useConfigContext();

	const lang = forceLanguage ? forceLanguage : getBrowserLanguage();

	// Language given in config has priority over user browser lang; default to en
	// since that's always provided by default options
	return i18n[lang] ?? i18n.en!;
};

export default useI18n;
