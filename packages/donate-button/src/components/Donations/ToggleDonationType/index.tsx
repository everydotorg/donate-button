import {replaceTagWithComponent} from 'src/helpers/interpolation';
import { memo } from 'preact/compat'
import useI18n from 'src/hooks/use-i18n';
import 'src/components/Donations/ToggleDonationType/toggle-donation-type.css';

const getActionFormatted = (switchText: string, handleClick: () => void) => {
	const props = {onClick: handleClick};
	const tag = 'action';

	return replaceTagWithComponent(
		switchText,
		tag,
		(props) => <span {...props} />,
		props
	);
};

const ToggleDonationType = memo(({
	handleClick,
	monthlyDonation
}: {
	monthlyDonation: boolean;
	handleClick(): void;
}) => {
	const lang = useI18n();
	const formText = monthlyDonation ? lang.monthly : lang.oneTime;

	return (
		<p className="t-title donation-type">
			{getActionFormatted(formText.switch, handleClick)}
		</p>
	);
});

export default ToggleDonationType;
