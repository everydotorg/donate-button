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

export const PrivateNote = () => {
	const nonprofit = useNonprofitOrError();
	const enablePrivateNoteField =
		nonprofit.hasAdmin && !nonprofit.metadata?.disablePrivateNotes;

	const {privateNote, setPrivateNote} = useWidgetContext();
	const [showPrivateNoteField, setShowPrivateNoteField] = useState(
		Boolean(privateNote)
	);

	if (!enablePrivateNoteField) return null;

	return (
		<div className={verticalStackCss.className(Spacing.L)}>
			<Checkbox
				checked={showPrivateNoteField}
				onChange={() => {
					setShowPrivateNoteField((previous) => !previous);
				}}
			>
				Add note for {nonprofit.name}
			</Checkbox>
			{showPrivateNoteField && (
				<fieldset
					className={css({fieldSetCss, ...verticalStackCss.css(Spacing.XS)})}
				>
					<legend className={legendCss}>Private note</legend>
					<TextArea
						rows={3}
						label="Note"
						id="privateNote"
						value={privateNote}
						inputClassName={css({resize: 'none'})}
						onChange={({currentTarget}) => {
							setPrivateNote(currentTarget.value);
						}}
					/>
				</fieldset>
			)}
		</div>
	);
};
