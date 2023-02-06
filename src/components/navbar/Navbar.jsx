import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function NavBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://thedailyescape-api.onrender.com/images";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="nav--left">
        <i className="nav--icon fa-brands fa-facebook"></i>
        <i className="nav--icon fa-brands fa-instagram"></i>
        <i className="nav--icon fa-brands fa-youtube"></i>
      </div>
      <div className="nav--center">
        <ul className="navList">
          <li className="nav--listItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="nav--listItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="nav--listItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="nav--listItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="nav--listItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="nav--right">
        {/* profile picture if user else LOGIN/REGISTER */}
        {user ? (
          <Link to="/settings">
            <img
              className="nav--profile-picture"
              src={PF+user.profilePicture}
              alt="profile pic"
            />
          </Link>
        ) : (
          <ul className="navList">
            <li className="nav--listItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="nav--listItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {/*  */}
        <i className="nav--search-icon fa-sharp fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
