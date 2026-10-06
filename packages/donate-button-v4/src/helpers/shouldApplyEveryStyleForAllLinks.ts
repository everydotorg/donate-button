export default function shouldApplyEveryStyleForAllLinks() {
	const attr = document.currentScript?.getAttribute('data-every-style');
	return attr !== undefined && attr !== null;
}
