import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import constructEveryUrl from 'src/helpers/construct-every-url';

const containerCss = cxs({
	padding: Spacing.InsetSquish_S,
	borderTop: '1px solid',
	borderBottom: '1px solid',
	// BorderColor: COLORS.LightGray,
	borderColor: 'transparent',
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

	const donateWithCryptoUrl = constructEveryUrl({nonprofitSlug, crypto: true});

	return (
		<div className={[containerCss].concat(classes).join(' ')}>
			{/* <a className={actionLink(primaryColor)} href={donateWithCryptoUrl}>
				Donate with Crypto or stocks
			</a> */}
			<span>&nbsp;</span>
		</div>
	);
};
