import React, { useState, useEffect, useContext } from "react";
import FirstName from "../components/FirstName";
import LastName from "../components/LastName";
import CertificateType from "../components/CertificateType";
import SubmitBtn from "../components/SubmitBtn";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

const Certificate = () => {
  const [awardName, setAwardNames] = useState([]);

  const fetchAwardData = () => {
    fetch("http://localhost:3000/api/award", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchAwardData();
  }, []);

  return (
    <MDBContainer>
      <header className="logo">
        {/* <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        /> */}
      </header>
      <br></br>
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
              <FirstName first_name="firstName" />
              <LastName last_name="lastName" />
              <CertificateType certificate_type="certificateType" />
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
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn label="Submit" />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Certificate;
