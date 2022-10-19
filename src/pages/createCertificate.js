import React from "react";

// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { MDBInput } from "mdb-react-ui-kit";

const Certificate = () => {
  return (
    <div>
      <h1>Hi</h1>
      {/* -----> use a card *************** */}
      <MDBInput
        label="Form control lg"
        id="formControlLg"
        type="text"
        size="lg"
      />
      <br />
      <MDBInput
        label="Form control default"
        id="formControlDefault"
        type="text"
      />
      <br />
      <MDBInput
        label="Form control sm"
        id="formControlSm"
        type="text"
        size="sm"
      />
    </div>
  );
};
export default Certificate;
