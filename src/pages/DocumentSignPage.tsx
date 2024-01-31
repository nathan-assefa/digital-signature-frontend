import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDocumentToSign } from "../utils/sign-document";
import { SigningDocument } from "../utils/types";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import SignatureCanvas from "../components/SignatureCanvas";

const DocumentSignPage = () => {
  const [displaySignCanvas, setDesiplaySignCanvas] = useState(false);

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
        <Document file={pdfUrl}>
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
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
