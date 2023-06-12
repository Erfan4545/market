import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { Badge, Col, Container, Row } from "react-bootstrap";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemAmounts, setItemAmounts] = useState(0);
  const [thenumber, setThenumber] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedStore = localStorage.getItem("store");
    const item = JSON.parse(storedStore);
    item && setThenumber(item.reduce((total, item) => total + item.amount, 0));
    if (localStorage.getItem("token") != 0) {
      setIsLoading(false);
      props.loginState(true);
    }
  }, []);

  useEffect(() => {
    if (isLoading == false) {
      props.loginState(true);

      axios
        .get("http://kzico.runflare.run/user/profile", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (profile) {
           localStorage.setItem("phone" , profile.user.mobile);
    }
  }, [profile]);


  useEffect(() => {
    if (props.Data) {
      setIsLoading(false);
    }
  }, [props.Data]);

  useEffect(() => {
    if (props.amount) {
      setItemAmounts(itemAmounts + 1);
      setShowBadge(true);
    }
  }, [props.amount]);

  useEffect(() => {
    if (props.amount2) {
      setThenumber(0);
    }
  }, [props.amount2]);

  useEffect(() => {
    if (thenumber != null && props.removed) {
      setThenumber(thenumber - 1);
    }
  }, [props.removed]);

  useEffect(() => {
    if (itemAmounts) {
      const storedData = localStorage.getItem("store");
      const item = JSON.parse(storedData);
      setThenumber(item.reduce((total, item) => total + item.amount, 0));
    }
  }, [itemAmounts]);

  const handleConfirmLogout = () => {
    setIsLoading(true);
    localStorage.setItem("token", "0");
    localStorage.setItem("phone" , "0");
  };

  const handleNoticLogout = () => {
    props.loginState(null);
  };

  return (
    <div>
      <div className="nav-con">
        <Container fluid>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Link className="a" to={"/"}>
                home
              </Link>
            </Col>
            <Col
              xs={{ span: 1, offset: 5 }}
              sm={{ span: 1, offset: 6 }}
              md={{ span: 1, offset: 6 }}
              lg={{ span: 1, offset: 6 }}
              xl={{ span: 1, offset: 7 }}
              xxl={{ span: 1, offset: 7 }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                {" "}
                <Link to={"cart"}>
                  <FontAwesomeIcon
                    className="cartshopping"
                    icon={faCartShopping}
                  ></FontAwesomeIcon>
                </Link>
                {thenumber > 0 && (
                  <Badge
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      top: "30%",
                      left: "-10%",
                      transform: "translateX(-50%)",
                    }}
                    bg="danger"
                  >
                    {" "}
                    {thenumber}{" "}
                  </Badge>
                )}
              </div>
            </Col>
            <Col>
              {isLoading || profile == null ? (
                <Link to={"/login"}>login</Link>
              ) : (
                <>
                  {["end"].map((placement, idx) => (
                    <OffCanvas
                      handleNoticLogout={handleNoticLogout}
                      handleConfirmLogout={handleConfirmLogout}
                      key={idx}
                      placement={placement}
                      title={profile && profile.user.email}
                      name={profile && profile.user.email}
                    />
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ marginBottom: "10rem" }}></div>
    </div>
  );
};
export default NavBar;

function OffCanvas({
  handleNoticLogout,
  handleConfirmLogout,
  title,
  name,
  ...props
}) {
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDoLogout = () => {
    setShowLogout(false);
    handleConfirmLogout();
    handleNoticLogout();
  };
  const handleCloseLogout = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    setShowLogout(true);
  };

  return (
    <>
      <a
        style={{ color: "white", padding: "0.5rem" }}
        className="gmail"
        onClick={handleShow}
      >
        {" "}
        {name}
      </a>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> {title} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/profile"}
            >
              <ListGroup.Item onClick={handleClose} action variant="secondary">
                profile
              </ListGroup.Item>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/orders"}
            >
              <ListGroup.Item onClick={handleClose} action variant="success">
                orders
              </ListGroup.Item>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/setting/changeProfile"}
            >
              <ListGroup.Item onClick={handleClose} action variant="danger">
                setting
              </ListGroup.Item>
            </Link>
            <ListGroup.Item onClick={handleLogout} action variant="warning">
              log out
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showLogout} onHide={handleLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogout}>
            Close
          </Button>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <Button variant="primary" onClick={handleDoLogout}>
              log out
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
