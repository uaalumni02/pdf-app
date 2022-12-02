import React, { useState } from "react";
import SubmitBtn from "../components/SubmitBtn";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [invalidCertificate, setInvalidCertificate] = useState("");
  const handleSubmit = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch("http://localhost:3000/api/certificate/" + certificateId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.success === false) {
          setInvalidCertificate("Invalid Certificate Id");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <MDBContainer>
      <header className="logo"></header>
      <br></br>
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="certificateCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Verify Certificate Enter Code
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <MDBInput
                label="Enter Code"
                onChange={(e) =>
                  setCertificateId(e.target.value.toLowerCase().trim())
                }
              />

              <br></br>
              <br></br>

              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Verify"
                  onClick={handleSubmit}
                />
                <SubmitBtn
                  className="btn"
                  onClick={(event) => (window.location.href = "/")}
                  label="Home"
                />
                <br></br><br></br>
                <p>{invalidCertificate}</p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Verify;
