import {ContextProvider} from 'src/components/widget/context';
import Widget from 'src/components/widget/index';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

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

interface WidgetLoaderProps {
	options: Partial<WidgetConfig>;
	hide: () => void;
}

export const WidgetLoader = ({options = {}, hide}: WidgetLoaderProps) => {
	removeOverflowFromBody();
	if (!options.show) {
		// Not showing
		return null;
	}

	addOverflowToBody();

	return (
		<ContextProvider options={options} hide={hide}>
			<Widget />
		</ContextProvider>
	);
};
