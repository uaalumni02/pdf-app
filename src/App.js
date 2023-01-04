import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certficate from "./pages/createCertificate";
import Verify from "./pages/verify";
import Pdf from "./pages/pdf";
import CertficateConfirm from "./pages/certificateConfirm";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Certficate />} />
          <Route exact path="/pdf/:id" element={<Pdf />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/confirm/:id" element={<CertficateConfirm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
