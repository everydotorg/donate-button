import {FunctionComponent} from 'preact';
import {JSXInternal} from 'preact/src/jsx';
import {getTaxDeductibleStatement} from 'src/components/widget/components/Footer/helpers';
import {
	footerCardCss,
	footerLinkCss
} from 'src/components/widget/components/Footer/styles';
import {GridCard} from 'src/components/widget/components/GridCard';
import {useFundraiserOrUndefined} from 'src/components/widget/hooks/useFundraiser';
import {
	useNonprofitOrError,
	useParentNonprofit
} from 'src/components/widget/hooks/useNonprofit';
import {
	TERMS_URL,
	HELP_URL,
	PRIVACY_URL,
	SUPPORT_EMAIL
} from 'src/constants/url';
import {mailToLink} from 'src/helpers/mailToLink';

const FEEDBACK_URL = mailToLink({address: SUPPORT_EMAIL});
interface FooterLinkProps
	extends JSXInternal.HTMLAttributes<HTMLAnchorElement> {}
const FooterLink: FunctionComponent<FooterLinkProps> = ({
	children,
	...rest
}) => (
	<a className={footerLinkCss} {...rest}>
		{children}
	</a>
);

export const Footer = () => {
	const nonprofit = useNonprofitOrError();
	const fundraiser = useFundraiserOrUndefined();
	const parentNonprofit = useParentNonprofit();

	return (
		<GridCard className={footerCardCss}>
			<p>
				{getTaxDeductibleStatement(nonprofit, fundraiser, parentNonprofit)}{' '}
				<FooterLink href={TERMS_URL}>See Terms</FooterLink>
			</p>
			<p>
				Need help? See FAQs or contact us at our{' '}
				<FooterLink href={HELP_URL}>Help Center</FooterLink>.
			</p>
			<p>
				Have ideas for how we can build a better donation experience?{' '}
				<FooterLink href={FEEDBACK_URL}>Send us feedback</FooterLink>.
			</p>
			<p>
				We respect your privacy. To learn more, check out our{' '}
				<FooterLink href={PRIVACY_URL}>Privacy Policy</FooterLink>.
			</p>
		</GridCard>
	);
};
