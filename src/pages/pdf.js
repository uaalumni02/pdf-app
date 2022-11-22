import React, { useEffect } from "react";

const Pdf = () => {
  const generatePDF = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch("http://localhost:3000/api/generate_certificate/" + id, {
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

  return <h1>Your certificate</h1>;
};
export default Pdf;
