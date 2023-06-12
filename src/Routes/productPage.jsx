import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../store";
import {
  productAdded,
  productIncremented,
  productReducted,
  productRemoved,
  productRetreaved,
} from "../actionCreaters";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./productPage.css";
import { useSelector, useDispatch } from 'react-redux';


const ProductPage = (props) => {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [variable, setVariable] = useState(false);
  const [removed, setRemoved] = useState(null);
  const [error, setError] = useState("");
  const [consoleLogStore, setConsoleLogStore] = useState(null);

  const store = useSelector((state) => state.reducer)
  const dispatch = useDispatch()



  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("id");
    setName(name);
    axios
      .get("http://kzico.runflare.run/product/" + name)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Error fetching data:", error);
      });

    if (undefined == store.find((obj) => obj.productId === name)) {
      setAmount(0);
    } else {
      setAmount(store.find((obj) => obj.productId === name).amount);
    }
  }, []);



  useEffect(() => {
    if(data)
    console.log(data)
  }, [data]);



  const handleAdd = () => {

    setConsoleLogStore(consoleLogStore + 1)
    dispatch(productAdded(name));
  };

  const handleIncrement = () => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productIncremented(name));

  };

  const handleReduction = () => {
    setConsoleLogStore(consoleLogStore + 1);
    dispatch(productReducted(name));
  };

  const handleRemove = () => {

    dispatch(productRemoved(name));

    setAmount(0)
    setRemoved(removed + 1)
  };




  useEffect(() => {
    if (consoleLogStore) {
      localStorage.setItem('store', JSON.stringify(store));
      console.log('Store changed!', store);

      if (undefined == store.find(obj => obj.productId === name).amount) {
        setAmount(0)
      }
      else {
        setAmount(store.find(obj => obj.productId === name).amount)
      }
    }
  }, [consoleLogStore]);





  useEffect(() => {
    if (removed) {
      localStorage.setItem('store', JSON.stringify(store));
      console.log('Store changed!', store);
    }


    props.setTheRemove(removed);
  }, [removed]);

  useEffect(() => {
    props.setTheAmount(amount);
  }, [amount]);

  useEffect(() => {
    setVariable(true);
  }, []);

  useEffect(() => {
    if (variable) {
      const storedData = localStorage.getItem('store');
      {
        storedData &&
          JSON.parse(storedData).find(obj => obj.productId === name) && setAmount(JSON.parse(storedData).find(obj => obj.productId === name).amount)
      }


      { storedData && dispatch(productRetreaved(JSON.parse(storedData))); }



    }
  }, [variable]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        data && (
          <div className="product-container">
            <img className="product-img" src={data.image}></img>
            <div className="product-info">
              <p className="data-name">Name: {data.name} </p>
              <h2 className="data-count">
                {data.countInStock == 0 ? "Out Of Stock" : data.countInStock}
              </h2>
              <p>price: {data.price}$</p>
              <p>
                {" "}
                <FontAwesomeIcon
                  style={{ color: "#f9bc00" }}
                  icon={faStar}
                ></FontAwesomeIcon>
                {data.rating}
              </p>
              <p>Brand: {data.brand}</p>
              <p>Color: {data.color}</p>
              <p>{data.description}</p>
            </div>
            {amount > 0 ? (
              <div className="add-button">
                <button className="neg-pos-container">
                  {amount == 1 ? (
                    <Badge
                      style={{ margin: "10px" }}
                      onClick={handleRemove}
                      bg="danger"
                    >
                      <FontAwesomeIcon className="trash-badge" icon={faTrash} />
                    </Badge>
                  ) : (
                    <span
                      style={{ backgroundColor: "#dc3545" }}
                      className="neg-pos-badge"
                      onClick={handleReduction}
                      bg="danger"
                    >
                      -
                    </span>
                  )}
                  {amount}

                  {data && data.countInStock > amount ?
                    <span
                      className="neg-pos-badge"
                      style={{ backgroundColor: "royalblue" }}
                      onClick={handleIncrement}
                      bg="primary"
                    >
                      +
                    </span>
                    :
                    <span
                      className="neg-pos-badge"
                      style={{ color: "black" }}
                      bg=" "
                    >
                      out
                    </span>
                  }
                </button>
              </div>
            ) : (
              <button
                style={{ width: "150px", height: "70px", borderRadius: "40px" }}
                onClick={handleAdd}
                className="add-button btn btn-primary"
              >
                Add to Cart
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
};
export default ProductPage;
