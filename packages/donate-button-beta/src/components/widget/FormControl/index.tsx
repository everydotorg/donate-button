import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors.enum';

const labelCss = cxs({
	margin: 0,
	fontSize: '1rem',
	lineHeight: 1.5,
	marginBottom: '0.5rem',
	color: COLORS.Text
});

interface FormControlProps {
	label: string;
	children: React.ReactNode;
}
export const FormControl = ({label, children}: FormControlProps) => {
	return (
		<div>
			<p className={labelCss}>{label}</p>
			{children}
		</div>
	);
};
