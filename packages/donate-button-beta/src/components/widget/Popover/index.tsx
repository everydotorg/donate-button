import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {forwardRef} from 'preact/compat';
import {Ref, useEffect, useState} from 'preact/hooks';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';

const containerCss = cxs({
	position: 'absolute',
	borderRadius: Radii.Default,
	boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	background: COLORS.White,
	display: 'flex',
	flexDirection: 'column',
	zIndex: 2,
	width: '100%'
});

const arrowCss = cxs({
	width: '16px',
	height: '16px',
	borderRadius: Radii.Small,
	borderTop: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderLeft: getColoredBorder(Borders.Normal, COLORS.LightGray),
	transform: 'translate(-50%, -50%) rotate(45deg)',
	transformOrigin: 'center',
	position: 'absolute',
	top: 0,
	zIndex: 1,
	background: '#FFF'
});

const Arrow = ({left}: {left: string}) => {
	return <div className={arrowCss} style={{left}} />;
};

interface PopoverProps {
	children: ComponentChildren;
	arrowPosition?: string;
}
export const Popover = forwardRef(
	(
		{children, arrowPosition = '25%'}: PopoverProps,
		ref: Ref<HTMLDivElement>
	) => {
		const [top, setTop] = useState('0');

		useEffect(() => {
			if (ref?.current) {
				ref.current.style.position = 'relative';
				const {height} = ref.current.getBoundingClientRect();
				setTop(`${height + 16}px`);
			}
		}, [ref]);

		return (
			<div className={containerCss} style={{top}}>
				<Arrow left={arrowPosition} />
				{children}
			</div>
		);
	}
);
