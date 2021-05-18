import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import LeftArrow from 'src/assets/left-arrow.svg';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints.enum';
import {COLORS} from 'src/components/widget/theme/colors.enum';
import useShowForm from 'src/hooks/use-show-form';

const header = cxs({
	display: 'flex',
	padding: '1rem 1.5rem',
	borderBottom: `1px solid ${COLORS.LightGray}`,

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		border: 'none'
	}
});

const returnButton = cxs({
	padding: 0,
	margin: '0 2rem 0 0',
	backgroundColor: 'transparent',
	border: 'none',
	outline: 'none',
	cursor: 'pointer'
});

const pageList = cxs({
	display: 'flex',
	listStyleType: 'none',
	padding: 0,
	margin: 0,
	'& > *:not(:last-child)': {
		marginRight: '2rem'
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
	const {route, setRoute} = useShowForm();

	return (
		<div className={container}>
			<div className={header}>
				<button
					type="button"
					className={returnButton}
					onClick={() => {
						setRoute('donation-form');
					}}
				>
					<img src={LeftArrow} alt="Back button" />
				</button>
				<ul className={pageList}>
					<li
						className={[pageItem]
							.concat(route === 'donations-policy' ? pageSelected : '')
							.join(' ')}
						onClick={() => {
							setRoute('donations-policy');
						}}
					>
						Donations Policy
					</li>
					<li
						className={[pageItem]
							.concat(route === 'faq' ? pageSelected : '')
							.join(' ')}
						onClick={() => {
							setRoute('faq');
						}}
					>
						FAQ
					</li>
				</ul>
			</div>
			<div className={content}>
				{route === 'faq' ? <Faq /> : <PrivacyPolicy />}
			</div>
		</div>
	);
};

export default Info;
