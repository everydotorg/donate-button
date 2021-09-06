import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import constructEveryUrl from 'src/helpers/construct-every-url';

const containerCss = cxs({
	...smallText,
	padding: Spacing.InsetSquish_S,
	borderTop: '1px solid',
	borderBottom: '1px solid',
	borderColor: COLORS.LightGray,
	[BREAKPOINTS.TabletLandscapeUp]: {
		borderBottom: 'none'
	}
});

const actionLink = (primaryColor: string) =>
	cxs({
		...smallText,
		color: primaryColor,
		cursor: 'pointer',
		textDecoration: 'none'
	});

interface CryptoProps {
	classes: string[];
}

export const Crypto = ({classes}: CryptoProps) => {
	const {nonprofitSlug, primaryColor} = useConfigContext();

	const donateWithCryptoUrl = constructEveryUrl({
		nonprofitSlug,
		crypto: true
	});

	return (
		<div className={[containerCss].concat(classes).join(' ')}>
			Alternate methods:&nbsp;&nbsp;
			<a className={actionLink(primaryColor)} href={donateWithCryptoUrl}>
				Crypto
			</a>
			&nbsp;&nbsp;
			<a
				className={actionLink(primaryColor)}
				href="https://www.every.org/donate-stock"
			>
				Stock
			</a>
			&nbsp;&nbsp;
			<a
				className={actionLink(primaryColor)}
				href="https://support.every.org/hc/en-us/articles/360059998953-How-can-I-donate-using-a-Donor-Advised-Fund-DAF-"
			>
				DAF
			</a>
		</div>
	);
};
