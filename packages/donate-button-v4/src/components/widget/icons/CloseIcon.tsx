import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const CloseIcon = () => {
	const {primaryColor} = useConfigContext();

	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18 6L6 18"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6 6L18 18"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
