import getScriptParameters from 'src/helpers/getScriptParameters';

const AUTO_PLAY_PARAM = 'explicit';

export function shouldEnableAutoPlay() {
	const parameters = getScriptParameters();

	if (parameters) {
		return parameters[AUTO_PLAY_PARAM] !== '1';
	}

	return true;
}
