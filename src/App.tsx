import Dashbord from "./pages/dashbord";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserAccount from "./pages/Account";
import Documents from "./pages/Documents";
import Templates from "./pages/Templates";
import Signature from "./pages/Signature";
import Billing from "./pages/Billing";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import LoginPage from "./pages/LoginPage";
import RegisterUser from "./pages/RegisterUser";
import DocumentSignPage from "./pages/DocumentSignPage";
import SingleDocumentStatus from "./pages/SingleDocumentStatus";
import DownloadDocumentLogFiles from "./pages/DownloadDocument";

// import EmailForm from "./components/SignDocument";
// import FileListForm from "./pages/file-list-try";

import { AuthProvider } from "./contexts/AuthContext";
import { DocumentListProvider } from "./contexts/DocumentsContext";
// import PrivateRoutes from "./utils/PrivateRout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

import { pdfjs } from "react-pdf";
import Footer from "./components/Footer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <div>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Header />
            <Routes>
              <Route>
                <Route path="/" element={<HomePage />} />
              </Route>
              {/* <Route element={<PrivateRoutes />}>
                <Route path="/" element={<HomePage />} />
              </Route> */}
            </Routes>
            <Routes>
              <Route path="/dashbord" element={<Dashbord />} />
            </Routes>
            <Routes>
              <Route path="/account" element={<UserAccount />} />
            </Routes>
            <Routes>
              <Route
                path="/documents"
                element={
                  <DocumentListProvider>
                    <Documents />
                  </DocumentListProvider>
                }
              />
            </Routes>
            <Routes>
              <Route path="/templates" element={<Templates />} />
            </Routes>
            <Routes>
              <Route path="/signature" element={<Signature />} />
            </Routes>
            <Routes>
              <Route path="/billing" element={<Billing />} />
            </Routes>
            <Routes>
              <Route path="/users" element={<Users />} />
            </Routes>
            <Routes>
              <Route path="/teams" element={<Teams />} />
            </Routes>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Routes>
              <Route path="/register" element={<RegisterUser />} />
            </Routes>
            <Routes>
              <Route
                path="/sign-documents/:id"
                element={<DocumentSignPage />}
              />
            </Routes>
            <Routes>
              <Route
                path="/document-status/:id"
                element={
                  <DocumentListProvider>
                    <SingleDocumentStatus />
                  </DocumentListProvider>
                }
              />
            </Routes>
            <Routes>
              <Route
                path="/download-document-log-file/:id"
                element={
                  <DocumentListProvider>
                    <DownloadDocumentLogFiles />
                  </DocumentListProvider>
                }
              />
            </Routes>
            <Footer />
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
