import cxs from 'cxs';
import {useEffect, useState} from 'preact/hooks';
import {Markdown} from 'src/components/widget/Markdown';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {Spacing} from 'src/components/widget/theme/spacing';
import {InfoPage} from 'src/components/widget/types/pages';

const pageListCss = cxs({
	display: 'flex',
	listStyleType: 'none',
	padding: Spacing.Empty,
	margin: Spacing.Empty,
	'& > *:not(:last-child)': {
		marginRight: Spacing.XXL
	},
	'& > li': {
		transform: 'translateY(0.09em)'
	}
});

const pageItemCss = (primaryColor: string, selected: boolean) =>
	cxs({
		color: selected ? COLORS.Black : primaryColor,
		cursor: 'pointer'
	});

const findPage = (config: InfoPage[], route: string) =>
	config.find((page: InfoPage) => page.key === route);

export const Info = () => {
	const {infoPages, primaryColor} = useConfigContext();

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
							className={pageItemCss(primaryColor, page.key === route)}
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
