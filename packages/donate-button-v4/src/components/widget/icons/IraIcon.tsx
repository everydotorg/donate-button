import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const IraIcon = () => {
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
				d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M7 7v10M9.1 9H6.1a1.6 1.6 0 0 0 0 3.2h1.8a1.6 1.6 0 0 1 0 3.2H4.5M12 16.5h7.5"
				stroke={primaryColor}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
