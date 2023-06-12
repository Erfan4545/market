import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./setting_changeProfile.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";


const Setting = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  const handleReq = async () => {
    function check(firstName, lastName, gender, age, city) {
       console.log(firstName)

      if (firstName == null ||  firstName.length < 3) {
        setErrorMessage('First name must be longer than 3 characters');
        return false;
      }
      if (lastName == null || lastName.length < 3) {
        setErrorMessage('Last name must be longer than 3 characters');
        return false;
      }


      if (city == null || city.length < 3) {
        setErrorMessage('City name must be longer than 3 characters');
        return false;
      }

      if (/^\d+$/.test(age) == false) {
        setErrorMessage('Age should be numbers');
        return false;
      }

      if (/^(male|female)$/i.test(gender) == false) {
        setErrorMessage('gender should be either male or female');
        return false;
      }



      return true;
    }


    if (check(firstName, lastName, gender, age, city)) {
      try {
        setData(
          await axios.put(
            "http://kzico.runflare.run/user/change-profile",
            {
              firstname: firstName,
              lastname: lastName,
              gender: gender,
              age: age,
              city: city,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
        );
        setShowRejex(true)
        setErrorMessage("you have succesfully changed your profile")
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setShowRejex(true)
      }
    } else {
      setShowRejex(true)
    }
  };


  const handleHide = () => {
    setShowRejex(false);
  }

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);


  const handleFirstname = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastname = (event) => {
    setLastName(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>



      <Row className="setting-bar">
        <Col lg={2.5} md={2.5} sm={2.5} xl={2.5} xs="auto" xxl={2.5}>
          <ListGroup>
            <ListGroup.Item action variant="secondary">
              changeProfile
            </ListGroup.Item>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/setting/changePassword"}
            >
              <ListGroup.Item action>changePassword</ListGroup.Item>
            </Link>
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
        <div className="form">
          <div className="input-container">
            <input onChange={handleFirstname} required id="input" type="text" />
            <label className="label" for="input">
              First Name
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleLastname} required id="input" type="text" />
            <label className="label" for="input">
              Last Name
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleGender} required id="input" type="text" />
            <label className="label" for="input">
              Gender
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleAge} required id="input" type="text" />
            <label className="label" for="input">
              Age
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <input onChange={handleCity} required id="input" type="text" />
            <label className="label" for="input">
              City
            </label>
            <div className="underline"></div>
            <div className="sideline"></div>
            <div className="upperline"></div>
            <div className="line"></div>
          </div>
          <button onClick={handleReq} className="done-button"></button>
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
export default Setting;
