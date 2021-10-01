import cxs from 'cxs';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';
import {useConfigContext} from '../hooks/use-config-context';

const containerCss = cxs({
	width: '100%',
	textAlign: 'center'
});

const redirectTextCss = cxs({
	...smallText,
	color: COLORS.TextOpaque
});

const linkCss = (color: string) =>
	cxs({
		color,
		textDecoration: 'none',
		cursor: 'pointer'
	});

export const RedirectNotice = () => {
	const {simpleRedirectNotice, learnMore} = useI18n();
	const {primaryColor} = useConfigContext();

	return (
		<div className={containerCss}>
			<span className={redirectTextCss}>
				{simpleRedirectNotice}{' '}
				<a
					href="https://www.every.org/about-us"
					target="_blank"
					className={linkCss(primaryColor)}
				>
					{learnMore}
				</a>
			</span>
		</div>
	);
};
