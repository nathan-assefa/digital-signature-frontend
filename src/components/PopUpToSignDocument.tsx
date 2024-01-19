import { Link } from "react-router-dom";

interface ModelData {
  onClose: () => void;
}

const PopUpForDocumentSigning: React.FC<ModelData> = ({ onClose }) => {
  return (
    <Link to="/" onClick={onClose} className="link">
      <div onClick={onClose} className="document-sign-wrapper pop-up-container">
        <div className="signing-related-inputes">
          <button className="add-file">Add files to sign</button>
        </div>

        <div className="left-col-footer">
          <button className="btn help-btn">Help</button>
          <button className="btn sign-btn">Sign</button>
          <button className="btn setting-btn">Setting</button>
        </div>
      </div>
    </Link>
  );
};

export default PopUpForDocumentSigning;
