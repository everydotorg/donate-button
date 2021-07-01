export const mdToHtml = (md: string): string => {
	let html = md;

	// Parse headings
	html = html
		.replace(/### (.+)/g, '<h3>$1</h3>')
		.replace(/## (.+)/g, '<h2>$1</h2>')
		.replace(/# (.+)/g, '<h1>$1</h1>');

	// Parse links
	html = html.replace(
		/\[([^\]]+)]\(([^)"]+)("(.+)")?\)/g,
		'<a href="$2">$1</a>'
	);

	// Parse font styles
	html = html
		.replace(/[*_]{2}([^*_]+)[*_]{2}/g, '<strong>$1</strong>')
		.replace(/[*_]([^*_]+)[*_]/g, '<i>$1</i>')
		.replace(/~{2}([^~]+)~{2}/g, '<del>$1</del>');

	html = html
		.replace(/^\s*\n-/gm, '<ul>\n-')
		.replace(/^(-.+)\s*\n([^-])/gm, '$1\n</ul>\n\n$2')
		.replace(/^-(.+)/gm, '<li>$1</li>');

	// Parse paragraphs
	html = html.replace(/^\s*(\n)?(.+)/gm, (m: string) => {
		return /<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
			? m
			: `<p>${m}</p>`;
	});

	return html;
};
