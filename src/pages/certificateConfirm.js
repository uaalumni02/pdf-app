import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import settings from "../config/configData";
import moment from "moment";

import "../static/certificate.css"

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

const Certificate = () => {
  let { id } = useParams();
  const fetchCertificateData = async () => {
    const { data } = await axios.get(
      `${settings.apiBaseUrl}/api/certificate/` + id
    );
    return data;
  };

  const { isLoading, data, error } = useQuery(
    "certificateConfirmation",
    fetchCertificateData
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <MDBContainer className="verify">
      <header className="logo"></header>
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
                This certificate was awarded to {data.data.Name}
                for {data.data.awardType.awardType} on{" "}
                {moment.unix(data.data.certificateDate).format("MM/DD/YYYY")}
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
