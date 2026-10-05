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
