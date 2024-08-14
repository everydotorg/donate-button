/**
 * This file is a modified version of the 'cxs' package.
 * The original package does not support shadow DOM properly.
 */

/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import * as CSS from 'csstype';
import resetcss from 'src/resetCss';

type CSSProperties = CSS.Properties<string | number>;
type CSSPseudos = {[K in CSS.Pseudos]?: CSSObject};

export interface CSSObject extends CSSProperties, CSSPseudos {
	[key: string]: CSSObject | string | number | undefined;
}

function hyph(s: string) {
	return s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
}

function mx(rule: string, media?: string) {
	return media ? `${media}{${rule}}` : rule;
}

function rx(cn: string, prop: string, value: string | number) {
	return `.${cn}{${hyph(prop)}:${value}}`;
}

function noAnd(s: string) {
	return s.replace(/&/g, '');
}

function getParseFunction({
	rules,
	cache,
	insert,
	prefix
}: {
	rules: string[];
	cache: Record<string, string>;
	insert: (rule: string) => void;
	prefix: string;
}) {
	const parse = (object: CSSObject, child = '', media?: string): string => {
		return Object.keys(object)
			.map((key) => {
				const value = object[key] ?? '';
				if (value === null) return '';
				if (typeof value === 'object') {
					const m2 = key.startsWith('@') ? key : null;
					const c2 = m2 ? child : child + key;
					return parse(value, c2, m2 ?? media);
				}

				const _key = key + value + child + media;
				if (cache[_key]) return cache[_key];
				const className = prefix + rules.length.toString(36);
				insert(mx(rx(className + noAnd(child), key, value), media));
				cache[_key] = className;
				return className;
			})
			.join(' ');
	};

	return parse;
}

function getCssFunction(object: {
	rules: string[];
	cache: Record<string, string>;
	insert: (rule: string) => void;
	prefix: string;
}) {
	const parse = getParseFunction(object);
	return (...styles: CSSObject[]): string => {
		return styles
			.map((style) => parse(style))
			.join(' ')
			.trim();
	};
}

function widgetCSS() {
	const prefix = 'every-embedded-';
	const cache: Record<string, string> = {};
	const rules: string[] = [];

	let insert = (rule: string) => {
		rules.push(rule);
	};

	let css = getCssFunction({rules, cache, insert, prefix});

	if (typeof document !== 'undefined') {
		insert = (rule: string) => {
			const shadowRoot = document.querySelector('#shadow-wrapper');
			const everyShadowStyles = shadowRoot?.shadowRoot?.querySelector(
				'#every-shadow-styles'
			);

			if (everyShadowStyles) {
				if (!everyShadowStyles.innerHTML) {
					everyShadowStyles.innerHTML = resetcss;
					for (const rule of rules) {
						everyShadowStyles.innerHTML += rule;
					}
				}

				everyShadowStyles.innerHTML += rule;
			}

			rules.push(rule);
		};

		css = getCssFunction({rules, cache, insert, prefix});
	}

	return css;
}

function buttonCSS() {
	const prefix = 'every-embedded-button-';
	const cache: Record<string, string> = {};
	const rules: string[] = [];

	let insert = (rule: string) => {
		rules.push(rule);
	};

	let css = getCssFunction({rules, cache, insert, prefix});

	if (typeof document !== 'undefined') {
		const styles = document.createElement('style');
		styles.id = 'every-styles';
		const sheet = document.head.appendChild(styles).sheet;

		insert = function insert(rule) {
			rules.push(rule);
			sheet?.insertRule(rule, sheet.cssRules.length);
		};

		css = getCssFunction({rules, cache, insert, prefix});
	}

	return css;
}

export const cssButton = buttonCSS();

const css = widgetCSS();

export default css;
