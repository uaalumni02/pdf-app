import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certficate from "./pages/createCertificate";
import Verify from "./pages/verify";
import Pdf from "./pages/pdf";
import CertficateConfirm from "./pages/certificateConfirm";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Certficate />} />
            <Route exact path="/pdf/:id" element={<Pdf />} />
            <Route exact path="/verify" element={<Verify />} />
            <Route exact path="/confirm/:id" element={<CertficateConfirm />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
