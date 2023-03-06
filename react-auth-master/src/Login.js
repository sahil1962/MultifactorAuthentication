import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Webcam from 'react-webcam'
import { Container, Col, Row } from "react-bootstrap";
import * as faceapi from 'face-api.js';
import { saveAs } from 'file-saver'

// import { response } from "../../auth-backend-master/app";

const cookies = new Cookies();
var createdToken;
var data1 = {}



export default function Login() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_matched, setis_matched] = useState("");
  const [login, setLogin] = useState(false);
  const [TokenSent, setTokenSent] = useState(false);
  const [tokenINput, setToken] = useState("");

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
      console.log(email)

      const pictureSrc = webcamRef.current.getScreenshot()
      setPicture(pictureSrc)
      console.log("Photo ->>" + pictureSrc)
      saveAs(pictureSrc, email + "2.jpg");
      setPhotoCaptured(true);


      axios.post('http://localhost:3000/checkpic', {
        email: email
      })
        .then(function (response) {
          console.log(response);
          setis_matched(response.data.message)
          console.log("Is matched : " + is_matched)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  })




  const handleGenerateToken = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        createdToken = (result.data.token)
        data1 = {
          email,
          createdToken
        }
        const response = axios.post("http://localhost:3000/sendemail", data1)
        console.log(response)
        setTokenSent(true);

      })
      .catch((error) => {
        error = new Error();
      });
  };


  const handleSubmit = (e1) => {
    // prevent the form from refreshing the whole page
    e1.preventDefault();
    // set the cookie
    if ((createdToken === tokenINput && is_matched == "Matched" )|| login === true) {
      cookies.set("TOKEN", tokenINput, {
        path: "/",
      });
      setLogin(true);
      // redirect user to the auth page
      window.location.href = "/auth";
    }
  };



  return (
    <Container>
      <Row>
        <Col>
          <h2>Login</h2>
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
              />
            </Form.Group>

            {/* Token request button */}
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleGenerateToken(e)}
            >
              Generate Token
            </Button>
            {/* display success message */}
            {TokenSent ? (
              <p className="text-success">Token sent Successfully</p>
            ) : (
              <p className="text-danger">Create token</p>
            )}
            <hr />
            {/* Token Input */}
            <Form.Group controlId="formBasicToken">
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="text"
                name="token"
                value={tokenINput}
                onChange={(e1) => setToken(e1.target.value)}
                placeholder="Token"
              />
            </Form.Group>

            {/* submit button */}
            <Button
              variant="primary"
              type="submit"
              onClick={(e1) => handleSubmit(e1)}
            >
              Login
            </Button>
            {/* display success message */}
            {login ? (
              <p className="text-success">You Are Logged in Successfully</p>
            ) : (
              <p className="text-danger">You Are Not Logged in</p>
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
                {is_matched === "Matched" ? (
                  <p className="text-success">Matched</p>
                ) : (
                  <p className="text-danger">Not Matched</p>
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
      </Row>
    </Container>
  );
}
