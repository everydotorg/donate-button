import {VNode} from 'preact';
import {forwardRef} from 'preact/compat';
import {widgetCss} from 'src/components/widget/components/WidgetCard/styles';

export const WidgetCard = forwardRef<
	HTMLDivElement,
	VNode<{height: number | null}>['props']
>(({children, height}, ref) => {
	return (
		<div ref={ref} className={widgetCss(height)}>
			{children}
		</div>
	);
});
