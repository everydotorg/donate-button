import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const StocksIcon = () => {
	const {primaryColor} = useConfigContext();
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			display="ACCENT"
		>
			<path
				d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M4.5 16.5L6 14l5 1 2.5-2h3l3-5.5"
				stroke={primaryColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
