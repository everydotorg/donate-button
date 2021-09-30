import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';
import constructEveryUrl from 'src/helpers/construct-every-url';
import {useI18n} from '../hooks/use-i18n';

const containerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	'& > p': {
		color: COLORS.Text,
		margin: 0
	}
});

const linksContainerCss = (primaryColor: string) =>
	cxs({
		display: 'flex',
		alignItems: 'center',
		'& > :not(:last-child)': {
			margin: Spacing.Inline_XL
		},
		'& > a': {
			color: primaryColor,
			cursor: 'pointer',
			textDecoration: 'none'
		}
	});

interface CryptoProps {
	classes: string[];
	noExit?: boolean;
}

export const Crypto = ({classes, noExit}: CryptoProps) => {
	const {nonprofitSlug, primaryColor} = useConfigContext();
	const i18n = useI18n();

	const donateWithCryptoUrl = constructEveryUrl({
		nonprofitSlug,
		crypto: true,
		noExit
	});

	return (
		<div className={classes.concat(containerCss).join(' ')}>
			<p>{i18n.orDonateCrypto}</p>

			<div className={linksContainerCss(primaryColor)}>
				<a href={donateWithCryptoUrl}>Crypto</a>
				<a href="https://www.every.org/donate-stock">Stock</a>
				<a href="https://support.every.org/hc/en-us/articles/360059998953-How-can-I-donate-using-a-Donor-Advised-Fund-DAF-">
					DAF
				</a>
			</div>
		</div>
	);
};
