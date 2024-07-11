import autoPlayMode from 'src/autoPlayMode';
import formOnlyMode from 'src/formOnlyMode';
import {shouldEnableAutoPlay} from 'src/helpers/shouldEnableAutoPlay';
import {shouldEnableFormOnlyMode} from 'src/helpers/souldEnableFormOnlyMode';
import manualMode from 'src/manualMode';

const autoPlay = shouldEnableAutoPlay();
const formOnly = shouldEnableFormOnlyMode();

if (formOnly) {
	formOnlyMode();
} else if (autoPlay) {
	autoPlayMode();
} else {
	manualMode();
}
