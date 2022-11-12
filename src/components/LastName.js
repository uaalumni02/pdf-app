import React from "react";

import { MDBInput } from "mdbreact";

const LastName = props => {
  return (
    <MDBInput
    //   name={props.name}
      label="Last Name"
    //   onChange={props.onChange}
      group
      type="text"
      validate
    />
  );
};

export default LastName;