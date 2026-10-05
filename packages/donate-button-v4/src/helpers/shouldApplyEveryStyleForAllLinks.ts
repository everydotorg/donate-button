import getCurrentScript from 'src/helpers/getCurrentScript';

export default function shouldApplyEveryStyleForAllLinks() {
	const attr = getCurrentScript()?.getAttribute('data-every-style');
	return attr !== undefined && attr !== null;
}
