import autoPlayMode from 'src/autoPlayMode';
import {shouldEnableAutoPlay} from 'src/helpers/shouldEnableAutoPlay';
import manualMode from 'src/manualMode';

const autoPlay = shouldEnableAutoPlay();

if (autoPlay) {
	autoPlayMode();
} else {
	manualMode();
}
