import { Link } from "react-router-dom";
import useWindowSize from "../../utils/useWindowSize";
import DesktopMenu from "../navbar/desktop-menu/desktop-menu";
import MobileMenu from "../navbar/mobile-menu/mobile-menu";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import {React} from "react";

function Navbar() {
  const { width } = useWindowSize();
  const [isMenuOpened, setIsOpenedMenu] = useState(false);
  const openMenu = () => {
    setIsOpenedMenu(true);
  };
  const closeMenu = () => {
    setIsOpenedMenu(false);
  };

  useEffect(() => {
    if (width > 800) {
      closeMenu();
    }
  }, [width]);
  return (
    <div>
      <div className="navbar">
        <div className="navbar__left-side">
          <Link to="/">
            <div className="navbar_left-side__logo">
              <span className="navbar_left-side__logo__text">
                <b>TASK</b> BUDDY
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar__right-side">
          {width < 800 ? (
            isMenuOpened ? (
              <AiOutlineClose
                className="navbar__right-side__icon"
                onClick={closeMenu}
              />
            ) : (
              <RxHamburgerMenu
                className="navbar__right-side__icon"
                onClick={openMenu}
              />
            )
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>
      {isMenuOpened && <MobileMenu closeFn={closeMenu} />}
    </div>
  );
}

export default Navbar;