const UTM_MEDIUM = 'donate-button-0.3'; // Update this if the major version changes

function constructEveryUrl({
	nonprofitSlug,
	crypto
}: {
	nonprofitSlug: string;
	crypto: boolean;
}) {
	const baseUrl = `https://www.every.org/${nonprofitSlug}/donate${
		crypto ? '/crypto' : ''
	}`;
	const parameters = Object.entries({
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM
	})
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.map((part) => encodeURIComponent(part)).join('='))
		.join('&');

	return `${baseUrl}?${parameters}`;
}

export default constructEveryUrl;
