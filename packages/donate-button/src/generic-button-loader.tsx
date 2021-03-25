import {render} from 'preact';
import {
	GenericButtonProps,
	DonateButtonOptions
} from 'src/helpers/options-types';

interface GenericButtonLoader {
	selector: string;
	onClick: () => void;
	widgetOptions: Partial<DonateButtonOptions>;
	options: Partial<GenericButtonProps>;
}

const getCharityName = (
	widgetOptions: Partial<DonateButtonOptions>
): string => {
	const genericFoundation = 'your-foundation';
	if (typeof widgetOptions.onSubmit === 'function') {
		return genericFoundation;
	}

	return widgetOptions.onSubmit?.charity
		? widgetOptions.onSubmit?.charity
		: genericFoundation;
};

const genericButtonLoader = ({
	selector,
	options = {},
	onClick,
	widgetOptions
}: GenericButtonLoader) => {
	const div = document.querySelector(selector);

	const charity = getCharityName(widgetOptions);
	const hrefUrl = `https://www.every.org/${charity}/donate`;

	if (div) {
		import('./components/GenericButton')
			.then((C) => {
				const Button = C.default;

				const GenericButton = (
					<Button {...options} hrefUrl={hrefUrl} onClick={onClick} />
				);
				render(GenericButton, div);
			})
			.catch((error) => {
				console.error(error);
			});
	}
};

export default genericButtonLoader;
