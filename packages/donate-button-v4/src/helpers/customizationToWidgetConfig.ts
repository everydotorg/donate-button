import {DonateFlowCustomization} from 'src/components/widget/types/DonateFlowCustomization';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

/**
 * Maps a DonateFlowCustomization object to a partial WidgetConfig.
 * Only fields that have a direct mapping are converted.
 */
export const customizationToWidgetConfig = (
	customization: DonateFlowCustomization
): Partial<WidgetConfig> => {
	const config: Partial<WidgetConfig> = {};

	if (customization.paymentMethods !== undefined) {
		config.methods = customization.paymentMethods;
	}

	if (customization.themeColor !== undefined) {
		config.primaryColor = customization.themeColor;
	}

	if (customization.designation !== undefined) {
		config.designation = customization.designation;
	}

	if (customization.fixedAmount !== undefined) {
		config.amount = customization.fixedAmount;
	}

	if (customization.frequency !== undefined) {
		config.frequency = customization.frequency;
		config.defaultFrequency = customization.frequency;
	}

	if (customization.minAmount !== undefined) {
		config.minDonationAmount = customization.minAmount;
	}

	if (customization.suggestedAmounts !== undefined) {
		config.addAmounts = customization.suggestedAmounts;
	}

	return config;
};
