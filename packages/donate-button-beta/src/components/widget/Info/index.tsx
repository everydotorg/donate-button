import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import {SectionContainer} from 'src/components/widget/SectionContainer';
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
		<SectionContainer
			renderHeader={
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
			}
			renderBody={route === Routes.FAQ ? <Faq /> : <PrivacyPolicy />}
		/>
	);
};

export default Info;
