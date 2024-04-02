import PdfViewerComponent from "../components/PdfViewerComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDocumentToSign } from "../utils/sign-document";
import { SigningDocument } from "../utils/types";

const Pspdfkit_sign_page = () => {
  const { id: signDocumentId } = useParams();

  const { data: document } = useQuery<SigningDocument>(
    ["signDocument"],
    () => getDocumentToSign(signDocumentId!),
    {
      initialData: undefined,
    }
  );

  return (
    <div className="App">
      <div className="App-viewer">
        <PdfViewerComponent
          document={document?.document.file!}
          signId={signDocumentId ?? ""}
        />
      </div>
    </div>
  );
};

export default Pspdfkit_sign_page;
