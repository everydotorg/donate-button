import {forwardRef} from 'preact/compat';
import {useRef, MutableRef} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {
	textInputContainerCss,
	textInputCss
} from 'src/components/widget/components/TextInput/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import joinClassNames from 'src/helpers/joinClassNames';

interface TextAreaProps
	extends JSXInternal.HTMLAttributes<HTMLTextAreaElement> {
	containerClassName?: string;
	inputClassName?: string;
	containerOnClick?: () => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, ref) => {
		const inputRef = useRef<HTMLTextAreaElement>();
		const {primaryColor} = useConfigContext();

		const {containerClassName, inputClassName, containerOnClick, ...rest} =
			props;

		return (
			<div
				className={joinClassNames([
					textInputContainerCss(primaryColor),
					containerClassName
				])}
				onClick={() => {
					inputRef.current?.focus();
				}}
			>
				<textarea
					ref={(element) => {
						if (element) {
							inputRef.current = element;
							if (ref) {
								(ref as MutableRef<HTMLTextAreaElement>).current = element;
							}
						}
					}}
					className={joinClassNames([textInputCss, inputClassName])}
					{...rest}
				/>
			</div>
		);
	}
);

export default TextArea;
