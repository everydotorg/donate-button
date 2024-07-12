export default function getScriptParameters() {
	const parametersString = document.currentScript
		?.getAttribute('src')
		?.split('?')[1];
	const parametersArray = parametersString
		?.split('&')
		.map((parameterString) => {
			const [key, value] = parameterString.split('=');
			return [key, value];
		});
	const parametersObject =
		parametersArray && Object.fromEntries(parametersArray);

	return parametersObject;
}
