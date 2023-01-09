import React, { useEffect, useReducer } from "react";
import initialState from "../store/store";
import reducer from "../reducer/reducer";
import settings from "../config/configData";
import moment from "moment";

import "../certificate.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

const Certificate = () => {
  const [state, dispatch] = useReducer(reducer, initialState.certificate);
  const fetchCertificateData = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/certificate/` + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const name = response.data.Name;
        const type = response.data.awardType.awardType;
        const date = moment
          .unix(response.data.certificateDate)
          .format("MM/DD/YYYY");
        console.log(date);
        dispatch({
          field: "Name",
          value: name,
        });
        dispatch({
          field: "awardType",
          value: type,
        });
        dispatch({
          field: "certificateDate",
          value: date,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchCertificateData();
  }, []);

  const { Name, awardType, certificateDate } = state;

  return (
    <MDBContainer>
      <header className="logo"></header>
      <br></br> <br></br>
      <br></br> <br></br>
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="certificateCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Certificate Details
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <h6>
                This certificate was awarded to {Name} for {awardType} on{" "}
                {certificateDate}
              </h6>

              <h5>
                <a href="/">Home</a>
              </h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Certificate;
