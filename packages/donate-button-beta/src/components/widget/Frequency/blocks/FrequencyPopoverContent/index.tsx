import cxs from 'cxs';
import closeSvg from 'src/assets/close.svg';
import {COLORS} from 'src/components/widget/theme/colors.enum';
import constructEveryUrl from 'src/helpers/construct-every-url';

const containerCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem',
	zIndex: 1
});

const headerCss = cxs({
	display: 'flex',
	alignItems: 'flex-start'
});

const titleCss = cxs({
	flex: 1,
	marginRight: '1rem',
	margin: 0
});

const closeButtonCss = cxs({
	background: 'transparent',
	padding: 0,
	margin: 0,
	border: 'none',
	outline: 'none',
	cursor: 'pointer'
});

const dividerCss = cxs({
	height: '1px',
	background: COLORS.LightGray,
	margin: '1rem -1rem 1rem -1rem'
});

const actionLink = cxs({
	border: `1px solid ${COLORS.LightGray}`,
	borderRadius: '8px',
	color: COLORS.Primary,
	padding: '0.5rem 1rem',
	background: 'transparent',
	cursor: 'pointer',
	textDecoration: 'none',
	textAlign: 'center'
});

interface FrequencyPopoverContentProps {
	onClose: () => void;
	nonprofitSlug: string;
}
export const FrequencyPopoverContent = ({
	onClose,
	nonprofitSlug
}: FrequencyPopoverContentProps) => {
	const donateWithCryptoUrl = constructEveryUrl({nonprofitSlug, crypto: true});

	return (
		<div className={containerCss}>
			<div className={headerCss}>
				<p className={titleCss}>
					Monthly gifts help nonprofits focus on their mission and long-term
					impact, not fundraising.
				</p>
				<button className={closeButtonCss} type="button" onClick={onClose}>
					<img src={closeSvg} />
				</button>
			</div>
			<div className={dividerCss} />
			<a type="button" className={actionLink} href={donateWithCryptoUrl}>
				Donate with Crypto, Stocks or DAF
			</a>
		</div>
	);
};
