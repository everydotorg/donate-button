import cxs from 'cxs';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';

const redirectTextCss = cxs({
	...smallText,
	color: COLORS.TextOpaque,
	alignSelf: 'end',
	marginBottom: 0
});

export const RedirectNotice = () => {
	const {simpleRedirectNotice} = useI18n();
	return <p className={redirectTextCss}>{simpleRedirectNotice}</p>;
};
