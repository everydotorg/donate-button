export function isPresent<T>(value: T): value is Exclude<T, null | undefined> {
	return !(value === null || value === undefined);
}

function addParameters(
	link: string,
	parameters: Record<string, string | number | boolean>
) {
	// We don't use URLSearchParams here because it changes spaces to +s instead
	// of %20, and some mail clients like Apple don't handle that well.
	const queryString = Object.entries(parameters)
		.map(([key, value]) => {
			try {
				// eslint-disable-next-line unicorn/no-array-callback-reference
				return [key, value].map(encodeURIComponent).join('=');
			} catch {
				return null;
			}
		})
		// eslint-disable-next-line unicorn/no-array-callback-reference
		.filter(isPresent)
		.join('&');
	return queryString ? [link, queryString].join('?') : link;
}

export function mailToLink(parameters: {
	address?: string;
	subject?: string;
	body?: string;
}) {
	return addParameters(`mailto:${parameters.address ?? ''}`, {
		...(parameters.subject ? {subject: parameters.subject} : {}),
		...(parameters.body ? {body: parameters.body} : {})
	});
}
