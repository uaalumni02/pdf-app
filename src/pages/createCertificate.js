import React, { useState, useEffect } from "react";
// import FirstName from "../components/FirstName";
// import LastName from "../components/LastName";
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

const Certificate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [awardType, setAwardType] = useState([]);
  const [awardId, setAwardId] = useState("");
  const [certificateDate, setCertificateDate] = useState("");

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
        certificateDate
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
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
                  Create Certificate
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              {/* <FirstName first_name="firstName" value={firstName} onChange={onChange} /> */}
              <MDBInput
                label="First Name"
                onChange={(e) =>
                  setFirstName(e.target.value.toLowerCase().trim())
                }
              />
              <MDBInput
                label="Last Name"
                onChange={(e) =>
                  setLastName(e.target.value.toLowerCase().trim())
                }
              />
              {/* <LastName last_name="lastName" /> */}
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
                onChange={e => setCertificateDate(e.target.value)}
              />
              <div className="text-center py-4 mt-3">
                <SubmitBtn label="Submit" onClick={handleSubmit} />
                {/* <MDBBtn
                  color="danger"
                  type="submit"
                  className="btn-block z-depth-2"
                  onClick={handleSubmit}
                >
                </MDBBtn> */}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Certificate;
