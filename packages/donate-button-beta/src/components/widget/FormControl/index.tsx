import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const labelCss = (error: boolean) =>
	cxs({
		...bodyText,
		margin: Spacing.Stack_XS,
		color: error ? COLORS.Error : COLORS.Text
	});

type FormControlProps = {
	label: string;
	children: ComponentChildren;
	error?: boolean;
};

export const FormControl = ({
	label,
	children,
	error = false
}: FormControlProps) => {
	return (
		<div>
			<p className={labelCss(error)}>{label}</p>
			{children}
		</div>
	);
};
