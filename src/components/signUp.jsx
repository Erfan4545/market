import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";


const SignUp = () => {
  const [showError, setShowError] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const pos = async () => {
    function check(password, confirmPassword, mobile, emailAddress, userName) {
      console.log(userName)
      if (password.indexOf('#') === -1) {
        setErrorMessage('The password must contain a #');
        return false;
      }


      if (!/[A-Z]/.test(password)) {
        setErrorMessage('The password must contain at least one uppercase letter');
        return false;
      }


      if (!/[a-z]/.test(password)) {
        setErrorMessage('The password must contain at least one lowercase letter');
        return false;
      }


      if (!/\d/.test(password)) {
        setErrorMessage('The password must contain at least one number');
        return false;
      }


      if (password.length < 8) {
        setErrorMessage('The password must be longer than 8 characters');
        return false;
      }
      if (new RegExp(`^${password}$`).test(confirmPassword) == false) {
        setErrorMessage('The password is not confirmed correctly');
        return false;
      }


      if (userName.length < 5) {
        setErrorMessage('User name should be 5 or more charecters ');
        return false;
      }

      if (mobile.length != 11) {
        setErrorMessage('Phone number should be 11 numbers');
        return false;
      }
      if (/^\d+$/.test(mobile) == false) {
        setErrorMessage('Phone number should be numbers');
        return false;
      }

      if (/@/.test(emailAddress) == false && /\.[a-zA-Z]{2,}$/.test(emailAddress) == false) {
        setErrorMessage('Invalid email address');
        return false;
      }



      return true;
    }





    if (check(password, confirmPassword, mobile, emailAddress, userName)) {
      setDisabled(true);
      try {
        const { data } = await axios.post(
          "http://kzico.runflare.run/user/signup",
          {
            username: userName,
            email: emailAddress,
            password: password,
            mobile: mobile,
          }
        );
        console.log(data);
        setSignedUp(true);
        setShowRejex(true)
        setErrorMessage("you have succesfully signed up")
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }

      setDisabled(false);
    } else {
      setShowError(true);
      setShowRejex(true);
    }
  };

  const handleHide = () => {
    setShowRejex(false);
  }



  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMobile = (event) => {
    setMobile(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (

    <>

      <div className="form-cont">
        <div className="form">
          <div className="input-container">
            <input onChange={handleUserName} required id="input" type="text" />
            <label className="label" for="input">
              UserName
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleEmail} required id="input" type="text" />
            <label className="label" for="input">
              Email
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handlePassword} required id="input" type="text" />
            <label className="label" for="input">
              Password
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleConfirmPassword} required id="input" type="text" />
            <label className="label" for="input">
              Confirm Password
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleMobile} required id="input" type="text" />
            <label className="label" for="input">
              Phone Number
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <button
            className="button-submit"
            disabled={disabled}
            onClick={pos}
          ></button>
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

export default SignUp;
