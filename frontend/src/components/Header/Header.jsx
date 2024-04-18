import './Header.css';
import logo from "../../assets/quotebook.png";

const Header = () => {
    return (
        <div className="header">
            <img src={logo} className="logo" alt="logo" />
            <h1>Hack at UCI Tech Deliverable</h1>
        </div>
    );
};

export default Header;
