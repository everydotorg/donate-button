import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const labelCss = cxs({
	...labelText,
	margin: Spacing.Stack_XS,
	color: COLORS.Text
});

interface FormControlProps {
	label: string;
	children: ComponentChildren;
}
export const FormControl = ({label, children}: FormControlProps) => {
	return (
		<div>
			<p className={labelCss}>{label}</p>
			{children}
		</div>
	);
};
