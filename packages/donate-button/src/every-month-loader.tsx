import EveryMonth from 'src/components/EveryMonth';
import {
	DonateButtonOptions,
} from 'src/helpers/options-types';

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

	return <EveryMonth options={options} hide={hide} />;
};

export default EveryMonthLoader;
