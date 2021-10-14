import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {Language} from 'src/components/widget/types/language';

const getBrowserLanguage = () => {
	const language = window.navigator.language;

	return language.includes('-') ? language.split('-')[0] : language;
};

export const getTranslations = (
	i18n: Record<string, Partial<Language>>,
	forceLanguage: string | false
): Language => {
	const lang = forceLanguage ? forceLanguage : getBrowserLanguage();

	// Language given in config has priority over user browser lang; default to en
	// since that's always provided by default options

	if (!i18n[lang] || lang === 'en') {
		return i18n.en as Language;
	}

	// English always has all translations, then overwrite with whatever is available in preferred language
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	return {...i18n.en, ...i18n[lang]} as Language;
};

export const useI18n = (): Language => {
	const {i18n, forceLanguage} = useConfigContext();

	return getTranslations(i18n, forceLanguage);
};
