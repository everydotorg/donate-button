;
import './button.css';

const Button = ({handleClick, children}) => {
    return (
        <button className="btn" onClick={handleClick}>{children}</button>
    )
}

export default Button;