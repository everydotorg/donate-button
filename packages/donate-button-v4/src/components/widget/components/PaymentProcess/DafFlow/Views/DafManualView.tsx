import cxs from 'cxs';
import {linkCss} from 'src/components/widget/components/FundraiserLink/styles';
import {BackButton} from 'src/components/widget/components/PaymentProcess/BackButton';
import {
	DafFlowViewProps,
	DafFlowView
} from 'src/components/widget/components/PaymentProcess/DafFlow/types';
import {
	formContainerCss,
	formCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing, verticalStackCss} from 'src/components/widget/theme/spacing';

export const DafManualView = ({changeView}: DafFlowViewProps) => {
	const {primaryColor} = useConfigContext();
	return (
		<div className={formCss}>
			<BackButton
				handleClick={() => {
					changeView(DafFlowView.START);
				}}
			/>
			<div className={formContainerCss}>
				<h3>Manual DAF donation</h3>
				<p>
					Please ask your provider to make a one-time or recurring grant to:
				</p>
				<div className={verticalStackCss.className(Spacing.S)}>
					<p className={verticalStackCss.className(0)}>
						<span>Every.org (EIN: 61-1913297)</span>
						<span>58 West Portal Ave #781 San Francisco, CA 94127</span>
						<span>
							Memo: For every.org/themarshallproject from @darth.vader506
						</span>
						<span>Contact info: Mark Ulrich, CEO</span>
						<span>Email: team@every.org</span>
						<span>Phone number: +1 (415) 650-0503</span>
					</p>
					<p>
						You may also email us at{' '}
						<a
							className={linkCss(primaryColor)}
							href="mailto:team@every.org?subject=Donation%20via%20DAF"
						>
							team@every.org
						</a>{' '}
						with the memo or to let us know if you wish to share your contact
						information with the nonprofit/campaign. By default, we do not share
						your contact information
					</p>
				</div>
				<div
					className={cxs({
						color: COLORS.TextGray,
						...verticalStackCss.cxs(0)
					})}
				>
					<p
						className={cxs({
							paddingBottom: Spacing.S
						})}
					>
						We will attribute the donation accordingly:
					</p>
					<p>
						If we receive BOTH your @username and a nonprofit/campaign: we will
						add a donation for that nonprofit/campaign to your account.
					</p>
					<p>
						If we receive only your @username, we will credit your
						account&apos;s gift card balance in the amount received, which you
						can use to support as many nonprofits as you&apos;d like.
					</p>
					<p>
						If we receive only a nonprofit/campaign, we will send that amount to
						that nonprofit/campaign as an anonymous donation.
					</p>
					<p>
						If we do not receive any information by the time the wire/ACH is
						received, we will apply it towards running Every.org.
					</p>
				</div>
			</div>
		</div>
	);
};
