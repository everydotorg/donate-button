import {
	DonationFrequency,
	LayoutMode,
	OnSubmitObject
} from 'src/helpers/options-types';

const UTM_MEDIUM = 'donate-button-0.2'; // Update this if the major version changes

function constructEveryUrl({
	company = 'your-foundation',
	frequency,
	amount,
	mode,
	extras = {}
}: {
	company?: string;
	frequency?: DonationFrequency;
	amount?: string;
	mode?: LayoutMode;
	extras?: OnSubmitObject['params'];
}) {
	const baseUrl = `https://www.every.org/${company}/donate`;
	const parameters = Object.entries({
		frequency,
		amount,
		utm_campaign: 'single-or-split',
		utm_content: mode?.toLowerCase(),
		utm_source: company,
		utm_medium: UTM_MEDIUM,
		...extras
	})
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.join('='))
		.join('&');

	return `${baseUrl}?${parameters}`;
}

export default constructEveryUrl;
