const AUTO_PLAY_PARAM = 'explicit';

export function shouldEnableAutoPlay() {
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

	if (parametersObject) {
		return parametersObject[AUTO_PLAY_PARAM] !== '1';
	}

	return true;
}
