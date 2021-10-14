export const isUrl = (text: string): boolean => {
	try {
		const url = new URL(text);

		return ['http:', 'https:'].includes(url.protocol);
	} catch {
		return false;
	}
};
