// @mixin for-phone-only {
// 	@media (max-width: 599px) { @content; }
//   }
//   @mixin for-tablet-portrait-up {
// 	@media (min-width: 600px) { @content; }
//   }
//   @mixin for-tablet-landscape-up {
// 	@media (min-width: 900px) { @content; }
//   }
//   @mixin for-desktop-up {
// 	@media (min-width: 1200px) { @content; }
//   }
//   @mixin for-big-desktop-up {
// 	@media (min-width: 1800px) { @content; }
//   }

export enum BREAKPOINTS {
	PhoneOnly = '@media only screen and (max-width: 37.44em)',
	TabletUp = '@media only screen and (min-width: 37.5em)',
	TabletLandscapeUp = '@media only screen and (min-width: 56.25em)',
	DesktopUp = '@media only screen and (min-width: 75em)',
	BigDesktopUp = '@media only screen and (min-width: 112.5em)'
}
