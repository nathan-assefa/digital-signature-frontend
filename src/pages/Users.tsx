import LeftSideBar from "../components/LeftSideBar";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <>
      <div className="users-wrapper">
        <div className="dashbord-wrapper">
          <LeftSideBar />
        </div>
        <div className="users-right-col">
          <div className="users-header">users</div>
          <div className="user-btn">
            <p className="add-users-to-team">
              You can add users on a team page.{" "}
              <span>
                <Link to="/teams" className="link">
                  To make a team account have a look here.
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
