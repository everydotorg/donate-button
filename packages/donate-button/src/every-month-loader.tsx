import {useEffect, useState} from 'preact/hooks';
import type EveryMonthComponent from 'src/components/EveryMonth';
import experiment from 'src/experiment';
import {
	DonateButtonOptions,
	DonationMode,
	defaultOptions
} from 'src/helpers/options-types';

const canUseSplitPanel = (options: DonateButtonOptions) => {
	const allMonthlyLevelsHasImages = options.monthly.levels.every((level) =>
		Boolean(level.img)
	);
	const oneTimeLevelHasImage = options.oneTime.img;

	return allMonthlyLevelsHasImages && oneTimeLevelHasImage;
};

let originalOverflow: string;
const getOriginalOverflow = () => {
	const body = document.querySelector('body');

	if (!originalOverflow) {
		originalOverflow = body?.style.overflow ? body.style.overflow : 'unset';
	}

	return originalOverflow;
};

const addOverflowToBody = () => {
	const body = document.querySelector('body');
	if (body) {
		body.style.overflow = 'hidden';
	}
};

const removeOverflowFromBody = () => {
	const body = document.querySelector('body');
	const overflow = getOriginalOverflow();
	if (body) {
		body.style.overflow = overflow;
	}
};

interface EveryMonthLoaderProps {
	options: Partial<DonateButtonOptions>;
	hide: () => void;
}
export const EveryMonthLoader = ({
	options = {},
	hide
}: EveryMonthLoaderProps) => {
	const [EveryMonth, widgetLoaded] = useState<
		typeof EveryMonthComponent | undefined
	>(undefined);

	// When show is set to true and EveryMonth is not loaded, load it
	useEffect(() => {
		if (options.show && !EveryMonth) {
			import('./components/EveryMonth')
				.then((m) => {
					widgetLoaded(() => m.default);
				})
				.catch((error) => {
					console.log('Could not lazy load Every Month component', error);
				});
		}
	}, [options.show, EveryMonth]);

	if (!EveryMonth) {
		// Not yet loaded
		return null;
	}

	removeOverflowFromBody();
	if (!options.show) {
		// Not showing
		return null;
	}

	addOverflowToBody();

	// Loading
	if (options.show && !EveryMonth) {
		return <>Loading...</>;
	}

	const finalOptions: DonateButtonOptions = canUseSplitPanel({
		...defaultOptions,
		...options
	})
		? {...defaultOptions, ...experiment(), ...options}
		: {...defaultOptions, ...options, mode: DonationMode.SINGLE};

	return <EveryMonth options={finalOptions} hide={hide} />;
};

export default EveryMonthLoader;
