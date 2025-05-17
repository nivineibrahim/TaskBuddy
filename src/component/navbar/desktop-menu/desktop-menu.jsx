import { Link, useLocation, useNavigate } from "react-router-dom";
import { ishomeSelected, isaddTasksSelected } from "../../../utils/checkRoutes";
import { useContext } from "react";
import { MainContext } from "../../../utils/context";
import { TailSpin } from "react-loader-spinner";
import { signOutUser } from "../../../utils/firebaseFunctions";
import React from "react";
function DesktopMenu() {
  const loc = useLocation();
  const { user, loading } = useContext(MainContext);
  const navigate = useNavigate();
  const signOut = async () => {
    await signOutUser();
    navigate("/");
  };

  return (
    <>
      <Link
        to="/"
        className={`navbar__right-side__item
    ${ishomeSelected(loc.pathname) && "navbar__right-side__item--selected"}`}>
        Home
      </Link>
      {user && (
        <Link
          to="/addTask"
          className={` navbar__right-side__item ${
            isaddTasksSelected(loc.pathname)
              ? "navbar__right-side__item--selected"
              : ""
          }`}>
          <p>Add Tasks</p>
        </Link>
      )}

      {loading ? (
        <TailSpin
          height="30"
          width="30"
          color="#3b4142"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : user ? (
        <button onClick={signOut} className="navbar__right-side__btn primary">
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/authenticate");
            closeFn();
          }}
          className="mobile-menu__content__btn primary">
          log in
        </button>
      )}
    </>
  );
}

export default DesktopMenu;