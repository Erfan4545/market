import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./setting_changeProfile.css";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from "react-bootstrap/Modal";


const UploadAvatar = () => {
  const [pic, setPic] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  const handleReq = async () => {
    setLoading(true);
    setSuccess(null);
    const formData = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setSuccess(success + 1)
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      setShowRejex(true);
      setLoading(false);
    }
  };

 
  const handleHide = () => {
    setShowRejex(false);
  }



  const handleFile = (event) => {
    setPic(event.target.files[0]);
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
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/setting/changePassword"}
            >
              <ListGroup.Item action>changePassword</ListGroup.Item>
            </Link>

            <ListGroup.Item action variant="secondary">
              uploadAvatar
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <div className="upload-avatar-back">
        <input onChange={handleFile} type="file" />
        {loading == false ?
          <button className="upload-avatar-button" onClick={handleReq}>
            Upload
          </button>
          :
          <Button style={{
            border: "none",
            width: "12rem",
            margin: "0 auto",
            marginTop: "20px",
            height: "35px"
          }} variant="secondery" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Uploading...
          </Button>

        }
        {success && <p style={{ color: "grey", margin: "5px" }} > Avatar uploaded </p>}

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
export default UploadAvatar;
