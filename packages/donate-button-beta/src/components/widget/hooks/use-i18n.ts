import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {Language} from 'src/components/widget/types/language';

const getBrowserLanguage = () => {
	const language = window.navigator.language;

	return language.includes('-') ? language.split('-')[0] : language;
};

export const getTranslations = (
	i18n: Record<string, Language>,
	forceLanguage: string | false
) => {
	const lang = forceLanguage ? forceLanguage : getBrowserLanguage();

	// Language given in config has priority over user browser lang; default to en
	// since that's always provided by default options
	return i18n[lang] ?? i18n.en!;
};

export const useI18n = (): Language => {
	const {i18n, forceLanguage} = useConfigContext();

	return getTranslations(i18n, forceLanguage);
};
