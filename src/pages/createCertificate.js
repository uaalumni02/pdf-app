import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SubmitBtn from "../components/SubmitBtn";
import "../certificate.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";

const Certificate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [awardType, setAwardType] = useState([]);
  const [awardId, setAwardId] = useState("");
  const [certificateDate, setCertificateDate] = useState("");
  const [certificateConfirmation, setCertificateConfirmation] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [invalidCertificate, setInvalidCertificate] = useState("");

  const fetchAwardData = () => {
    fetch("http://localhost:3000/api/award", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const award = response.data;
        setAwardType(award);
        setAwardId(response.data[0]._id);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchAwardData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/certificate/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        awardType: awardId,
        certificateDate,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === false) {
          setInvalidCertificate(
            "First and last name must be between 2 & 15 charaters. Date and award type are also required"
          );
        }
        setCertificateId(response.data._id);

        if (response.success) {
          setCertificateConfirmation(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <MDBContainer>
      <header className="logo"></header>
      <br></br>
      {certificateConfirmation ? <Navigate to={`/pdf/${certificateId}`} /> : ""}
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="certificateCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Create Certificate
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <MDBInput
                label="First Name"
                onChange={(e) =>
                  setFirstName(e.target.value.trim())
                }
              />
              <MDBInput
                label="Last Name"
                onChange={(e) =>
                  setLastName(e.target.value.trim())
                }
              />
              <select
                id="defaultFormCardNameEx"
                className="form-control"
                onChange={(e) => setAwardId(e.target.value)}
              >
                {awardType.map((award) => {
                  return (
                    <option value={award._id} key={award._id}>
                      {award.awardType}
                    </option>
                  );
                })}
              </select>
              <br></br>
              <br></br>
              <label
                htmlFor="defaultFormCardNameEx"
                className="grey-text font-weight-light"
              >
                Select Date
              </label>
              <input
                type="date"
                id="defaultFormCardNameEx"
                className="form-control"
                name="certificateDate"
                onChange={(e) => setCertificateDate(e.target.value)}
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Submit"
                  onClick={handleSubmit}
                />
                <SubmitBtn
                  className="btn"
                  label="Verify"
                  onClick={(event) => (window.location.href = "/verify")}
                />
                <p>{invalidCertificate}</p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Certificate;
