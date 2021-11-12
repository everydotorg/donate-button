import cxs from 'cxs';
import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';
import {InfoPagesNav} from 'src/components/widget/InfoPagesNav';
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

const expandableContentCss = (height: number, fontSize: number) =>
	cxs({
		...bodyText,
		maxHeight: `${height}px`,
		transition: 'max-height 0.3s ease, margin 0.3s ease',
		overflow: 'hidden',
		marginTop: height ? Spacing.XL : 0,
		color: COLORS.Text,
		[BREAKPOINTS.TabletLandscapeUp]: {
			overflow: 'auto',
			marginTop: Spacing.XL,
			maxHeight: 'unset',
			'& > span': {
				fontSize: `${fontSize}px`,
				lineHeight: fontSize === 14 ? '22px' : '24px'
			}
		}
	});

type NonprofitInfo = {
	classes: string[];
};

export const NonprofitInfo = ({classes}: NonprofitInfo) => {
	const {
		name,
		locationAddress,
		description,
		primaryColor,
		infoPages,
		showFundraiser,
		showInputButtons
	} = useConfigContext();

	const [expanded, setExpanded] = useState(false);
	const [height, setHeight] = useState(0);
	const [fontSize, setFontSize] = useState(showInputButtons ? 16 : 14);

	const expandableContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setHeight(expanded ? expandableContentRef.current?.scrollHeight ?? 0 : 0);
	}, [expanded]);

	// Fix the font size if the description overflows its container
	useLayoutEffect(() => {
		const current = expandableContentRef.current;

		if (current && current.scrollHeight > current.clientHeight) setFontSize(14);
	}, [description]);

	return (
		<div className={[containerCss].concat(classes).join(' ')}>
			<div
				className={expandableCss}
				onClick={() => {
					setExpanded((previous) => !previous);
				}}
			>
				<div>
					<h1 className={nonprofitNameCss}>{name}</h1>
					<h2 className={locationAddressCss}>{locationAddress}&nbsp;</h2>
				</div>

				<ChevronDown
					classes={[arrowCss].concat(expanded ? [arrowRotateCss] : [])}
					color={primaryColor}
					size={16}
				/>
			</div>

			<div
				ref={expandableContentRef}
				id="expandable-content"
				className={expandableContentCss(height, fontSize)}
			>
				<span>{description}</span>

				{(infoPages?.length || showFundraiser) && (
					<InfoPagesNav classes={[pagesNavCss]} />
				)}
			</div>
		</div>
	);
};
