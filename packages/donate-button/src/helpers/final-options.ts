import { DonateButtonOptions, LayoutMode, mergeOptionsWithDefault } from "src/helpers/options-types";
import layoutModeAbTest from "src/layout-mode-ab-test";

const canUseSplitPanel = (options: DonateButtonOptions) => {
	const allMonthlyLevelsHasImages = options.monthly.levels.every((level) =>
		Boolean(level.img)
	);
	const oneTimeLevelHasImage = options.oneTime.img;

	return allMonthlyLevelsHasImages && oneTimeLevelHasImage;
};

export const getFinalOptions = (instanceOptions: Partial<DonateButtonOptions>): DonateButtonOptions => {
  return canUseSplitPanel(
		mergeOptionsWithDefault(instanceOptions)
	)
		? mergeOptionsWithDefault({mode: layoutModeAbTest()}, instanceOptions)
		: mergeOptionsWithDefault(instanceOptions, {mode: LayoutMode.SINGLE});
}