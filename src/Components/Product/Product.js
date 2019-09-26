import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const Card = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "18rem", height: "25rem" }}>
        <MDBCardImage className="img-fluid" src={props.image} waves width='100%' />
        <MDBCardBody>
          <MDBCardTitle>{props.name}</MDBCardTitle>
          <MDBCardText>Rs: &nbsp;
           {props.prize}
          </MDBCardText>
          <MDBBtn href="#">Order</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;