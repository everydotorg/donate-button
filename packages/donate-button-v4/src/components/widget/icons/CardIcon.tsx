import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const CardIcon = () => {
	const {primaryColor} = useConfigContext();
	return (
		<svg
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21 4.74316H3C1.89543 4.74316 1 5.63859 1 6.74316V18.7432C1 19.8477 1.89543 20.7432 3 20.7432H21C22.1046 20.7432 23 19.8477 23 18.7432V6.74316C23 5.63859 22.1046 4.74316 21 4.74316Z"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M1 10.7432H23"
				stroke={primaryColor}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};
