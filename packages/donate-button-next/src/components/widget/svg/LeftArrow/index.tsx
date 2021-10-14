interface LeftArrowProps {
	color: string;
	className?: string;
}
export const LeftArrow = ({color, className}: LeftArrowProps) => {
	return (
		<svg
			className={className}
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M18 9H2M2 9L10 1M2 9L10 17" stroke={color} strokeWidth="2" />
		</svg>
	);
};
