import React from "react";

import { MDBRadio } from "mdb-react-ui-kit";

const CertificateType = (props) => {
  return (
    <div>
      <MDBRadio
        name="flexRadioDefault"
        id="flexRadioDefault1"
        label="Default radio"
      />
      <MDBRadio
        name="flexRadioDefault"
        id="flexRadioDefault2"
        label="Default checked radio"
        defaultChecked
      />
    </div>
  );
};

export default CertificateType;
