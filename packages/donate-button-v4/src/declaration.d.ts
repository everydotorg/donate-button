declare module '*.css' {
	const mapping: Record<string, string>;
	export default mapping;
}

declare module '*.svg' {
	const url: string;
	export default url;
}

declare module '*.png';
