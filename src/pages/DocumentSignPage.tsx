import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDocumentToSign } from "../utils/sign-document";
import { SigningDocument } from "../utils/types";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import SignatureCanvas from "../components/SignatureCanvas";

// import Modal from "../components/Modal";

const DocumentSignPage = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displaySignCanvas, setDesiplaySignCanvas] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const { id: signDocumentId } = useParams();
  const { data: document } = useQuery<SigningDocument>(
    ["signDocument"],
    () => getDocumentToSign(signDocumentId!),
    {
      initialData: undefined,
    }
  );

  const pdfUrl = document?.document?.file;
  return (
    <div
      onClick={() => setDesiplaySignCanvas(true)}
      className="sign-document-wrapper"
    >
      <div className="sign-document">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
      </div>
      <div className="signature-canvas pop-up">
        {displaySignCanvas && (
          <SignatureCanvas signatureId={signDocumentId || ""} />
        )}
      </div>
    </div>
  );
};

export default DocumentSignPage;
