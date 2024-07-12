import getScriptParameters from 'src/helpers/getScriptParameters';

const FORM_ONLY_PARAM = 'formOnly';

export function shouldEnableFormOnlyMode() {
	const parameters = getScriptParameters();

	if (parameters) {
		return parameters[FORM_ONLY_PARAM] === '1';
	}

	return false;
}
