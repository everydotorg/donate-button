import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const BankIcon = () => {
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
				d="M4 8.74348V19.2435M7 19.2435V8.74348M16 8.74348V19.2435M19 19.2435V8.74348M3.5 22.7435H19.5C20.33 22.7435 21 22.7435 21 21.2435C21 19.7435 20.33 19.7435 19.5 19.7435H3.5C2.67 19.7435 2 19.7435 2 21.2435C2 22.7435 2.67 22.7435 3.5 22.7435ZM10.57 2.23348L2.67 6.39348C2.26 6.60348 2 7.03348 2 7.49348C2 8.18348 2.56 8.74348 3.25 8.74348H19.76C20.44 8.74348 21 8.18348 21 7.49348C21 7.03348 20.74 6.60348 20.33 6.39348L12.43 2.23348C11.85 1.92348 11.15 1.92348 10.57 2.23348Z"
				stroke={primaryColor}
				strokeWidth="2"
			/>
		</svg>
	);
};
