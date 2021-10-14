import {VNode} from 'preact';
import React, {useEffect, useState} from 'preact/compat';
import {mdToHtml} from 'src/helpers/markdown-to-html';
import {isUrl} from 'src/helpers/string-is-url';

type Node = ChildNode & {localName: string; attributes?: NamedNodeMap};

const createJSX = (nodeArray: Node[]): Array<VNode<any> | string | null> => {
	return nodeArray.map((node) => {
		const {attributes, localName, childNodes, nodeValue} = node;

		const bag: Record<string, string | null> = {};

		if (attributes) {
			Array.from(attributes).forEach((attribute) => {
				bag[attribute.name] = attribute.nodeValue;
			});
		}

		return localName
			? React.createElement(
					localName,
					bag,
					childNodes && Array.isArray(Array.from(childNodes))
						? createJSX(Array.from(childNodes) as Node[])
						: []
			  )
			: nodeValue;
	});
};

const HtmlToJSX = ({html}: {html: string}): any => {
	const nodes = new DOMParser().parseFromString(html, 'text/html').body
		.childNodes;

	return createJSX(Array.from(nodes) as Node[]);
};

export const Markdown = ({source}: {source: string}) => {
	const [html, setHtml] = useState<string>('');

	useEffect(() => {
		const loadContent = async () => {
			let markdown = '';

			if (isUrl(source)) {
				const data = await fetch(source);
				markdown = await data.text();
			} else {
				markdown = source;
			}

			setHtml(mdToHtml(markdown));
		};

		void loadContent();
	}, [source]);

	return <HtmlToJSX html={html} />;
};
