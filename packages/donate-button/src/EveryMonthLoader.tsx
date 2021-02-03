import {useEffect, useState} from 'preact/hooks';

import WIDGET_MODE from './constants/widgetMode';
import defaultOptions from './defaultOptions';
import experiment from './experiment';

const canUseSplitPanel = (options) => {
	const allMonthlyLevelsHasImages = options.monthly.levels.every((level) =>
		Boolean(level.img)
	);
	const oneTimeLevelHasImage = options.oneTime.img;

	return allMonthlyLevelsHasImages && oneTimeLevelHasImage;
};

export const EveryMonthLoader = ({options = {}, hide}) => {
	const [EveryMonth, widgetLoaded] = useState(undefined);

	// When show is set to true and EveryMonth is not loaded, load it
	useEffect(() => {
		if (options.show && !EveryMonth)
			import('./components/EveryMonth').then((m) =>
				widgetLoaded(() => m.default)
			);
	}, [options.show, EveryMonth]);

	// Not showing
	if (!options.show) return null;

	// Loading
	if (options.show && !EveryMonth) return 'Loading...'; // TODO - nicer loader

	const finalOptions = canUseSplitPanel({...defaultOptions, ...options})
		? {...defaultOptions, ...experiment(), ...options}
		: {...defaultOptions, ...options, mode: WIDGET_MODE.SINGLE};

	return <EveryMonth options={finalOptions} hide={hide} />;
};

export default EveryMonthLoader;
