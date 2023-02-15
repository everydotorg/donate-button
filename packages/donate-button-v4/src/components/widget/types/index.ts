import { WidgetConfig } from "./WidgetConfig";

export interface CreateWidgetInSelectorProps extends WidgetConfig{
	/**
	 * Element to render widget in; takes precedence over selector
	 */
	element?: Element;
	/**
	 * Selector to render widget in
	 */
	selector?: string;
}