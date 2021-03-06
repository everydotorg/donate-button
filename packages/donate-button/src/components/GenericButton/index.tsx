import {JSXInternal} from 'preact/src/jsx';
import styles from 'src/components/EveryMonth/style.css';
import genericButtonStyles from 'src/components/GenericButton/generic-button.css';
import {Styled} from 'src/components/Styled';
import {GenericButtonProps} from 'src/helpers/options-types';

const GenericButton = ({
	label = 'Donate',
	withLogo = true,
	textColor = '#fff',
	bgColor,
	borderRadius,
	fontSize,
	padding,
	classes = [],
	onClick,
	hrefUrl
}: GenericButtonProps) => {
	const outsideClasses = typeof classes === 'string' ? [classes] : classes;

	const handleClick = (
		event: JSXInternal.TargetedMouseEvent<HTMLAnchorElement>
	) => {
		event.preventDefault();
		onClick();
	};

	return (
		<Styled styles={[genericButtonStyles, styles]} scoped={false}>
			<a
				href={hrefUrl}
				style={{
					background: bgColor,
					color: textColor,
					borderRadius,
					fontSize,
					padding
				}}
				className={['Every-GenericButton'].concat(outsideClasses).join(' ')}
				onClick={handleClick}
			>
				{withLogo && (
					<svg
						className="Every-GenericButton__logo"
						style={{
							color: textColor,
							height: fontSize,
							width: fontSize,
							fill: textColor
						}}
						width="64"
						height="56"
						viewBox="0 0 64 56"
						fill={textColor}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M48.3746 20.9558C48.3746 9.03877 38.4374 0 25.6754 0C11.4001 0 0 12.0685 0 27.0153C0 43.1235 12.8125 56 30.0639 56C47.3153 56 62.7508 42.3156 63.9614 24.3895H56.0924C54.6295 37.8215 43.2799 48.1226 30.0639 48.1226C17.3523 48.1226 7.91952 38.7809 7.91952 27.0153C7.91952 16.4112 15.7886 7.87737 25.6754 7.87737C33.948 7.87737 40.4551 13.5329 40.4551 20.9558C40.4551 27.1163 36.0161 32.2669 30.1143 32.2669V40.1443C40.556 40.1443 48.3746 31.4085 48.3746 20.9558Z" />
					</svg>
				)}
				<span className="u-center-font">{label}</span>
			</a>
		</Styled>
	);
};

export default GenericButton;
