import cxs from 'cxs';
import {useEffect, useState} from 'preact/hooks';
import {Markdown} from 'src/components/widget/Markdown';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';

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

const pageListCss = cxs({
	display: 'flex',
	listStyleType: 'none',
	padding: Spacing.Empty,
	margin: Spacing.Empty,
	'& > *:not(:last-child)': {
		marginRight: Spacing.XXL
	}
});

const pageItemCss = cxs({
	color: COLORS.Primary,
	cursor: 'pointer'
});

const pageSelectedCss = cxs({
	color: COLORS.Black
});

const findPage = (config: InfoPage[], route: string) =>
	config.find((page: InfoPage) => page.key === route);

const Info = () => {
	const {route, setRoute} = useWidgetContext();
	const [selectedPage, setSelectedPage] = useState<InfoPage | undefined>(
		findPage(pageConfig, route)
	);

	useEffect(() => {
		setSelectedPage(findPage(pageConfig, route));
	}, [route]);

	return (
		<SectionContainer
			renderHeader={
				<ul className={pageListCss}>
					{pageConfig.map((page) => (
						<li
							key={page.key}
							className={[pageItemCss]
								.concat(page.key === route ? pageSelectedCss : '')
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
			renderBody={selectedPage && <Markdown source={selectedPage.source} />}
		/>
	);
};

export default Info;
