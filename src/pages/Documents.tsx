import LeftSideBar from "../components/LeftSideBar";
import { useDocumentList } from "../contexts/DocumentsContext";
import Magnifier from "../assets/Magnifier";
import TimeAgo from "../utils/timeFormat";
import Modal from "../components/Modal";
import { useState } from "react";
import PopUpToSignDocument from "../components/PopUpToSignDocument";
import { Link } from "react-router-dom";
import { Files, Clock3 } from "lucide-react";
// import Documents from "../assets/documents";

const Docuement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { search, setSearch, document } = useDocumentList();
  return (
    <>
      <div className="document-wrapper">
        <div className="dashbord-wrapper">
          <LeftSideBar />
        </div>
        <div className="documents-right-col">
          <div className="documents-header">documents</div>
          <div className="document-btn">
            <div className="document-icon"></div>
            {/* <document /> */}
            <button onClick={() => setIsOpen(true)} className="create-document">
              Add document to sign
            </button>
          </div>
          <div className="document-search-input">
            <div className="search-input">
              <div className="magnifier">
                <Magnifier />
              </div>
              <input
                className="search"
                placeholder="Search Documents by file name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="document-storage-description">
            <p className="description">
              Document storage is part of our paid plans. SignRequest
              automatically deletes finished documents. Upgrade now for the full
              SignRequest experience.
            </p>
          </div>
          <div className="delete-selected-documents">
            <button className="delete-selected">Delete selected</button>
            <p>select all</p>
          </div>
          <div className="document-container">
            {document.map((d) => (
              <Link
                to={`/document-status/${d.id}`}
                className="documents link"
                key={d.id}
              >
                <div className="documents-list">
                  <div className="div-file-check">
                    <Files className="file-check" />
                  </div>
                  <div className="document-name-status">
                    <p className="document-name">{d?.document?.name}</p>
                    <div className="doc-status">
                      <Clock3 className="doc-st-icon" />
                      <p className="document-status">
                        {d?.is_signed ? "signed" : "unsigned"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="recipient-info">
                  <div className="user-email-date">
                    <p className="user-email">{d?.recipient.email}</p>{" "}
                    <p className="inviting-date">
                      {<TimeAgo date={new Date(d?.date_requested)} />}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="pop-up">
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <PopUpToSignDocument onClose={() => setIsOpen(false)} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Docuement;
