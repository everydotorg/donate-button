import {en} from 'src/components/widget/constants/lang/en';
import {es} from 'src/components/widget/constants/lang/es';
import {WidgetConfig} from 'src/components/widget/types/widget-config';

export const defaults: Partial<WidgetConfig> = {
	name: 'Every Org',
	crypto: false,
	forceLanguage: false,
	i18n: {
		en: {...en},
		es: {...es}
	}
};
