import EveryMonth from 'src/components/EveryMonth';
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
	removeOverflowFromBody();
	if (!options.show) {
		// Not showing
		return null;
	}

	addOverflowToBody();

	const finalOptions: DonateButtonOptions = canUseSplitPanel(
		mergeOptionsWithDefault(options)
	)
		? mergeOptionsWithDefault({mode: layoutModeAbTest()}, options)
		: mergeOptionsWithDefault(options, {mode: LayoutMode.SINGLE});

	return <EveryMonth options={finalOptions} hide={hide} />;
};

export default EveryMonthLoader;
