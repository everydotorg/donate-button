import cxs from 'cxs';
import {useEffect, useState} from 'preact/hooks';
import {Markdown} from 'src/components/widget/Markdown';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';

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
	const {infoPages} = useConfigContext();

	const {route, setRoute} = useWidgetContext();
	const [selectedPage, setSelectedPage] = useState<InfoPage | undefined>(
		findPage(infoPages, route)
	);

	useEffect(() => {
		setSelectedPage(findPage(infoPages, route));
	}, [infoPages, route]);

	return (
		<SectionContainer
			renderHeader={
				<ul className={pageListCss}>
					{infoPages.map((page) => (
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
