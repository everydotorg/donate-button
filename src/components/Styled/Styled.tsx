import { Component } from 'preact';
import Style from './styleInjector';

const Styled = (props) => {
  let styles;

  if (typeof props.styles === 'string') {
    styles = (props.styles ).toString();
  } else {
    styles = (props.styles).reduce(
      (acc, current) => `${acc} ${current}`,
    );
  }

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
            <WrappedComponent {...(this.props)} />
          </div>
        </Styled>
      );
    }
  };
};

export { withStyles, Styled };