interface ChevronDownProps {
	color: string;
	className?: string;
}
export const ChevronDown = ({color, className}: ChevronDownProps) => {
	return (
		<svg
			className={className}
			width="10"
			height="5"
			viewBox="0 0 10 5"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 0.5L5 4.5L9 0.5"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
