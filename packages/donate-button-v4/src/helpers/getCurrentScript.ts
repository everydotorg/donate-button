// Vite's dev entry is a module, so document.currentScript is null.
// Fall back to its marked script to read embed options during development.
export default function getCurrentScript() {
	return (
		document.currentScript ??
		(process.env.NODE_ENV === 'development'
			? document.querySelector<HTMLScriptElement>(
					'script[data-every-dev-script]'
			  )
			: null)
	);
}
