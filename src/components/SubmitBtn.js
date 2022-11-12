import React from "react";
import { MDBBtn } from 'mdb-react-ui-kit';

const SubmitBtn = (props) => {
  return (
    <MDBBtn
      className="btn btn-outline-purple"
      type="submit"
    //   onClick={props.onClick}
    >
     {props.label}
    </MDBBtn>
  );
};

export default SubmitBtn;