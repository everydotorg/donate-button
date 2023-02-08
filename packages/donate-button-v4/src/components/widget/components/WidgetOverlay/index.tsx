import {FunctionalComponent} from 'preact';
import {JSXInternal} from 'preact/src/jsx';
import {overlayCss} from 'src/components/widget/components/WidgetOverlay/styles';

interface WdigetOverlayProps {
	onClick: JSXInternal.MouseEventHandler<Element>;
}

export const WidgetOverlay: FunctionalComponent<WdigetOverlayProps> = ({
	children,
	onClick
}) => {
	return (
		<div className={overlayCss} onClick={onClick}>
			{children}
		</div>
	);
};
