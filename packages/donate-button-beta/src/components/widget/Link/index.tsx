import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors.enum';

const linkCss = cxs({
	color: COLORS.Primary,
	fontSize: '1rem',
	lineHeight: 1,
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
