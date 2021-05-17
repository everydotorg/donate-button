import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {forwardRef} from 'preact/compat';
import {Ref, useEffect, useState} from 'preact/hooks';
import {COLORS} from 'src/components/widget/theme/colors.enum';

const containerCss = cxs({
	position: 'absolute',
	borderRadius: '8px',
	boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
	border: `1px solid ${COLORS.LightGray}`,
	background: '#fff',
	display: 'flex',
	flexDirection: 'column',
	zIndex: 2,
	width: '100%'
});

const arrowCss = cxs({
	width: '1rem',
	height: '1rem',
	borderRadius: '1px',
	borderTop: `1px solid ${COLORS.LightGray}`,
	borderLeft: `1px solid ${COLORS.LightGray}`,
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
}
export const Popover = forwardRef(
	({children}: PopoverProps, ref: Ref<HTMLDivElement>) => {
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
				<Arrow left="25%" />
				{children}
			</div>
		);
	}
);
