import {VNode} from 'preact';
import React from 'preact/compat';

const md =
	'# This is a title\nThis **is a** paragraph\nThis is _another_ paragraph. And this is a [Link](https://google.com)';

const parseMarkdown = (md: string) => {
	// H
	md = md.replace(/### (.+)/g, '<h3>$1</h3>');
	md = md.replace(/## (.+)/g, '<h2>$1</h2>');
	md = md.replace(/# (.+)/g, '<h1>$1</h1>');

	// Links
	md = md.replace(
		/\[([^\]]+)]\(([^)"]+)("(.+)")?\)/g,
		'<a href="$2" title="$4">$1</a>'
	);

	// Font styles
	md = md.replace(/[*_]{2}([^*_]+)[*_]{2}/g, '<strong>$1</strong>');
	md = md.replace(/[*_]([^*_]+)[*_]/g, '<i>$1</i>');
	md = md.replace(/~{2}([^~]+)~{2}/g, '<del>$1</del>');

	// P
	md = md.replace(/^\s*(\n)?(.+)/gm, (m: string) => {
		return /<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
			? m
			: `<p>${m}</p>`;
	});

	return md;
};

// https://raw.githubusercontent.com/julianpoma/pomoshared/master/README.md?token=AEUWNDMMGVYCMWGNDUVTKIDAVUZLI

type Node = ChildNode & {localName: string; attributes?: NamedNodeMap};

const createJSX = (nodeArray: Node[]): Array<VNode<any> | string | null> => {
	return nodeArray.map((node) => {
		const {attributes, localName, childNodes, nodeValue} = node;

		const attr: Record<string, string | null> = {};

		if (attributes) {
			Array.from(attributes).forEach((attribute) => {
				attr[attribute.name] = attribute.nodeValue;
			});
		}

		return localName
			? React.createElement(
					localName,
					attr,
					childNodes && Array.isArray(Array.from(childNodes))
						? createJSX(Array.from(childNodes) as Node[])
						: []
			  )
			: nodeValue;
	});
};

const HtmlToJSX = ({htmlString}: {htmlString: string}): any => {
	const nodes = new DOMParser().parseFromString(htmlString, 'text/html').body
		.childNodes;

	return createJSX(Array.from(nodes) as Node[]);
};

const Markdown = () => {
	const html = parseMarkdown(md);

	return <HtmlToJSX htmlString={html} />;
};

export default Markdown;
