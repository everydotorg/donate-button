export enum Borders {
	Normal = '1px solid',
	Big = '4px solid'
}

export const getColoredBorder = (border: Borders, color: string) =>
	`${border} ${color}`;
