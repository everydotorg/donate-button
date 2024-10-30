import {FunctionalComponent, VNode} from 'preact';
import {useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {
	getDisbursementDescription,
	getFeeDescription,
	getNonprofitName
} from 'src/components/widget/components/Faq/helpers';
import {
	faqItemConateinerCss,
	faqItemButtonCss,
	descriptionOpen,
	descriptionClose,
	faqLinkCss,
	faqListCss
} from 'src/components/widget/components/Faq/styles';
import {getTaxDeductibleStatement} from 'src/components/widget/components/Footer/helpers';
import {GridCard} from 'src/components/widget/components/GridCard';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useFundraiserOrUndefined} from 'src/components/widget/hooks/useFundraiser';
import {
	useNonprofitOrError,
	useParentNonprofit
} from 'src/components/widget/hooks/useNonprofit';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {ArrowIcon} from 'src/components/widget/icons/ArrowIcon';
import {BASE_URL, FUNDRAISER_ROUTE} from 'src/constants/url';

interface FaqItemTypes {
	id: string;
	title: string;
	description: VNode;
	mobileOnly?: boolean;
	hideSlugList?: string[];
}

const FaqItem: FunctionalComponent<{faqData: FaqItemTypes}> = ({faqData}) => {
	const [isOpen, setOpen] = useState(false);
	const {nonprofitSlug} = useConfigContext();

	if (faqData.hideSlugList?.includes(nonprofitSlug)) {
		return null;
	}

	return (
		<div className={faqItemConateinerCss(faqData.mobileOnly)}>
			<button
				type="button"
				className={faqItemButtonCss(isOpen)}
				onClick={() => {
					setOpen(!isOpen);
				}}
			>
				<span>{faqData.title}</span>
				<ArrowIcon />
			</button>
			<div className={isOpen ? descriptionOpen : descriptionClose}>
				{faqData.description}
			</div>
		</div>
	);
};

export const Faq = () => {
	const nonprofit = useNonprofitOrError();
	const fundraiser = useFundraiserOrUndefined();
	const parentNonprofit = useParentNonprofit();
	const {selectedPaymentMethod} = useWidgetContext();

	const faqDataList: FaqItemTypes[] = [
		{
			id: 'intro',
			title: 'How does Every.org accept my donation?',
			description: (
				<Fragment>
					<p>
						Your donation is made to Every.org, a US 501(c)(3) public charity.
						Every.org will immediately send you a receipt by email.{' '}
						{getDisbursementDescription(nonprofit)}
					</p>
					<p>
						This process ensures your eligibility for a tax deduction, enables
						you to consolidate your gift records, and reduces the burden on{' '}
						{getNonprofitName(nonprofit)}.
					</p>
				</Fragment>
			)
		},
		{
			id: 'fees',
			title: 'Are there any fees?',
			description: getFeeDescription(selectedPaymentMethod, nonprofit)
		},
		{
			id: 'tax',
			title: 'Is this donation tax-deductible?',
			description: (
				<p>
					Yes,{' '}
					{getTaxDeductibleStatement(nonprofit, fundraiser, parentNonprofit)}
				</p>
			)
		},
		{
			id: 'receipt',
			title: 'Will I receive a receipt for my donation?',
			description: (
				<Fragment>
					<p>
						Yes, after your donation payment is confirmed, you will immediately
						get a receipt emailed to you.
					</p>
					<p>
						Additionally, if you have an Every.org account, you can always get a
						single itemized receipt that shows all your donations in a given
						year.
					</p>
				</Fragment>
			)
		},
		{
			id: 'p2p',
			mobileOnly: true,
			hideSlugList: ['irc'],
			title: `How else can I support ${nonprofit.name}?`,
			description: (
				<p>
					You can also rally your friends, family, and social networks to
					support this nonprofit by starting your own fundraiser for them.{' '}
					<a
						className={faqLinkCss}
						href={BASE_URL + nonprofit.primarySlug + '/' + FUNDRAISER_ROUTE}
					>
						Start a fundraiser for {nonprofit.name}
					</a>
				</p>
			)
		}
	];

	return (
		<GridCard>
			<div className={faqListCss}>
				{faqDataList.map((item) => (
					<FaqItem key={item.id} faqData={item} />
				))}
			</div>
		</GridCard>
	);
};
