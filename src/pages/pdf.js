import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import settings from "../config/configData";

import { MDBContainer } from "mdbreact";

const Pdf = () => {
  let { id } = useParams();
  const generatePDF = () => {
    //also look at use react query -----
    fetch(`${settings.apiBaseUrl}/api/generate_certificate/` + id, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.render = "certificate.pdf";
        alink.setAttribute("target", "_blank");
        alink.click();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <MDBContainer>
      <h1 className="confirm_text">Your certificate has been rendered</h1>
      <div className="home_btn">
        <h3>
          <a href="/">Home</a>
        </h3>
      </div>
    </MDBContainer>
  );
};
export default Pdf;
