import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../store";
import { productRetreaved } from "../actionCreaters";
import { Link } from "react-router-dom";
import "./checkout.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';


const CheckOut = (props) => {
  const [data, setData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [city] = useState(localStorage.getItem("selectedCity") || "");
  const [address] = useState(localStorage.getItem("address") || "");
  const [postalCode] = useState(localStorage.getItem("postalCode") || "");
  const [phoneNumber] = useState(localStorage.getItem("phoneNumber") || "");
  const [totalPrice] = useState(localStorage.getItem("totalPrice"));
  const [itemList, setItemList] = useState(null);
  const [ifSubmited, setIfSubmited] = useState(null);
  const [vipeCart, setVipeCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit card');
  const store = useSelector((state) => state.reducer)
  const dispatch = useDispatch()


  useEffect(() => {
    axios
      .get("http://kzico.runflare.run/product/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });


    const storedData = localStorage.getItem('store');

    dispatch(productRetreaved(JSON.parse(storedData)));
  }, []);

  useEffect(() => {
    if (data) {
      let info = [];
      for (let i = 0; i < store.length; i++) {
        info = [...info, data.find(obj => obj._id == store[i]?.productId)]
      }
      setCartItems(info)


      setItemList(store.map(obj => {
        return {
          product: obj.productId,
          qty: obj.amount
        }
      }));

    }
  }, [data]);

  useEffect(() => {
    if (vipeCart) {
      let info = [];
      for (let i = 0; i < store.length; i++) {
        info = [...info, data.find(obj => obj._id == store[i]?.productId)]
      }
      setCartItems(info)
    }
  }, [vipeCart]);

  const handleCheckout = () => {
    try {
      setIfSubmited(
        axios.post(
          "http://kzico.runflare.run/order/submit",
          {
            orderItems: itemList,
            shippingAddress: {
              address: address,
              city: city,
              postalCode: postalCode,
              phone: phoneNumber,
            },
            paymentMethod: paymentMethod,
            shippingPrice: 5,
            totalPrice: totalPrice,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (ifSubmited) {

      dispatch(productRetreaved([]));
      setVipeCart(true);
      props.setTheAmountZero(true);
      console.log(ifSubmited)
    }
  }, [ifSubmited]);

  useEffect(() => {
    if (vipeCart) {
      localStorage.setItem('store', JSON.stringify(store))

    }
  }, [vipeCart]);

  const togglePaymentMethod = (e) => {
    if (e.target.value == 1)
      setPaymentMethod("Credit card");
    else
      setPaymentMethod("cash");

  };

  return (
    <div>
      {cartItems &&
        cartItems.map((x) => {
          return (
            <div className="cart-product-container">
              <div className="checkout-card" to={"/product?id=" + x._id}>
                <img className="cart-image" src={x.image} />
                <div className="cart-info">
                  <p>price: {x.price}$</p>
                  <p>Color: {x.color}</p>
                  <p>5</p>
                </div>
              </div>
            </div>
          );
        })}

      {cartItems.length > 0 && (
        <div className="address-information">
          <p>
            <FontAwesomeIcon
              className="location-icon"
              icon={faLocationDot}
            ></FontAwesomeIcon>
            address: {address}
          </p>
        </div>
      )}
      <div className="payment">

        <Form.Select onChange={togglePaymentMethod} aria-label="Default select example">
          <option value="1">Credit card</option>
          <option value="2">Cash</option>
        </Form.Select>

      </div>

      <div className="checkout-buttons">
        <Link to={"/cart"}>
          <button className="btn btn-primary">edit</button>
        </Link>
        {store.length > 0 && itemList && (
          <div>
            <button onClick={handleCheckout} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CheckOut;
