import cxs from 'cxs';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';

const dividerCss = cxs({
	border: 0,
	margin: 0,
	padding: 0,
	borderTop: `${getColoredBorder(Borders.Normal, COLORS.LightGray)} !important`
});

type DividerProps = {
	classes?: string[];
};

export const Divider = ({classes = []}: DividerProps) => {
	return <hr className={[...classes, dividerCss].join(' ')} />;
};
