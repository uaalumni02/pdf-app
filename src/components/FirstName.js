import React from "react";

import { MDBInput } from "mdbreact";

const FirstName = props => {
  return (
    <MDBInput
      label="First Name"
      onChange={props.onChange}
      group
      type="text"
      validate
    />
  );
};

export default FirstName;