import {FunctionComponent, Attributes} from 'preact';
import {JSXInternal} from 'preact/src/jsx';
import {getTaxDeductibleStatement} from 'src/components/widget/components/Footer/helpers';
import {
	footerCardCss,
	footerLinkCss
} from 'src/components/widget/components/Footer/styles';
import {GridCard} from 'src/components/widget/components/GridCard';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {
	TERMS_URL,
	HELP_URL,
	FEEDBACK_URL,
	PRIVACY_URL
} from 'src/constants/url';

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

	return (
		<GridCard className={footerCardCss}>
			<p>
				{getTaxDeductibleStatement(nonprofit)}{' '}
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
