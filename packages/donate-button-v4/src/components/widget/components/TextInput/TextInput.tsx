import {ComponentChild} from 'preact';
import {forwardRef, useRef} from 'preact/compat';
import {MutableRef} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {donationAmountInputContainerErrorCss} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {
	textInputContainerCss,
	textInputCss
} from 'src/components/widget/components/TextInput/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {COLORS} from 'src/components/widget/theme/colors';
import joinClassNames from 'src/helpers/joinClassNames';

interface TextInputProps
	extends Omit<
		JSXInternal.HTMLAttributes<HTMLInputElement>,
		'sufix' | 'prefix'
	> {
	sufix?: ComponentChild;
	sufixClassName?: string;
	prefix?: ComponentChild;
	prefixClassName?: string;
	containerClassName?: string;
	inputClassName?: string;
	containerOnClick?: () => void;
	error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
	const {
		sufix,
		sufixClassName,
		prefix,
		prefixClassName,
		containerClassName,
		inputClassName,
		containerOnClick,
		error,
		...rest
	} = props;
	const inputRef = useRef<HTMLInputElement>();
	const {primaryColor} = useConfigContext();

	return (
		<div
			className={joinClassNames([
				textInputContainerCss(primaryColor, Boolean(error)),
				containerClassName
			])}
			onClick={() => {
				if (containerOnClick) {
					containerOnClick();
					return;
				}

				inputRef.current?.focus();
			}}
		>
			{prefix && <div className={prefixClassName}>{prefix}</div>}
			<input
				ref={(element) => {
					if (element) {
						inputRef.current = element;
						if (ref) {
							(ref as MutableRef<HTMLInputElement>).current = element;
						}
					}
				}}
				className={joinClassNames([textInputCss, inputClassName])}
				{...rest}
			/>
			{sufix && <div className={sufixClassName}>{sufix}</div>}
		</div>
	);
});

export default TextInput;
