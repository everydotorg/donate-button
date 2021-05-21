import {ComponentType, Fragment} from 'preact';

/**
 * We identify keys in text when them are between {{}}
 * @param keysToReplace: {key: value}
 * @param text: text to replace
 */
export const replaceKeys = (
	keysToReplace: Record<string, string>,
	text: string
) => {
	const pattern = /{{(\w*)}}/g;
	return text.replace(pattern, (_, key) => {
		return keysToReplace[key] ? keysToReplace[key] : '';
	});
};

/**
 * We identify tags in text when them are <tag></tag>
 * The content inside tags is put inside the component
 *
 * @param text: text to replace
 * @param tag: tag to replace. e.g small
 * @param Component: component to replace tag
 * @param props: props of the component
 */
export function replaceTagWithComponent<Props>(
	text: string,
	tag: string,
	Component: ComponentType<Props>,
	props: Props
) {
	if (text) {
		const pattern = new RegExp(`<${tag}>(.*)</${tag}>`, 'g');

		const [previousText, betweenTags, afterText] = text.split(pattern);
		const component = <Component {...props}>{betweenTags}</Component>;

		return (
			<Fragment>
				{previousText}
				{component}
				{afterText}
			</Fragment>
		);
	}

	return text;
}

export const getBoldFormatted = (
	text: string,
	props: Record<string, unknown> = {}
) => {
	const tag = 'bold';

	return replaceTagWithComponent(
		text,
		tag,
		(props) => <strong {...props} />,
		props
	);
};
