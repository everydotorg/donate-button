import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import LeftArrow from 'src/assets/left-arrow.svg';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

const header = cxs({
	display: 'flex',
	padding: Spacing.InsetSquish_S,
	borderBottom: getColoredBorder(Borders.Normal, COLORS.LightGray),

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		border: 'none'
	}
});

const returnButton = cxs({
	padding: Spacing.Empty,
	margin: Spacing.Inline_XXL,
	backgroundColor: COLORS.Transparent,
	border: 'none',
	outline: 'none',
	cursor: 'pointer'
});

const pageList = cxs({
	display: 'flex',
	listStyleType: 'none',
	padding: Spacing.Empty,
	margin: Spacing.Empty,
	'& > *:not(:last-child)': {
		marginRight: Spacing.XXL
	}
});

const pageItem = cxs({
	color: COLORS.Primary,
	cursor: 'pointer'
});

const pageSelected = cxs({
	color: COLORS.Black
});

const content = cxs({
	overflow: 'auto',
	height: '100%',
	padding: '0 1.5rem'
});

const container = cxs({
	display: 'flex',
	flexDirection: 'column',
	gridColumn: '1 / -1',
	gridRow: '1 / -1'
});

const Faq = () => {
	return (
		<Fragment>
			<h1>FAQ</h1>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi incidunt
				odio nesciunt dolor? Ex laboriosam quia eaque recusandae impedit
				laudantium architecto a reprehenderit, laborum cupiditate tempora, illo
				hic repellat obcaecati?
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi incidunt
				odio nesciunt dolor? Ex laboriosam quia eaque recusandae impedit
				laudantium architecto a reprehenderit, laborum cupiditate tempora, illo
				hic repellat obcaecati?
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi incidunt
				odio nesciunt dolor? Ex laboriosam quia eaque recusandae impedit
				laudantium architecto a reprehenderit, laborum cupiditate tempora, illo
				hic repellat obcaecati?
			</p>
		</Fragment>
	);
};

const PrivacyPolicy = () => {
	return (
		<Fragment>
			<h1>Donations Policy</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ab
				pariatur nulla deleniti quod perferendis omnis illo excepturi distinctio
				fuga. Nesciunt pariatur tempore modi laborum eos dolore odit maiores
				recusandae.
			</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ab
				pariatur nulla deleniti quod perferendis omnis illo excepturi distinctio
				fuga. Nesciunt pariatur tempore modi laborum eos dolore odit maiores
				recusandae.
			</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ab
				pariatur nulla deleniti quod perferendis omnis illo excepturi distinctio
				fuga. Nesciunt pariatur tempore modi laborum eos dolore odit maiores
				recusandae.
			</p>
		</Fragment>
	);
};

const Info = () => {
	const {route, setRoute} = useWidgetContext();

	return (
		<div className={container}>
			<div className={header}>
				<button
					type="button"
					className={returnButton}
					onClick={() => {
						setRoute(Routes.DonationForm);
					}}
				>
					<img src={LeftArrow} alt="Back button" />
				</button>
				<ul className={pageList}>
					<li
						className={[pageItem]
							.concat(route === Routes.DonationsPolicy ? pageSelected : '')
							.join(' ')}
						onClick={() => {
							setRoute(Routes.DonationsPolicy);
						}}
					>
						Donations Policy
					</li>
					<li
						className={[pageItem]
							.concat(route === Routes.FAQ ? pageSelected : '')
							.join(' ')}
						onClick={() => {
							setRoute(Routes.FAQ);
						}}
					>
						FAQ
					</li>
				</ul>
			</div>
			<div className={content}>
				{route === Routes.FAQ ? <Faq /> : <PrivacyPolicy />}
			</div>
		</div>
	);
};

export default Info;
