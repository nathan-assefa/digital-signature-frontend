import { useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";

const Signature = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="signatures-wrapper">
        <div className="dashbord-wrapper">
          <LeftSideBar />
        </div>
        <div className="signatures-right-col">
          <div className="signatures-header">Signatures</div>
          <div className="signature-btn">
            <div className="signature-icon"></div>
            <button className="change-signature">Change signatures</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signature;
