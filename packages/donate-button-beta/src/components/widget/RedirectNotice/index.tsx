import cxs from 'cxs';
import {useMemo} from 'preact/hooks';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {replaceKeys} from 'src/helpers/interpolation';

const redirectTextCss = cxs({
	...labelText,
	color: COLORS.TextOpaque
});

export const RedirectNotice = () => {
	const {donationRedirectNotice} = useI18n();
	const {currency, country} = useWidgetContext();

	const redirectNotice = useMemo(
		() => replaceKeys({currency, country}, donationRedirectNotice),
		[donationRedirectNotice, currency, country]
	);

	return <p className={redirectTextCss}>{redirectNotice}</p>;
};
