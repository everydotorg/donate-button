import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const ArrowBackIcon = () => {
	const {primaryColor} = useConfigContext();
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke={primaryColor} strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
	);
};
