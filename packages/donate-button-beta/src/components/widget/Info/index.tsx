import cxs from 'cxs';
import {useEffect, useState} from 'preact/hooks';
import LeftArrow from 'src/assets/left-arrow.svg';
import {Markdown} from 'src/components/widget/Markdown';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

export const pageConfig: InfoPage[] = [
	{
		key: 'faq',
		name: 'FAQ',
		source:
			'https://raw.githubusercontent.com/julianpoma/stream-parser/master/README.md'
	},
	{
		key: 'donation-policy',
		name: 'Donation Policy',
		source:
			'# Donation Policy\nThis **is a** paragraph\nThis is _another_ paragraph. And this is a [Link](https://google.com)'
	}
];

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

const findPage = (config: any, route: string): InfoPage =>
	config.find((page: InfoPage) => page.key === route);

const Info = () => {
	const {route, setRoute} = useWidgetContext();
	const [selectedPage, setSelectedPage] = useState<InfoPage>(
		findPage(pageConfig, route)
	);

	useEffect(() => {
		setSelectedPage(findPage(pageConfig, route));
	}, [route]);

	return (
		<SectionContainer
			renderHeader={
				<ul className={pageList}>
					{pageConfig.map((page) => (
						<li
							key={page.key}
							className={[pageItem]
								.concat(page.key === route ? pageSelected : '')
								.join(' ')}
							onClick={() => {
								setRoute(page.key);
							}}
						>
							{page.name}
						</li>
					))}
				</ul>
			}
			renderBody={<Markdown source={selectedPage.source} />}
		/>
	);
};

export default Info;
