import React, { useEffect, useReducer } from "react";
import initialState from "../store/store";
import reducer from "../reducer/reducer";
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
  const [state, dispatch] = useReducer(reducer, initialState.certificate);
  const fetchAwardData = () => {
    fetch(`${settings.apiBaseUrl}/api/award`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const award = response.data;
        dispatch({
          field: "awardType",
          value: award,
        });
        dispatch({
          field: "awardId",
          value: response.data[0]._id,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchAwardData();
  }, []);

  //can this function be smaller --- check out react query library*******
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/certificate/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        awardType: awardId,
        certificateDate,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === false) {
          dispatch({
            field: "invalidCertificate",
            value:
              "First and last name must be between 2 & 15 charaters. Date and award type are also required",
          });
        }

        dispatch({
          field: "certificateId",
          value: response.data._id,
        });

        if (response.success) {
          dispatch({
            field: "certificateConfirmation",
            value: true,
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const onChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value,
    });
  };

  const {
    Name,
    awardType,
    awardId,
    certificateDate,
    certificateConfirmation,
    certificateId,
    invalidCertificate,
  } = state;

  //state does not need to be in the store; since it is not global

  // check out Tailwind for css-------------

  // dony use <br> use css for that

  //use react router instead of using window.location---see below
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
                label="Name"
                name="Name"
                value={Name}
                onChange={onChange}
              />
              <br></br>
              <select
                id="defaultFormCardNameEx"
                className="form-control"
                name="awardId"
                value={awardId}
                onChange={onChange}
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
                value={certificateDate}
                onChange={onChange}
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Submit"
                  onClick={handleSubmit}
                />
                <p>{invalidCertificate}</p>
                <h3>
                  <a href="/verify">Verify</a>
                </h3>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Certificate;
