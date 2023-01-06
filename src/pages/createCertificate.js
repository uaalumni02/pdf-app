import React, { useEffect, useReducer, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
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
  const [state, setState] = useState({
    Name: "",
    awardType: [],
    certificateDate: "",
  });
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
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch("http://localhost:3000/api/certificate/", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       Name,
  //       awardType: awardId,
  //       certificateDate,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.success === false) {
  //         dispatch({
  //           field: "invalidCertificate",
  //           value:
  //             "First and last name must be between 2 & 15 charaters. Date and award type are also required",
  //         });
  //       }

  //       dispatch({
  //         field: "certificateId",
  //         value: response.data._id,
  //       });

  //       if (response.success) {
  //         dispatch({
  //           field: "certificateConfirmation",
  //           value: true,
  //         });
  //       }
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };

  // const onChange = (e) => {
  //   dispatch({
  //     field: e.target.name,
  //     value: e.target.value,
  //   });
  // };

  // const {
  //   Name,
  //   awardType,
  //   awardId,
  //   certificateDate,
  //   certificateConfirmation,
  //   certificateId,
  //   invalidCertificate,
  // } = state;

  //state does not need to be in the store; since it is not global

  // check out Tailwind for css-------------

  // dony use <br> use css for that

  //use react router instead of using window.location---see below
  return (
    <MDBContainer>
      <header className="logo"></header>
      <br></br>
      {/* {certificateConfirmation ? <Navigate to={`/pdf/${certificateId}`} /> : ""} */}
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
                // onChange={onChange}
                onChange={({ target: { value } }) => {
                  setState({ ...state, Name: value });
                }}
              />
              <br></br>
              <select
                id="defaultFormCardNameEx"
                className="form-control"
                name="awardId"
                // value={awardId}
                // onChange={onChange}
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
                // value={certificateDate}
                // onChange={onChange}
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
                {/* <p>{invalidCertificate}</p> */}
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
