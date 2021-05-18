import {COLORS} from 'src/components/widget/theme/colors';

export enum Borders {
	Normal = '1px solid',
	Big = '4px solid'
}

export const getColoredBorder = (border: Borders, color: COLORS) =>
	`${border} ${color}`;
