import React, { useState, ChangeEvent, useRef } from "react";
import AuthToken from "../utils/AuthToken";
import { UserX } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PacmanLoader } from "react-spinners";

/*
************ why useMutation and useQueryClient ***************
- useMutation:  The useMutation hook in React Query is primarily 
                designed to handle asynchronous mutations, including
                HTTP POST requests or any other side effects that involve
                sending data to a server and receiving a response.

- useQueryClient: The useQueryClient hook in React Query provides access
                  to the query client instance. The query client is a central
                  piece of React Query that manages the state and cache for
                  your queries. It allows you to interact with the query cache,
                  invalidate queries, refetch data, and more.
*/

interface EmailFormProps {}

const EmailForm: React.FC<EmailFormProps> = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const queryClient = useQueryClient();

  const accessToken = AuthToken();

  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  /*
  - mutate: Function provided by React Query for triggering the mutation.
  - isLoading: Boolean indicating whether the mutation is in progress.
  */
  const { mutate, isLoading } = useMutation(
    // Define the mutation function
    async () => {
      try {
        const formData = new FormData();
        formData.append("recipient_emails", JSON.stringify(emails));
        formData.append("message", JSON.stringify(message));

        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
          }
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/send-signing-request/",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + String(accessToken),
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error: any) {
        toast.error("Error Uploading Document");
        console.error("Error:", error.message);
        setFiles(null);
        setEmails([""]);
        setMessage("");
        throw error; // Rethrow the error to let React Query handle it
      }
    },
    {
      // Invalidate and refetch data when the mutation is successful
      onSuccess: () => {
        toast.success("Document has been sent");
        queryClient.invalidateQueries(["sign-documents"]);
        setFiles(null);
        setEmails([""]);
        setMessage("");
      },
    }
  );

  const handleSendRequest = () => {
    mutate();
  };

  return (
    <div className="document-sign-wrapper">
      <Toaster richColors />

      <div className="signing-related-inputes">
        <div className="files-input">
          {/* File input for uploading files */}
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />

          {/* Custom-styled button */}
          <button className="add-file select-file" onClick={handleButtonClick}>
            {files ? `Selected: ${setFiles.length} files` : "Add files to sign"}
          </button>
        </div>

        <div className="emailes-input-btn">
          <div className="email-input-btn">
            {emails.map((email, index) => (
              <div key={index} className="email-input-wrapper">
                <input
                  type="email"
                  value={email}
                  className="email-input"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEmailChange(index, e.target.value)
                  }
                />
                <button onClick={() => handleRemoveEmail(index)}>
                  <UserX className="user-x" />
                </button>
              </div>
            ))}
          </div>
          <div className="add-contact" onClick={handleAddEmail}>
            <span className="plus-sign">+</span> Add contact
          </div>
        </div>

        <div className="sender-message">
          {/* Message input */}
          <textarea
            className="message-input"
            placeholder="Message"
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
        </div>

        <div className="left-col-footer">
          <button className="btn help-btn">Help</button>

          {isLoading ? (
            <PacmanLoader color="#36d7b7" />
          ) : (
            <button
              onClick={() => {
                handleSendRequest();
              }}
              disabled={
                !(
                  files &&
                  emails.every((email) => email.trim() !== "") &&
                  message.trim() !== ""
                )
              }
              className={`btn ${
                !(
                  files &&
                  emails.every((email) => email.trim() !== "") &&
                  message.trim() !== ""
                )
                  ? "disabled-btn"
                  : "active-btn"
              }`}
            >
              Sign
            </button>
          )}
          <button className="btn setting-btn">Setting</button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;

// import React, { useState, ChangeEvent, useRef } from "react";
// import AuthToken from "../utils/AuthToken";
// import { UserX } from "lucide-react";
// import { Toaster, toast } from "sonner";

// interface EmailFormProps {}

// const EmailForm: React.FC<EmailFormProps> = () => {
//   const [emails, setEmails] = useState<string[]>([]);
//   const [files, setFiles] = useState<FileList | null>(null);

//   const accessToken = AuthToken();

//   const [message, setMessage] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleEmailChange = (index: number, value: string) => {
//     const newEmails = [...emails];
//     newEmails[index] = value;
//     setEmails(newEmails);
//   };

//   const handleAddEmail = () => {
//     setEmails([...emails, ""]);
//   };

//   const handleRemoveEmail = (index: number) => {
//     const newEmails = [...emails];
//     newEmails.splice(index, 1);
//     setEmails(newEmails);
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(e.target.files);
//     }
//   };

//   const handleButtonClick = () => {
//     // Trigger the hidden file input
//     fileInputRef.current?.click();
//   };

//   const handleSendRequest = () => {
//     const formData = new FormData();

//     // Add emails to formData
//     formData.append("recipient_emails", JSON.stringify(emails));
//     formData.append("message", JSON.stringify(message));

//     // Add files to formData
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         formData.append("files", files[i]);
//       }
//     }

//     // Send a POST request to the Django backend
//     fetch("http://127.0.0.1:8000/api/send-signing-request/", {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + String(accessToken),
//       },
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="document-sign-wrapper">
//       <div className="signing-related-inputes">
//         <div className="files-input">
//           {/* File input for uploading files */}
//           {/* Hidden file input */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             multiple
//           />

//           {/* Custom-styled button */}
//           <button className="add-file select-file" onClick={handleButtonClick}>
//             {files ? `Selected: ${setFiles.length} files` : "Add files to sign"}
//           </button>
//         </div>

//         <div className="emailes-input-btn">
//           <div className="email-input-btn">
//             {emails.map((email, index) => (
//               <div key={index} className="email-input-wrapper">
//                 <input
//                   type="email"
//                   value={email}
//                   className="email-input"
//                   onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                     handleEmailChange(index, e.target.value)
//                   }
//                 />
//                 <button onClick={() => handleRemoveEmail(index)}>
//                   <UserX className="user-x" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="add-contact" onClick={handleAddEmail}>
//             <span className="plus-sign">+</span> Add contact
//           </div>
//         </div>

//         <div className="sender-message">
//           {/* Message input */}
//           <textarea
//             className="message-input"
//             placeholder="Message"
//             value={message}
//             onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//               setMessage(e.target.value)
//             }
//           />
//         </div>

//         <div className="left-col-footer">
//           <button className="btn help-btn">Help</button>
//           <Toaster richColors />
//           <button
//             onClick={() => {
//               toast.success("Document has been sent");
//               handleSendRequest();
//             }}
//             className="btn sign-btn"
//           >
//             Sign
//           </button>
//           <button className="btn setting-btn">Setting</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailForm;