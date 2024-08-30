import {useEffect} from 'preact/hooks';
import {ContextProvider} from 'src/components/widget/context';
import Widget from 'src/components/widget/index';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

const originalOverflow = document.querySelector('body')?.style.overflow;

const addOverflowToBody = () => {
	const body = document.querySelector('body');
	if (body) {
		body.style.overflow = 'hidden';
	}
};

const removeOverflowFromBody = () => {
	const body = document.querySelector('body');

	if (body) {
		if (originalOverflow) {
			body.style.overflow = originalOverflow;
			return;
		}

		body.style.removeProperty('overflow');
	}
};

interface WidgetLoaderProps {
	options: Partial<WidgetConfig>;
	hide: () => void;
}

export const WidgetLoader = ({options = {}, hide}: WidgetLoaderProps) => {
	removeOverflowFromBody();

	useEffect(() => {
		function onPopState() {
			hide();
			removeOverflowFromBody();
		}

		window.addEventListener('popstate', onPopState);

		return () => {
			window.removeEventListener('popstate', onPopState);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
