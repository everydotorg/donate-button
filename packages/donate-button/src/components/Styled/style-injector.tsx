import {Component, cloneElement, isValidElement, VNode} from 'preact';
import adler32 from 'react-lib-adler32';

const isDevEnv = process.env.NODE_ENV !== 'production';

const ESCAPE_LOOKUP = {
	'>': '&gt;',
	'<': '&lt;'
};

interface StyleProps {
	scoped?: boolean;
}

class Style extends Component<StyleProps> {
	scopeClassNameCache: Record<string, string> = {};
	scopedCSSTextCache: Record<string, string> = {};
	scoped = this.props.scoped === undefined ? true : this.props.scoped;
	pepper = '';

	getStyleString = () => {
		if (Array.isArray(this.props.children)) {
			const styleString = this.props.children.filter(
				(child): child is string =>
					!isValidElement(child) && typeof child === 'string'
			);

			if (styleString.length > 1) {
				throw new Error(`Multiple style objects as direct descedents of a
        Style component are not supported (${styleString.length} style objects detected):
        ${styleString[0]}
        `);
			}

			return styleString[0];
		}

		if (
			typeof this.props.children === 'string' &&
			!isValidElement(this.props.children)
		) {
			return this.props.children;
		}

		return null;
	};

	getRootElement = () => {
		if (Array.isArray(this.props.children)) {
			// Useful for preserving type guard
			// eslint-disable-next-line unicorn/no-array-callback-reference
			const rootElement = this.props.children.filter(isValidElement);

			if (isDevEnv) {
				if (rootElement.length > 1) {
					console.log(rootElement);
					throw new Error(`Adjacent JSX elements must be wrapped in an enclosing tag
          (${rootElement.length} root elements detected)`);
				}

				if (rootElement[0] && this.isVoidElement(rootElement[0].type)) {
					throw new Error(`Self-closing void elements like ${String(
						rootElement[0].type
					)} must be
          wrapped in an enclosing tag. Reactive Style must be able to nest a style element inside of the
          root element and void element content models never
          allow it to have contents under any circumstances.`);
				}
			}

			return rootElement[0];
		}

		if (isValidElement(this.props.children)) {
			return this.props.children;
		}

		return null;
	};

	getRootSelectors = (rootElement: VNode) => {
		const rootSelectors = [];
		const {
			id: rootId,
			className: rootClassName
		} = (rootElement.props as unknown) as {id?: string; className: string};

		if (rootId) {
			rootSelectors.push(`#${rootId}`);
		}

		if (rootClassName) {
			rootClassName
				.trim()
				.split(/\s+/g)
				.forEach((className) => rootSelectors.push(className));
		}

		if (rootSelectors.length === 0 && typeof rootElement.type !== 'function') {
			rootSelectors.push(rootElement.type);
		}

		return rootSelectors;
	};

	processCSSText = (
		styleString: string,
		scopeClassName?: string,
		rootSelectors?: string[] | null
	) => {
		return styleString
			.replace(/\s*\/\/(?![^(]*\)).*|\s*\/\*.*\*\//g, '')
			.replace(/\s\s+/g, ' ')
			.split('}')
			.map((fragment) => {
				const isDeclarationBodyPattern = /.*:.*;/g;
				const isLastItemDeclarationBodyPattern = /.*:.*(;|$|\s+)/g;
				const isAtRulePattern = /\s*@/g;
				const isKeyframeOffsetPattern = /\s*((\d{1,2}|100)\s*%)|\s*(to|from)\s*$/g;

				return fragment
					.split('{')
					.map((statement, i, array) => {
						if (statement.trim().length === 0) {
							return '';
						}

						const isDeclarationBodyItemWithOptionalSemicolon =
							array.length - 1 === i &&
							statement.match(isLastItemDeclarationBodyPattern);
						if (
							statement.match(isDeclarationBodyPattern) ||
							isDeclarationBodyItemWithOptionalSemicolon
						) {
							return this.escapeTextContentForBrowser(statement);
						}

						const selector = statement;

						if (scopeClassName && !/:target/gi.test(selector)) {
							if (
								!selector.match(isAtRulePattern) &&
								!selector.match(isKeyframeOffsetPattern)
							) {
								return this.scopeSelector(
									scopeClassName,
									selector,
									rootSelectors
								);
							}

							return selector;
						}

						return selector;
					})
					.join('{\n');
			})
			.join('}\n');
	};

	escaper = (match: string) => {
		// Due To ESCAPE_REGEXP, this cast is safe
		return ESCAPE_LOOKUP[match as keyof typeof ESCAPE_LOOKUP] || '';
	};

	escapeTextContentForBrowser = (text: string) => {
		const ESCAPE_REGEX = /[><]/g;
		return text.replace(ESCAPE_REGEX, this.escaper);
	};

	scopeSelector = (
		scopeClassName: string,
		selector: string,
		rootSelectors?: readonly string[] | null
	) => {
		const scopedSelector: string[] = [];

		const groupOfSelectorsPattern = /,(?![^(|[]*\)|])/g;

		const selectors = selector.split(groupOfSelectorsPattern);

		selectors.forEach((selectorElement) => {
			let containsSelector;
			let unionSelector;

			if (
				rootSelectors?.length &&
				rootSelectors.some((rootSelector) =>
					selectorElement.includes(rootSelector)
				)
			) {
				unionSelector = selectorElement;

				const escapedRootSelectors = rootSelectors?.map((rootSelector) =>
					rootSelector.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
				);

				unionSelector = unionSelector.replace(
					new RegExp(`(${escapedRootSelectors?.join('|')})`),
					`$1${scopeClassName}`
				);

				containsSelector = this.scoped
					? `${scopeClassName} ${selectorElement}`
					: selectorElement;
				scopedSelector.push(unionSelector, containsSelector);
			} else {
				containsSelector = this.scoped
					? `${scopeClassName} ${selectorElement}`
					: selectorElement;
				scopedSelector.push(containsSelector);
			}
		});

		if (!this.scoped && scopedSelector.length > 1) {
			return scopedSelector[1];
		}

		return scopedSelector.join(', ');
	};

	getScopeClassName = (styleString: string, rootElement: VNode | null) => {
		let hash = styleString;

		if (rootElement) {
			this.pepper = '';
			this.traverseObjectToGeneratePepper(rootElement);
			hash += this.pepper;
		}

		return (isDevEnv ? 'scope-' : 's') + String(adler32(hash));
	};

	traverseObjectToGeneratePepper = (object: unknown, depth = 0) => {
		if (depth > 32 || this.pepper.length > 10000) {
			return;
		}

		if (typeof object !== 'object') {
			return;
		}

		if (!object) {
			return;
		}

		Object.entries(object).forEach(([prop, value]) => {
			const isPropReactInternal = /^[_$]|type|ref|^value$/.test(prop);

			if (Boolean(value) && typeof value === 'object' && !isPropReactInternal) {
				this.traverseObjectToGeneratePepper(
					value as Record<string, unknown>,
					depth + 1
				);
			} else if (
				Boolean(value) &&
				!isPropReactInternal &&
				typeof value !== 'function'
			) {
				this.pepper += value;
			}
		});
	};

	isVoidElement = (type: VNode['type']) =>
		[
			'area',
			'base',
			'br',
			'col',
			'command',
			'embed',
			'hr',
			'img',
			'input',
			'keygen',
			'link',
			'meta',
			'param',
			'source',
			'track',
			'wbr'
		].some((voidType) => type === voidType);

	createStyleElement = (cssText: string, scopeClassName: string) => {
		return (
			<style
				key={scopeClassName}
				// This component depends on it; plans to replace style injector
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{__html: cssText || ''}}
				id="direflow_styles"
				type="text/css"
			/>
		);
	};

	getNewChildrenForCloneElement = (
		cssText: string,
		rootElement: VNode,
		scopeClassName: string
	) => {
		return [
			this.createStyleElement(cssText, scopeClassName),
			rootElement.props.children
		];
	};

	render() {
		const styleString = this.getStyleString() ?? '';
		const rootElement = this.getRootElement();

		if (!styleString && rootElement) {
			return rootElement.props.children;
		}

		if (styleString && !rootElement) {
			return this.createStyleElement(
				this.processCSSText(styleString),
				this.getScopeClassName(styleString, rootElement)
			);
		}

		const rootElementId = (rootElement?.props as {id?: string}).id ?? '';
		const rootElementClassNames =
			(rootElement?.props as {className?: string}).className ?? '';

		let scopeClassName;
		let scopedCSSText;
		const scopeClassNameAddress =
			rootElementClassNames + rootElementId + styleString;

		if (this.scopeClassNameCache[scopeClassNameAddress]) {
			scopeClassName = this.scopeClassNameCache[scopeClassNameAddress];
			scopedCSSText = this.scopedCSSTextCache[scopeClassName];
		} else {
			scopeClassName = this.getScopeClassName(styleString, rootElement);
			scopedCSSText = this.processCSSText(
				styleString,
				`.${scopeClassName}`,
				rootElement && this.getRootSelectors(rootElement)
			);

			this.scopeClassNameCache[scopeClassNameAddress] = scopeClassName;
			this.scopedCSSTextCache[scopeClassName] = scopedCSSText;
		}

		const className = this.scoped
			? `${rootElementClassNames}${scopeClassName}`
			: rootElementClassNames;

		return (
			rootElement &&
			cloneElement(
				rootElement,
				{
					...rootElement.props,
					className: className.trim()
				},
				this.getNewChildrenForCloneElement(
					scopedCSSText,
					rootElement,
					scopeClassName
				)
			)
		);
	}
}

export default Style;
