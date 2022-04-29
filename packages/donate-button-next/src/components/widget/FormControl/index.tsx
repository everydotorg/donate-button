import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const labelCss = (isError: boolean) =>
	cxs({
		...bodyText,
		margin: Spacing.Stack_XS,
		color: isError ? COLORS.Error : COLORS.Text
	});

type FormControlProps = {
	label: string;
	children: ComponentChildren;
	isError?: boolean;
};

export const FormControl = ({
	label,
	children,
	isError = false
}: FormControlProps) => {
	return (
		<div>
			<p className={labelCss(isError)}>{label}</p>
			{children}
		</div>
	);
};
