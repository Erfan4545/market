import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";



const LoginPage = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleReq = async () => {
    try {
      setData(
        await axios.post("http://kzico.runflare.run/user/login", {
          email: emailAddress,
          password: password,
        })
      );
      setErrorMessage("you have succesfully singed in")
      setShowRejex(true)
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message)
      setShowRejex(true)
    }
  };


  
  const handleHide = () => {
    setShowRejex(false);
  }

  const handleEmail = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.data.user.token);
      props.setTheData(data);
    }
  }, [data]);

  return (
<>


    <div className="form-cont">
      <div style={{ marginTop: "-4rem" }} className="form">
        <div style={{ marginTop: "4rem" }} className="input-container">
          <input onChange={handleEmail} required id="input" type="text" />
          <label className="label" for="input">
            Email / UserName
          </label>
          <div className="underline"></div>
          <div className="sideline"></div>
          <div className="upperline"></div>
          <div className="line"></div>
        </div>
        <div style={{ marginTop: "4rem" }} className="input-container">
          <input onChange={handlePassword} required id="input" type="text" />
          <label className="label" for="input">
            Password
          </label>
          <div className="underline"></div>
          <div className="sideline"></div>
          <div className="upperline"></div>
          <div className="line"></div>
        </div>
      </div>
      <div className="buttons">
        <Link
          style={{ textDecoration: "none" }}
          to={"/signup"}
          className="button"
        ></Link>
        <button onClick={handleReq} className="buttonS"></button>
      </div>
    </div>



    <Modal show={showRejex} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>message</Modal.Title>
        </Modal.Header>
        <Modal.Body> {errorMessage} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPage;
