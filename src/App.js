import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certficate from "./pages/createCertificate";
import Pdf from "./pages/pdf";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Certficate />} />
          <Route exact path="/pdf/:id" element={<Pdf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
