import {useState} from 'preact/hooks';
import {Checkbox} from 'src/components/widget/components/Checkbox';
import {
	fieldSetCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {TextArea} from 'src/components/widget/components/TextInput';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const PublicTestimony = () => {
	const nonprofit = useNonprofitOrError();

	const {publicTestimony, setPublicTestimony} = useWidgetContext();
	const [showPublicTestimonyField, setShowPublicTestimonyField] = useState(
		Boolean(publicTestimony)
	);

	return (
		<div className={verticalStackCss.className(Spacing.L)}>
			<Checkbox
				checked={showPublicTestimonyField}
				onChange={() => {
					setShowPublicTestimonyField((previous) => !previous);
				}}
			>
				Add public testimony
			</Checkbox>
			{showPublicTestimonyField && (
				<fieldset
					className={css({fieldSetCss, ...verticalStackCss.css(Spacing.XS)})}
				>
					<legend className={legendCss}>
						Help {nonprofit.name} by sharing why you support them with the world
					</legend>
					<TextArea
						rows={3}
						label="Note"
						id="publicTestimony"
						value={publicTestimony}
						inputClassName={css({resize: 'none'})}
						onChange={({currentTarget}) => {
							setPublicTestimony(currentTarget.value);
						}}
					/>
				</fieldset>
			)}
		</div>
	);
};
