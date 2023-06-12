import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./products.css";
const Products = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [paginate, setPaginate] = useState([]);
  const [page, setPage] = useState(1);
  const top = useRef();

  const request = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/product/");

      const pagesArray = [];
      for (let i = 1; i < data.length / 5; i++) {
        pagesArray.push(i);
      }
      setPaginate(pagesArray);
      setProduct(data);
    } catch (error) {
      setError("Error fetching data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    request();
  }, []);


  useEffect(() => {
    if(product)
    console.log(product)
  }, [product]);


  useEffect(() => {
    window.scrollTo({
      top: page > 1 ? top?.current?.offsetTop - 50 : 0,
      behavior: "smooth",
    });
  }, [page]);
  return (
    <div>
      <Container fluid>
        <p ref={top} className="welcome">
          welcome to KZI shoping company
        </p>
        <Row>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            product &&
            product.slice((page - 1) * 5, page * 5).map((item) => {
              return (
                <Col
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  xs={6}
                  sm={4}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  key={item._id}
                >
                  <Link
                    className="products"
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/product?id=" + item._id}
                  >
                    <Card className="product-card">
                      <Card.Img
                        className="product-image"
                        variant="top"
                        style={{ height: "200px", objectFit: "contain" }}
                        src={item.image}
                      />
                      <Card.Body>
                        <p className="body-name">{item.name}</p>
                        <h2 className="body-stock">
                          {item.countInStock > 0
                            ? item.countInStock
                            : "out of stock"}
                        </h2>
                        <div className="p-r row">
                          <div className="col">price: {item.price}$ </div>
                          <div style={{ textAlign: "end" }} className="col">
                            <FontAwesomeIcon
                              style={{ color: "#f9bc00" }}
                              icon={faStar}
                            ></FontAwesomeIcon>
                            {item.rating}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Pagination size="md">
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev
            onClick={() => {
              if (page > 1) {
                setPage((L) => L - 1);
              }
            }}
          />
          {paginate.map((item) => (
            <Pagination.Item
              key={item}
              active={page === item}
              onClick={() => setPage(item)}
            >
              {item}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => {
              if (page < paginate.length) {
                setPage((L) => L + 1);
              }
            }}
          />
          <Pagination.Last onClick={() => setPage(paginate.length)} />
        </Pagination>
      </div>
    </div>
  );
};
export default Products;
