import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';
import {ABOUT_URL} from 'src/constants/url';
import css from 'src/helpers/css';

const containerCss = css({
	width: '100%',
	textAlign: 'center'
});

const redirectTextCss = css({
	...smallText,
	color: COLORS.TextOpaque
});

const linkCss = (color: string) =>
	css({
		color,
		textDecoration: 'none',
		cursor: 'pointer'
	});

export const RedirectNotice = () => {
	const {primaryColor} = useConfigContext();

	return (
		<div className={containerCss}>
			<span className={redirectTextCss}>
				Every.org will accept your donation.{' '}
				<a
					href={ABOUT_URL}
					target="_blank"
					rel="noreferrer"
					className={linkCss(primaryColor)}
				>
					Learn More
				</a>
			</span>
		</div>
	);
};
