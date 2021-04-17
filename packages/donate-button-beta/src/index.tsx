import {render} from 'preact';
import EmbedButton from 'src/components/EmbedButton';
import {EmbedButtonOptions} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';

interface CreateButtonInSelectorProps extends EmbedButtonOptions {
	/**
	 * Where to render the button in
	 */
	selector: string;
}

const createButtonInSelector = ({
	selector,
	...options
}: CreateButtonInSelectorProps) => {
	const container = document.querySelector(selector);
	if (!container) {
		return;
	}

	const Button = <EmbedButton {...options} />;
	render(Button, container);
};

export default createButtonInSelector;

loadFonts();

interface GlobalExport {
	createButton: typeof createButtonInSelector;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

window.everyDotOrgDonateButton = {
	createButton: createButtonInSelector
};
