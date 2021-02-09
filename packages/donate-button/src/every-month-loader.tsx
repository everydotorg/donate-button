import deepMerge, {Options as DeepMergeOptions} from 'deepmerge';
import {useEffect, useState} from 'preact/hooks';
import type EveryMonthComponent from 'src/components/EveryMonth';
import {
	DonateButtonOptions,
	LayoutMode,
	mergeOptionsWithDefault
} from 'src/helpers/options-types';
import layoutModeAbTest from 'src/layout-mode-ab-test';

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

	const finalOptions: DonateButtonOptions = canUseSplitPanel(
		mergeOptionsWithDefault(options)
	)
		? mergeOptionsWithDefault({mode: layoutModeAbTest()}, options)
		: mergeOptionsWithDefault(options, {mode: LayoutMode.SINGLE});

	return <EveryMonth options={finalOptions} hide={hide} />;
};

export default EveryMonthLoader;
