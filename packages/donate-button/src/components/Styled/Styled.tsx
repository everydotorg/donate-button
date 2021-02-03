import {Component} from 'preact';

import Style from './styleInjector';

const Styled = (props) => {
	let styles;

	styles =
		typeof props.styles === 'string'
			? props.styles.toString()
			: props.styles.reduce((acc, current) => `${acc} ${current}`);

	return (
		<Style scoped={props.scoped}>
			{styles}
			{props.children}
		</Style>
	);
};

const withStyles = (styles) => (WrappedComponent) => {
	// eslint-disable-next-line react/prefer-stateless-function
	return class extends Component {
		render() {
			return (
				<Styled styles={[styles]}>
					<div>
						<WrappedComponent {...this.props} />
					</div>
				</Styled>
			);
		}
	};
};

export {withStyles, Styled};
