import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import settings from "../config/configData";

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
} from "mdbreact";

const Certificate = () => {
  const [state, setState] = useState({
    Name: "",
    awardType: [],
    certificateDate: "",
  });
  const [invalidCertificate, setInvalidCertificate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificateConfirmation, setCertificateConfirmation] = useState(false);
  const fetchAwardData = async () => {
    const { data } = await axios.get(`${settings.apiBaseUrl}/api/award`);
    return data;
  };

  const { isLoading, data, error } = useQuery("certificate", fetchAwardData);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleSubmit = (event) => {
    event.preventDefault();
    return fetch(`${settings.apiBaseUrl}/api/certificate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
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
      });
  };
  return (
    <MDBContainer>
      <header className="logo"></header>
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
                label="Name"
                name="Name"
                value={state.Name}
                onChange={({ target: { value } }) => {
                  setState({ ...state, Name: value });
                }}
              />
              <select
                id="awardPicker"
                className="form-control"
                name="awardId"
                onChange={({ target: { value } }) => {
                  setState({ ...state, awardType: value });
                }}
              >
                {data.data.map((award) => {
                  return (
                    <option value={award._id} key={award._id}>
                      {award.awardType}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="defaultFormCardNameEx"
                className="grey-text font-weight-light"
              >
                Select Date
              </label>
              <input
                type="date"
                id="datePicker"
                className="form-control"
                name="certificateDate"
                onChange={({ target: { value } }) => {
                  setState({ ...state, certificateDate: value });
                }}
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Submit"
                  onClick={handleSubmit}
                />
                <h3>
                  <a href="/verify">Verify</a>
                </h3>
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
