interface ChevronDownProps {
	color: string;
	classes: string[];
	size?: number;
	onClick?: (event: MouseEvent) => void;
}

export const ChevronDown = ({
	color,
	classes,
	size = 12,
	onClick
}: ChevronDownProps) => {
	return (
		<svg
			className={classes ? classes.join(' ') : undefined}
			width={size}
			height={size}
			viewBox="0 0 10 5"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
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
