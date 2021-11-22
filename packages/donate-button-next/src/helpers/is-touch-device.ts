export const isTouchDevice = () =>
	Boolean('ontouchstart' in window || navigator.maxTouchPoints);
