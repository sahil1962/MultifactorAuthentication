import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Webcam from 'react-webcam'
import { saveAs } from 'file-saver'
import { Container, Col, Row } from "react-bootstrap";





export default function Register() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [PhotoCaptured, setPhotoCaptured] = useState(false);


  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: 'user',
  }

  const capture = React.useCallback(() => {

    if (email !== "" && password !== "") {
      const pictureSrc = webcamRef.current.getScreenshot()
      setPicture(pictureSrc)
      console.log("Photo ->>" + pictureSrc)
      saveAs(pictureSrc, email + "1.jpg");
      setPhotoCaptured(true);
    }

  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (PhotoCaptured === true) {    // prevent the form from refreshing the whole page


      // set configurations
      const configuration = {
        method: "post",
        url: "http://localhost:3000/register",
        data: {
          email,
          password,
        },
      };

      // make the API call
      axios(configuration)
        .then((result) => {
          setRegister(true);
        })
        .catch((error) => {
          // error = new Error();
          console.log(error)
        });
      setEmail("");
      setPassword("")
      setPicture("")
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Register</h2>
          <Form onSubmit={(e) => handleSubmit(e)}>
            {/* email */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            {/* password */}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>

            {/* submit button */}
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Register
            </Button>

            {/* display success message */}
            {register ? (
              <p className="text-success">You Are Registered Successfully</p>
            ) : (
              <p className="text-danger">You Are Not Registered</p>
            )}

          </Form>
        </Col>

        <Col>
          <Form>
            <Form.Group>
              <h2 className="mb-0 text-left">
                Identity verification
              </h2>
              <div>
                {picture === '' ? (
                  <Webcam
                    audio={false}
                    height={300}
                    ref={webcamRef}
                    width={300}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    mirrored={true}
                    screenshotQuality={1}
                  />
                ) : (
                  <img src={picture} />
                )}
              </div>
              {/* Photo capture button */}
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  capture()
                }}
                className="btn btn-danger"
              >
                Take Photo
              </Button>
              <div>
                {picture !== '' ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setPicture("")
                    }}
                    className="btn btn-primary"
                  >
                    Retakes
                  </button>
                ) :
                  (
                    <p></p>
                  )}

                {/* display success message */}
                {PhotoCaptured !== false ? (
                  <p className="text-success">Photo Captured Successfully</p>
                ) : (
                  <p className="text-danger">Verify your identity</p>
                )}



              </div>
            </Form.Group>
            <hr />
          </Form>
        </Col>

      </Row >
    </Container>
  );
}
