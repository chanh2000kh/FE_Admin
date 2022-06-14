import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import bg from "../assets/images/CTSHOP.png"
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      {/* <LogoDark /> */}     
      <img width="132" height="132"  src={bg} />
    </Link>
  );
};

export default Logo;
