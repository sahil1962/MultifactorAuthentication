import React from "react";
import { Col, Row } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

export default function Account() {
  return (
    <Row>
     
      <Col xs={12} sm={12} md={6} lg={12}>
        
        <h1  class="display-1 text-center">Multi Factor Authentication</h1>
        <hr />
        <br />
        <br />
      </Col>

      
      <Col xs={12} sm={12} md={6} lg={12}>
        <hr />
      <h1  class="display-4 text-center">Aqeel Afzal 19i0650</h1>
        <hr />
        <h1  class="display-4 text-center">Sahil Parkash 19i0679</h1>
        <hr />
        <h1  class="display-4 text-center">Abid Hussain 19i1982</h1>
        <hr />  
      </Col>
    </Row>
  );
}
