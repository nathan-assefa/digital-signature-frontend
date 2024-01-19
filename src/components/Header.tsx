import Logo from "../assets/logo";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircleUserRound, FileStack } from "lucide-react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  Home,
  CircleUser,
  BookDashed,
  Receipt,
  Users,
  User,
  LogOut,
  PencilLine,
} from "lucide-react";
import { useRef, useState } from "react";

const Header = () => {
  // const user = null;
  const [showMenu, setShowhowMenu] = useState(false);
  const { username, logOutUser } = useAuth();
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setShowhowMenu(false));
  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/" className="link">
          <div className="header-left">
            <div className="logo">
              <Logo />
            </div>
            <div className="e-signature">E-signature</div>
          </div>
        </Link>
        <div className="header-right">
          {username ? (
            <Link to="/documents" className="link">
              <div className="header-document">
                <FileStack className="header-icn" />
                <div className="documentation">My Documentation</div>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="link">
              <div className="header-document">
                <div className="documentation">Sign in</div>
              </div>
            </Link>
          )}
          <div
            onClick={() => setShowhowMenu((prev) => !prev)}
            className="header-profile"
          >
            <CircleUserRound className="circle-user-round header-icn" />
            {username ? <div className="user-name">{username}</div> : null}
          </div>
        </div>
        {showMenu && (
          <div ref={navRef} className="right-side-pop-up-menu">
            <div className="right-menu">
              <div>
                <Link to="/" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <Home className="menu-icn" />
                      <div className="icon-name">Home</div>
                    </div>
                  </div>
                </Link>
                <Link to="/account" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <CircleUser className=" menu-icn" />
                      <div className="icon-name">Account</div>
                    </div>
                  </div>
                </Link>
                <Link to="/documents" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name ">
                      <FileStack className="menu-icn" />
                      <div className="icon-name">Documents</div>
                    </div>
                  </div>
                </Link>
                <Link to="/signature" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <PencilLine className="menu-icn" />
                      <div className="icon-name">E-signature</div>
                    </div>
                  </div>
                </Link>
                <Link to="/templates" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <BookDashed className="menu-icn" />
                      <div className="icon-name">Templates</div>
                    </div>
                  </div>
                </Link>
                <Link to="/billing" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <Receipt className="menu-icn" />
                      <div className="icon-name">Billing</div>
                    </div>
                  </div>
                </Link>
                <Link to="/teams" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name">
                      <Users className="menu-icn" />
                      <div className="icon-name">Teams</div>
                    </div>
                  </div>
                </Link>
                <Link to="/users" className="link">
                  <div className="icon-wrapper">
                    <div className="icon-and-name ">
                      <User className="menu-icn" />
                      <div className="icon-name">User</div>
                    </div>
                  </div>
                </Link>
                <div onClick={logOutUser} className="icon-wrapper logout-user">
                  <div className="icon-and-name n">
                    <LogOut className="menu-icn" />
                    <div className="icon-name">Logout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
