const { useContext } = require("react")
const { default: OptionsContext } = require("../contexts/optionsContext")

const defaultI18n = 'en';

const getBrowserLanguage = () => {
    const language = window.navigator.language;

    if(language.includes('-')) {
        // We use the short language name as a key
        // en-US -> en
        return language.split('-')[0];
    }

    return language;
}

const useI18n = () => {
    const userI18n = getBrowserLanguage();

    const { i18n } = useContext(OptionsContext);
    return i18n[userI18n] ? i18n[userI18n] : i18n[defaultI18n];
}

export default useI18n;