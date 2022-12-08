import React from "react";

import { MDBInput } from "mdbreact";

const LastName = props => {
  return (
    <MDBInput
      label="Last Name"
      group
      type="text"
      validate
    />
  );
};

export default LastName;