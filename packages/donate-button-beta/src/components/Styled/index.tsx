// We should replace this with a third party, this is hard to maintain.
import {ComponentChildren, ComponentType} from 'preact';
import Style from 'src/components/Styled/style-injector';

export interface StyledProps {
	readonly styles:
		| string
		| readonly string[]
		| ReadonlyArray<Record<string, string>>;
	readonly scoped?: boolean;
	children: ComponentChildren;
}
const Styled = (props: StyledProps) => {
	// This is not doing what we expect if CSS imports really are
	// Record<string, string> instances as the default CSS module typings express
	const styles =
		typeof props.styles === 'string'
			? props.styles.toString()
			: props.styles.join(' ');

	return (
		<Style scoped={props.scoped}>
			{styles}
			{props.children}
		</Style>
	);
};

function withStyles<P>(styles: StyledProps['styles']) {
	return (WrappedComponent: ComponentType<P>) => (props: P) => (
		<Styled styles={styles}>
			<div>
				<WrappedComponent {...props} />
			</div>
		</Styled>
	);
}

export {withStyles, Styled};
