import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import settings from "../config/configData";

import { MDBContainer } from "mdbreact";

const Pdf = () => {
  let { id } = useParams();
  const generatePDF = async () => {
    const { data } = await axios.get(
      `${settings.apiBaseUrl}/api/generate_certificate/` + id,
      { responseType: "arraybuffer" }
    );
    const blob = new Blob([data], { type: "application/pdf" });
    const fileURL = window.URL.createObjectURL(blob);
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.render = "certificate.pdf";
    alink.setAttribute("target", "_blank");
    alink.click();
  };

  useEffect(() => {
    generatePDF();
  }, [])

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
