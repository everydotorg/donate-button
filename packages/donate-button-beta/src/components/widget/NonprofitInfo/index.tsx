import cxs from 'cxs';
import {useEffect, useRef, useState} from 'preact/hooks';
import {InfoPagesNav} from 'src/components/widget/InfoPagesNav';
import {Markdown} from 'src/components/widget/Markdown';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {
	bodyText,
	headingText,
	smallText
} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	...bodyText,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'initial',
	borderBottom: `1px solid ${COLORS.LightGray}`,
	padding: Spacing.Inset_XL,
	color: COLORS.Text,
	[BREAKPOINTS.TabletLandscapeUp]: {
		borderBottom: 'none',
		overflow: 'auto'
	}
});

const nonprofitNameCss = cxs({
	...headingText,
	margin: `0 0 ${Spacing.XXS} 0`
});

const locationAddressCss = cxs({
	...smallText,
	margin: 0,
	textTransform: 'uppercase',
	color: COLORS.TextOpaque
});

const expandableCss = cxs({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
});

const arrowCss = cxs({
	height: '100%',
	cursor: 'pointer',
	transition: 'transform .3s',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

const arrowRotateCss = cxs({
	transform: 'rotate(180deg)'
});

const pagesNavCss = cxs({
	marginTop: Spacing.XL,
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

const expandableContentCss = (height: number) =>
	cxs({
		maxHeight: `${height}px`,
		transition: 'max-height 0.3s ease, margin 0.3s ease',
		overflow: 'hidden',
		marginTop: height ? Spacing.XL : 0,
		' > p': {
			margin: 0,
			padding: 0,
			color: COLORS.Text,
			...bodyText
		},
		[BREAKPOINTS.TabletLandscapeUp]: {
			overflow: 'auto',
			marginTop: Spacing.XL,
			maxHeight: 'unset',
			marginBottom: Spacing.XS
		}
	});

type NonprofitInfo = {
	classes: string[];
};

export const NonprofitInfo = ({classes}: NonprofitInfo) => {
	const {name, locationAddress, description, primaryColor} = useConfigContext();

	const [expanded, setExpanded] = useState(false);
	const [height, setHeight] = useState(0);

	const expandableContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setHeight(expanded ? expandableContentRef.current?.scrollHeight ?? 0 : 0);
	}, [expanded]);

	const arrowClasses = [arrowCss]
		.concat(expanded ? [arrowRotateCss] : [])
		.join(' ');

	return (
		<div className={[containerCss].concat(classes).join(' ')}>
			<div className={expandableCss}>
				<div>
					<h1 className={nonprofitNameCss}>{name}</h1>
					<h2 className={locationAddressCss}>{locationAddress}&nbsp;</h2>
				</div>

				<ChevronDown
					color={primaryColor}
					size={16}
					className={arrowClasses}
					onClick={() => {
						setExpanded((previous) => !previous);
					}}
				/>
			</div>

			<div
				ref={expandableContentRef}
				id="expandable-content"
				className={expandableContentCss(height)}
			>
				<Markdown source={description} />

				<InfoPagesNav classes={[pagesNavCss]} />
			</div>
		</div>
	);
};
