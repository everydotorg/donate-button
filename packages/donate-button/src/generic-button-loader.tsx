import { render } from 'preact';
import constructEveryUrl from 'src/helpers/construct-every-url';
import {
	GenericButtonProps,
	DonateButtonOptions
} from 'src/helpers/options-types';
import { getCharityName } from 'src/helpers/charity-name';
import { getSubmitParams } from 'src/helpers/submit-params';
import GenericButton from './components/GenericButton'

interface GenericButtonLoader {
	selector: string;
	onClick: () => void;
	widgetOptions: Partial<DonateButtonOptions>;
	options: Partial<GenericButtonProps>;
}

const genericButtonLoader = ({
	selector,
	options = {},
	onClick,
	widgetOptions
}: GenericButtonLoader) => {
	const div = document.querySelector(selector);
	const url = constructEveryUrl({
		company: getCharityName(widgetOptions),
		extras: getSubmitParams(widgetOptions)
	})

	if (div) {
		const Button = (
			<GenericButton {...options} hrefUrl={url} onClick={onClick} />
		);
		render(Button, div);

	}
};

export default genericButtonLoader;
