import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./orders.css";

const Orders = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://kzico.runflare.run/order/", {
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
      <Table className="orders-teble" striped>
        <thead className="table-head">
          <tr>
            <th>#</th>
            <th>paymentMethod</th>
            <th>number of items</th>
            <th>city</th>
            <th>postalcode</th>
            <th>total price</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((x, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{x.paymentMethod}</td>
                <td>
                  {x.orderItems.reduce((total, item) => total + item.qty, 0)}
                </td>
                <td>{x.shippingAddress.city}</td>
                <td>{x.shippingAddress.postalCode}</td>
                <td>{x.totalPrice}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/OrdersInfo?id=" + x._id}
                  >
                    <button className="more-info-button">more info...</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Orders;
