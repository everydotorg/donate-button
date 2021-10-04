import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

type InfoPagesNavProps = {
	classes: string[];
};

const containerCss = (primaryColor: string) =>
	cxs({
		display: 'flex',
		alignItems: 'center',
		'& > span': {
			color: primaryColor,
			cursor: 'pointer'
		},
		'& > :not(:last-child)': {
			margin: Spacing.Inline_XL
		}
	});

export const InfoPagesNav = ({classes}: InfoPagesNavProps) => {
	const {infoPages, primaryColor} = useConfigContext();
	const {setRoute} = useWidgetContext();

	return (
		<div className={classes.concat(containerCss(primaryColor)).join(' ')}>
			{infoPages?.map((page) => (
				<span
					key={page.key}
					onClick={() => {
						setRoute(page.key);
					}}
				>
					{page.name}
				</span>
			))}
		</div>
	);
};
