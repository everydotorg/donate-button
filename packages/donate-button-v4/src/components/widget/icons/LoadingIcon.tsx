import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors';

const DEFAULT_LOADING_SIZE = 72;

const MASK = `data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath class='logoMask' stroke-dasharray='170px' d='M32.547 43C39.081 43 48 38.895 48 29.5C48 20.104 38.132 12.5 29.5 12.5C20.868 12.5 9 19.506 9 36C9 52.495 23.805 59.345 32.547 59.345C41.288 59.345 62.5 54.104 62.5 29.5' stroke='white' stroke-width='10'/%3E%3Canimate attributeType='XML' attributeName='stroke-dashoffset' from='170px' to='-170px' dur='1.25s' repeatCount='indefinite'/%3E%3C/svg%3E%0A`;
const loadingSvgCss = cxs({
	display: 'inline-block',
	verticalAlign: 'middle',

	maskImage: `url("${MASK}")`,
	'-webkit-mask-image': `url("${MASK}")`,
	'-webkit-mask-size': 'cover',
	maskSize: 'cover'
});

const loadingPathCss = (color: string) =>
	cxs({
		fill: color
	});
interface LoadingIconProps {
	size?: number;
	color?: string;
}

export const LoadingIcon = ({
	size = DEFAULT_LOADING_SIZE,
	color = COLORS.LightGray
}: LoadingIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 72 72"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={loadingSvgCss}
		>
			<path
				className={loadingPathCss(color)}
				d="M51.147 28.97C51.147 17.614 41.667 9 29.493 9C15.875 9 5 20.5 5 34.744C5 50.094 17.223 62.365 33.68 62.365C50.137 62.365 64.862 49.325 66.017 32.242H58.51C57.114 45.042 46.287 54.859 33.68 54.859C21.553 54.859 12.555 45.956 12.555 34.744C12.555 24.639 20.062 16.507 29.493 16.507C37.385 16.507 43.593 21.897 43.593 28.97C43.593 34.84 39.358 39.749 33.728 39.749V47.256C43.688 47.256 51.148 38.931 51.148 28.97"
			/>
		</svg>
	);
};
