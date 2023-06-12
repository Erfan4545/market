import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ordersinfo.css";

const OrdersInfo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("id");
    axios
      .get("http://kzico.runflare.run/order/" + name, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      {data &&
        data.orderItems.map((x) => {
          return (
            <div className="orders-info">
              <img className="orders-img" src={x.product.image} />
              <div className="product-in">
                <p>Name: {x.product.name}</p>
                <p>Color: {x.product.color}</p>
                <p>Number of Items: {x.qty}</p>
              </div>
            </div>
          );
        })}
      {data && (
        <div className="shipping-address">
          Your Delivery Address
          <p style={{ marginTop: "2rem" }}>City: {data.shippingAddress.city}</p>
          <p style={{ maxWidth: "180px" }}>
            Address: {data.shippingAddress.address}
          </p>
          <p> Total price: {data.totalPrice}</p>
        </div>
      )}
    </div>
  );
};
export default OrdersInfo;
