import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText} from 'src/components/widget/theme/font-sizes';

const linkCss = (primaryColor: string) =>
	cxs({
		...linkText,
		color: primaryColor,
		cursor: 'pointer'
	});

interface LinkProps {
	label: string;
	onClick: () => void;
}
export const Link = ({label, onClick}: LinkProps) => {
	const {primaryColor} = useConfigContext();

	return (
		<span className={linkCss(primaryColor)} onClick={onClick}>
			{label}
		</span>
	);
};
