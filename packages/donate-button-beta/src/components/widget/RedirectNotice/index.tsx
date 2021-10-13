import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';

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
					rel="noreferrer"
					className={linkCss(primaryColor)}
				>
					{learnMore}
				</a>
			</span>
		</div>
	);
};
