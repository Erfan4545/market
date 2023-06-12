import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";



const ChangePassword = () => {

  const [lastpassword, setLastpassword] = useState(null);
  const [newpassword, setNewPassword] = useState(null);
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleReq = async () => {
    function check(newpassword) {
      if (newpassword.indexOf('#') === -1) {
        setErrorMessage('The password must contain a #');
        return false;
      }


      if (!/[A-Z]/.test(newpassword)) {
        setErrorMessage('The password must contain at least one uppercase letter');
        return false;
      }


      if (!/[a-z]/.test(newpassword)) {
        setErrorMessage('The password must contain at least one lowercase letter');
        return false;
      }


      if (!/\d/.test(newpassword)) {
        setErrorMessage('The password must contain at least one number');
        return false;
      }


      if (newpassword.length < 8) {
        setErrorMessage('The password must be longer than 8 characters');
        return false;
      }


      return true;
    }


    if (check(newpassword)) {
      try {
        setData(
          await axios.put(
            "http://kzico.runflare.run/user/change-password",
            {
              old_password: lastpassword,
              new_password: newpassword,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
        );
        setShowRejex(true)
        setErrorMessage("you have succesfully changed your password")
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }
    } else {
      setShowRejex(true)
    }
  };

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const handleHide = () => {
    setShowRejex(false);
  }

  const handleLastPassword = (event) => {
    setLastpassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  return (
    <div>
      <Row className="setting-bar">
        <Col lg={2.5} md={2.5} sm={2.5} xl={2.5} xs="auto" xxl={2.5}>
          <ListGroup>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/setting/changeProfile"}
            >
              <ListGroup.Item action>changeProfile</ListGroup.Item>
            </Link>

            <ListGroup.Item action variant="secondary">
              changePassword
            </ListGroup.Item>

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/setting/uploadAvatar"}
            >
              <ListGroup.Item action>uploadAvatar</ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>
      <div className="form-cont">
        <div style={{ position: "absolute", top: "20%" }} className="form">
          <div className="input-container">
            <input
              onChange={handleLastPassword}
              required
              id="input"
              type="text"
            />
            <label className="label" for="input">
              Last Password
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input
              onChange={handleNewPassword}
              required
              id="input"
              type="text"
            />
            <label className="label" for="input">
              New Password
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <button
            style={{ marginTop: "80px" }}
            onClick={handleReq}
            className="done-button"
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

    </div>
  );
};
export default ChangePassword;
