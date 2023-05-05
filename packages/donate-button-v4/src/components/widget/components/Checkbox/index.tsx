import {FunctionComponent} from 'preact';
import {JSXInternal} from 'preact/src/jsx';
import {
	checkboxLabelContainerCss,
	hiddenCheckboxCss,
	checkboxCss,
	checkMarkIconCss,
	checkboxLabelTextCss
} from 'src/components/widget/components/Checkbox/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {CheckMarkIcon} from 'src/components/widget/icons/CheckMarkIcon';

interface CheckboxProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
	children,
	checked,
	className,
	...rest
}) => {
	const {primaryColor} = useConfigContext();
	return (
		<label className={checkboxLabelContainerCss}>
			<div>
				<input
					className={hiddenCheckboxCss}
					type="checkbox"
					defaultChecked={checked}
					role="checkbox"
					{...rest}
				/>
				<div className={checkboxCss({checked, primaryColor})}>
					{checked && <CheckMarkIcon className={checkMarkIconCss} />}
				</div>
			</div>
			<span className={checkboxLabelTextCss}>{children}</span>
		</label>
	);
};
