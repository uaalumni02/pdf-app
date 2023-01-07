import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
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
  const [invalidCertificate, setInvalidCertificate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificateConfirmation, setCertificateConfirmation] = useState(false);
  const [Name, setName] = useState("");
  const [certificateDate, setCertificateDate] = useState("");
  const [awardType, setAwardType] = useState([]);
  const fetchAwardData = async () => {
    const { data } = await axios.get(`${settings.apiBaseUrl}/api/award`);
    return data;
  };

  const { isLoading, data, error, refetch } = useQuery(
    "certificate",
    fetchAwardData
  );

  const createCertificate = async () => {
    try {
      return await (
        await fetch(`${settings.apiBaseUrl}/api/certificate/`, {
          method: "POST",
          body: JSON.stringify({
            Name,
            certificateDate,
            awardType,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
    } catch (err) {
      throw new Error(err);
    }
  };

  const {
    mutate,
    isLoading: isAddingCertificate,
    error: addError,
  } = useMutation(createCertificate, {
    onSuccess: (data) => {
      console.log(data);
      setCertificateId(data.data._id);
      if (data.success) {
        setCertificateConfirmation(true);
      }
      if (error == null) {
        setInvalidCertificate(
          "First and last name must be between 2 & 15 charaters. Date and award type are also required"
        );
      }
    },
  });

  if (isLoading || isAddingCertificate) return "Loading...";
  if (error || addError) return "An error has occurred: " + error.message;

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
                onChange={({ target: { value } }) => {
                  setName(value);
                }}
              />
              <select
                id="awardPicker"
                className="form-control"
                name="awardId"
                onChange={({ target: { value } }) => {
                  console.log(value);
                  setAwardType(value);
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
                  setCertificateDate(value);
                }}
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Submit"
                  onClick={() => mutate({ Name, certificateDate, awardType })}
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
