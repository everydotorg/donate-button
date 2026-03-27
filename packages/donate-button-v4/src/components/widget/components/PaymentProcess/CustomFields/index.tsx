import {Fragment} from 'preact/jsx-runtime';
import {useEffect, useRef, useState} from 'preact/hooks';
import {rotateCss} from 'src/components/widget/components/Faq/styles';
import {
	fieldSetCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {TextArea} from 'src/components/widget/components/TextInput';
import {
	textInputContainerCss,
	textInputCss
} from 'src/components/widget/components/TextInput/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useCustomizationOrUndefined} from 'src/components/widget/hooks/useCustmization';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {ArrowIcon} from 'src/components/widget/icons/ArrowIcon';
import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing, verticalStackCss} from 'src/components/widget/theme/spacing';
import {
	CustomField,
	CustomFieldType
} from 'src/components/widget/types/DonateFlowCustomization';
import css from 'src/helpers/css';
import joinClassNames from 'src/helpers/joinClassNames';

const dropdownContainerCss = css({
	position: 'absolute',
	width: '100%',
	background: COLORS.White,
	borderRadius: `0 0 ${Radii.Default} ${Radii.Default}`,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderTop: 'none'
});

const dropdownInputRowCss = css({
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XXS
});

const dropdownContentCss = css({
	overflowY: 'scroll',
	height: '100%',
	maxHeight: '200px'
});

const dropdownItemCss = css({
	border: 'none',
	background: 'none',
	padding: `${Spacing.S} ${Spacing.M}`,
	...textSize.s,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XS,
	':hover': {
		cursor: 'pointer'
	}
});

const dropdownSuffixCss = (primaryColor: string, open: boolean) =>
	css({
		marginLeft: 'auto',
		...textSize.xs,
		color: COLORS.TextGray,
		display: 'flex',
		gap: Spacing.XS,
		alignItems: 'center',
		'> svg': {
			color: primaryColor,
			...(open ? rotateCss : {})
		}
	});

const dropdownOpenContainerCss = css({
	borderRadius: `${Radii.Default} ${Radii.Default} 0 0`
});

// Mobile: shown; desktop: hidden
const nativeSelectWrapperCss = css({
	[BREAKPOINTS.TabletUp]: {display: 'none'}
});

// Mobile: hidden; desktop: shown
const customDropdownWrapperCss = css({
	display: 'none',
	position: 'relative',
	[BREAKPOINTS.TabletUp]: {display: 'block'}
});

const nativeSelectCss = css({
	fontSize: textSize.s.fontSize,
	lineHeight: textSize.s.fontSize,
	fontFamily: 'inherit',
	flex: 1,
	border: 'none',
	outline: 'none',
	background: 'transparent',
	width: '100%',
	padding: 0,
	margin: 0,
	color: COLORS.Text,
	cursor: 'pointer',
	appearance: 'none'
});

const nativeSelectSuffixCss = (primaryColor: string) =>
	css({
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center',
		'> svg': {color: primaryColor}
	});

const dropdownTriggerCss = css({cursor: 'pointer'});

const selectedValueCss = css({
	fontSize: textSize.s.fontSize,
	lineHeight: textSize.s.fontSize,
	fontFamily: 'inherit',
	flex: 1,
	background: 'transparent',
	padding: 0,
	margin: 0,
	userSelect: 'none'
});

const placeholderValueCss = css({color: COLORS.TextGray});

interface DropdownFieldProps {
	field: CustomField;
	value: string;
	onChange: (value: string) => void;
	primaryColor: string;
}

const DropdownField = ({
	field,
	value,
	onChange,
	primaryColor
}: DropdownFieldProps) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [selectedOption, setSelectedOption] = useState(value);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!showDropDown) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowDropDown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showDropDown]);

	const displayText =
		selectedOption || (field.placeholder ?? 'Select an option');

	return (
		<div
			ref={containerRef}
			className={css({position: 'relative', zIndex: 100})}
		>
			<div
				role="combobox"
				aria-expanded={showDropDown}
				aria-haspopup="listbox"
				tabIndex={0}
				className={joinClassNames([
					textInputContainerCss(primaryColor),
					dropdownInputRowCss,
					dropdownTriggerCss,
					...(showDropDown ? [dropdownOpenContainerCss] : [])
				])}
				onClick={() => {
					setShowDropDown((previous) => !previous);
				}}
				onKeyDown={({key}) => {
					if (key === 'Enter' || key === ' ') setShowDropDown((p) => !p);
				}}
			>
				<span
					className={joinClassNames([
						selectedValueCss,
						...(!selectedOption ? [placeholderValueCss] : [])
					])}
				>
					{displayText}
				</span>
				<div className={dropdownSuffixCss(primaryColor, showDropDown)}>
					<ArrowIcon />
				</div>
			</div>
			{showDropDown && (
				<div
					className={dropdownContainerCss}
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
				>
					<div className={dropdownContentCss}>
						<ul role="listbox">
							{(field.options ?? []).map((option) => (
								<li
									key={option}
									role="option"
									aria-selected={option === selectedOption}
								>
									<button
										type="button"
										className={dropdownItemCss}
										onClick={() => {
											setSelectedOption(option);
											onChange(option);
											setShowDropDown(false);
										}}
									>
										{option}
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export const CustomFields = () => {
	const customization = useCustomizationOrUndefined();
	const {customFieldValues, setCustomFieldValues} = useWidgetContext();
	const {primaryColor} = useConfigContext();

	const fields = customization?.fields;
	if (!fields || fields.length === 0) return null;

	const handleChange = (heading: string, value: string) => {
		setCustomFieldValues((previous) => ({...previous, [heading]: value}));
	};

	console.log('Rendering custom fields with values', customFieldValues);
	return (
		<div className={verticalStackCss.className(Spacing.L)}>
			{fields.map((field) => (
				<fieldset
					key={field.heading}
					className={css({fieldSetCss, ...verticalStackCss.css(Spacing.XS)})}
				>
					<legend className={legendCss}>
						{field.heading}
						{field.required && ' *'}
					</legend>
					{field.type === CustomFieldType.TEXT_AREA ? (
						<TextArea
							rows={3}
							id={`custom-field-${field.heading}`}
							placeholder={field.placeholder}
							value={customFieldValues[field.heading] ?? ''}
							inputClassName={css({resize: 'none'})}
							onChange={({currentTarget}) => {
								handleChange(field.heading, currentTarget.value);
							}}
						/>
					) : (
						<Fragment>
							{/* Native select — mobile only */}
							<div className={nativeSelectWrapperCss}>
								<div className={textInputContainerCss(primaryColor)}>
									<select
										id={`custom-field-${field.heading}-native`}
										className={joinClassNames([textInputCss, nativeSelectCss])}
										value={customFieldValues[field.heading] ?? ''}
										onChange={({currentTarget}) => {
											handleChange(field.heading, currentTarget.value);
										}}
									>
										<option value="">
											{field.placeholder ?? 'Select an option'}
										</option>
										{(field.options ?? []).map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<div className={nativeSelectSuffixCss(primaryColor)}>
										<ArrowIcon />
									</div>
								</div>
							</div>
							{/* Custom dropdown — desktop only */}
							<div className={customDropdownWrapperCss}>
								<DropdownField
									field={field}
									value={customFieldValues[field.heading] ?? ''}
									onChange={(value) => {
										console.log(
											`Changing value of ${field.heading} to ${value}`
										);
										handleChange(field.heading, value);
									}}
									primaryColor={primaryColor}
								/>
							</div>
						</Fragment>
					)}
				</fieldset>
			))}
		</div>
	);
};
