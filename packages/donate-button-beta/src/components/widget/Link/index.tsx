import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText} from 'src/components/widget/theme/font-sizes';

const linkCss = cxs({
	...linkText,
	color: COLORS.Primary,
	cursor: 'pointer'
});

interface LinkProps {
	label: string;
	onClick: () => void;
}
export const Link = ({label, onClick}: LinkProps) => {
	return (
		<span className={linkCss} onClick={onClick}>
			{label}
		</span>
	);
};
