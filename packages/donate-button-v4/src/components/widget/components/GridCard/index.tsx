import {FunctionalComponent} from 'preact';
import {cardCss} from 'src/components/widget/components/GridCard/styles';
import joinClassNames from 'src/helpers/joinClassNames';

interface CardProps {
	className?: string;
}

export const GridCard: FunctionalComponent<CardProps> = ({
	children,
	className
}) => {
	return <div className={joinClassNames([cardCss, className])}>{children}</div>;
};
