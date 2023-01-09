import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import settings from "../config/configData";

import SubmitBtn from "../components/SubmitBtn";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [invalidCertificate, setInvalidCertificate] = useState("");
  const [certificateConfirmation, setCertificateConfirmation] = useState(false);

  const handleSubmit = async () => {
    const { data } = await axios.get(
      `${settings.apiBaseUrl}/api/certificate/` + certificateId
    );
    return data;
  };

  const { mutate } = useMutation(handleSubmit, {
    onSuccess: (data) => {
      setCertificateId(data.data._id);
      if (data.success) {
        setCertificateConfirmation(true);
      }
      if (certificateId == "") {
        setCertificateConfirmation(false);
      }
    },
    onError: (error) => {
      if (error) {
        setInvalidCertificate("Invalid Certificate Id");
      }
      throw error;
    },
  });

  return (
    <MDBContainer>
      <header className="logo"></header>
      <br></br>
      {certificateConfirmation ? (
        <Navigate to={`/confirm/${certificateId}`} />
      ) : (
        ""
      )}
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="certificateCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Verify Certificate Enter ID
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <MDBInput
                required
                type="text"
                label="Enter ID"
                name="certificateId"
                value={certificateId}
                onChange={({ target: { value } }) => {
                  setCertificateId(value);
                }}
              />
              <br></br>
              <br></br>

              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Verify"
                  type="Submit"
                  onClick={() => mutate()}
                />
                <br></br>
                <br></br>
                <h3>
                  <a href="/">Home</a>
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
export default Verify;
