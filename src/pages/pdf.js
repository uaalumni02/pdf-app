import React, { useEffect } from "react";
import SubmitBtn from "../components/SubmitBtn";
import settings from "../config/configData";

import { MDBContainer } from "mdbreact";

const Pdf = () => {
  const generatePDF = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/generate_certificate/` + id, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "certificate.pdf";
        alink.click();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <MDBContainer>
      <h1 className="confirm_text">Your certificate has been downloaded</h1>
      <div className="home_btn">
        <SubmitBtn
          onClick={(event) => (window.location.href = "/")}
          label="Home"
        />
      </div>
    </MDBContainer>
  );
};
export default Pdf;
