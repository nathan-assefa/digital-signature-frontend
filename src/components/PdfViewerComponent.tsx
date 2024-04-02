import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Toaster, toast } from "sonner";

interface PdfViewerProps {
  document: string;
  signId: string;
}

export default function PdfViewerComponent(props: PdfViewerProps) {
  const containerRef = useRef(null); // Specify the type of ref
  const navigate = useNavigate();
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [instance, setInstance] = useState<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    var PSPDFKit: any;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.default.unload(container);

      const loadedInstance = await PSPDFKit.default.load({
        container,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.VITE_PUBLIC_URL
        }`,
      });

      setInstance(loadedInstance); // Set instance in state

      loadedInstance.addEventListener("annotations.change", () => {
        setShowFinishButton(true);
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  const sendSignedDocumentToBackend = async (signedDocumentBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append(
        "signedDocument",
        signedDocumentBlob,
        "signed_document.pdf"
      );
      formData.append("is_signed", "true");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/sign-documents/${props.signId}/`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success(
          "Document signed successfully! Redirecting to the home page..."
        );
        setTimeout(() => {
          navigate("/");
        }, 2800);
      } else {
        console.error("Failed to send signed document to the backend.");
      }
    } catch (error) {
      toast.error("Document signing error.");
    }
  };

  const { mutate, isLoading } = useMutation(sendSignedDocumentToBackend);

  const finishSigning = async () => {
    if (instance) {
      // Retrieve the signed document data
      const signedDocumentData = await instance.exportPDF();
      // Convert ArrayBuffer to Blob
      const blob = new Blob([signedDocumentData], { type: "application/pdf" });
      // Send the signed document data to the backend
      mutate(blob);
    }
  };

  return (
    <>
      <Toaster />

      <div className="pdf-view-wrapper">
        <p className="reload-page-to-see-doc">
          If document doesn't appear, please refresh page to view content
          properly.
        </p>
        <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
        {showFinishButton ? (
          isLoading ? (
            <HashLoader
              className="loading-spinner-for-signature"
              color="#36d7b7"
            />
          ) : (
            <button
              id="finish-signature"
              className="finish-signature"
              onClick={finishSigning}
            >
              Finalize
            </button>
          )
        ) : null}
      </div>
    </>
  );
}

/*
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PdfViewerProps {
  document: string;
  signId: string;
}

export default function PdfViewerComponent(props: PdfViewerProps) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [showFinishButton, setShowFinishButton] = useState(false);

  useEffect(() => {
    //This parameter specifies the HTML element where the PSPDFKit
    // viewer will be mounted.
    const container = containerRef.current;

    let PSPDFKit: any;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container);

      const instance = await PSPDFKit.load({
        container,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.VITE_PUBLIC_URL
        }`,
      });

      // Attach event listener for document signing completion
      instance.addEventListener("annotations.change", async () => {
        // Retrieve the signed document data
        const signedDocumentData = await instance.exportPDF();

        // Convert ArrayBuffer to Blob
        const blob = new Blob([signedDocumentData], {
          type: "application/pdf",
        });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Log the URL to view the PDF (optional)
        console.log("Signed document URL:", url);

        // Send the signed document data to the backend
        sendSignedDocumentToBackend(blob);
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  const sendSignedDocumentToBackend = async (signedDocumentBlob: Blob) => {
    try {
      // Make an HTTP POST request to your backend endpoint
      const formData = new FormData();
      formData.append(
        "signedDocument",
        signedDocumentBlob,
        "signed_document.pdf"
      );
      formData.append("is_signed", "true");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/sign-documents/${props.signId}/`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Signed document successfully sent to the backend.");
        setTimeout(() => {
          navigate("/");
        }, 2800);
      } else {
        console.error("Failed to send signed document to the backend.");
      }
    } catch (error) {
      console.error(
        "Error occurred while sending signed document to the backend:",
        error
      );
    }
  };

  return (
    <div className="pdf-view-wrapper">
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      <button
        id="finish-signature"
        className="finish-signature"
        style={{ display: "none" }}
        // onClick={finishSigning}
      >
        Finish
      </button>
    </div>
  );
}

*/
