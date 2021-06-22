import cxs from "cxs";
import { StateUpdater, useRef, useState } from "preact/hooks";
import { FrequencyPopoverContent } from "src/components/widget/Frequency/blocks/FrequencyPopoverContent";
import { Popover } from "src/components/widget/Popover";
import { useConfigContext } from "src/components/widget/hooks/use-config-context";
import { useI18n } from "src/components/widget/hooks/use-i18n";
import { useWidgetContext } from "src/components/widget/hooks/use-widget-context";
import { Borders, getColoredBorder } from "src/components/widget/theme/borders";
import { COLORS } from "src/components/widget/theme/colors";
import { labelText } from "src/components/widget/theme/font-sizes";
import { Spacing } from "src/components/widget/theme/spacing";
import { DonationFrequency } from "src/components/widget/types/donation-frequency";

const frequencyContainerCss = cxs({
  display: "flex",
});

const labelCss = (primaryColor: string) =>
  cxs({
    ...labelText,
    color: primaryColor,
    fontWeight: 400,
    padding: `${Spacing.XS} ${Spacing.Empty}`,
    flex: 1,
    textAlign: "center",
    border: getColoredBorder(Borders.Normal, COLORS.LightGray),
    transition: "border .2s",
  });

const labelSelectedCss = (primaryColor: string) =>
  cxs({
    border: getColoredBorder(Borders.Normal, primaryColor),
  });

const separatorBorderSelectedCss = (primaryColor: string) =>
  cxs({
    borderRightColor: primaryColor,
  });

const labelLeftCss = cxs({
  borderRadius: "8px 0 0 8px",
});

const labelRightCss = cxs({
  borderRadius: "0 8px 8px 0",
  // The border applied on `labelCss` has more especificity than this one so we have to add important to make it work
  borderLeft: "none!important",
});

const inputCss = cxs({
  display: "none",
});

interface FrequencyProps {
  frequency: DonationFrequency;
  setFrequency: StateUpdater<DonationFrequency>;
}

export const Frequency = ({ frequency, setFrequency }: FrequencyProps) => {
  const {
    showFrequencyPopover,
    dismissPopover,
    setDonationAmount,
  } = useWidgetContext();

  const { defaultDonationAmounts, primaryColor } = useConfigContext();
  const i18n = useI18n();

  const frequencyPopover = useRef<HTMLDivElement>(null);

  const labelSeparatorClass =
    frequency === DonationFrequency.Monthly ||
    frequency === DonationFrequency.OneTime
      ? [separatorBorderSelectedCss(primaryColor)]
      : [];

  const leftLabelClasses = [labelCss(primaryColor), labelLeftCss].concat(
    frequency === DonationFrequency.Monthly
      ? [labelSelectedCss(primaryColor)]
      : []
  );

  const rightLabelClasses = [labelCss(primaryColor), labelRightCss].concat(
    frequency === DonationFrequency.OneTime
      ? [labelSelectedCss(primaryColor)]
      : []
  );

  return (
    <div ref={frequencyPopover} className={frequencyContainerCss}>
      <label
        className={leftLabelClasses.concat(labelSeparatorClass).join(" ")}
        htmlFor="monthly"
        onClick={() => {
					showFrequencyPopover && dismissPopover()
          setFrequency(DonationFrequency.Monthly);
          setDonationAmount(defaultDonationAmounts.monthly);
        }}
      >
        <input
          className={inputCss}
          type="radio"
          name="frequency"
          value={DonationFrequency.Monthly}
        />
        {i18n.monthlyDonation}
      </label>
      <label
        className={rightLabelClasses.join(" ")}
        htmlFor="one-time"
        onClick={() => {
					showFrequencyPopover && dismissPopover()
          setFrequency(DonationFrequency.OneTime);
          setDonationAmount(defaultDonationAmounts.oneTime);
        }}
      >
        <input
          className={inputCss}
          type="radio"
          name="frequency"
          value={DonationFrequency.OneTime}
        />
        {i18n.oneTimeDonation}
      </label>
      {showFrequencyPopover ? (
        <Popover ref={frequencyPopover}>
          <FrequencyPopoverContent onClose={dismissPopover} />
        </Popover>
      ) : null}
    </div>
  );
};
