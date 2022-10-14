import { raspberryPiLogo } from "@assets/images";
import "./index.css";

/** Header component */
const Header = () => {
  return (
    <div className="Header">
      <div className="Header__content">
        <img className="Header__logo" src={raspberryPiLogo} />
      </div>
    </div>
  );
};

export default Header;
