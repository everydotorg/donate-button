const { useContext } = require("react")
const { default: OptionsContext } = require("../EveryMonth/optionsContext")

const defaultI18n = 'en';

const useI18n = () => {
    // get internationalization from the browser maybe
    const userI18n = 'en';

    const { i18n } = useContext(OptionsContext);
    return i18n[userI18n] ? i18n[userI18n] : i18n[defaultI18n];
}

export default useI18n;