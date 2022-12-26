import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import initialState from "../store/store";
import reducer from "../reducer/reducer";
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
  const [state, dispatch] = useReducer(reducer, initialState.verify);
  const handleSubmit = () => {
    // use react query---needs to be smaller ----------
    fetch(`${settings.apiBaseUrl}/api/certificate/` + certificateId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === false) {
          dispatch({
            field: "invalidCertificate",
            value: "Invalid Certificate Id",
          });
        }
        if (response.success) {
          dispatch({
            field: "certificateConfirmation",
            value: true,
          });
        }
        if (certificateId === "") {
          dispatch({
            field: "certificateConfirmation",
            value: false,
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

  const { certificateId, invalidCertificate, certificateConfirmation } = state;

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
                onChange={onChange}
              />
              <br></br>
              <br></br>

              <div className="text-center py-4 mt-3">
                <SubmitBtn
                  className="btn"
                  label="Verify"
                  onClick={handleSubmit}
                  type="Submit"
                />
                <br></br>
                <br></br>
                <p>{invalidCertificate}</p>
                <p>
                  <a href="/">Home</a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Verify;
