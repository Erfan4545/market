import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://kzico.runflare.run/user/profile", {
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
    if (data) console.log(data);
  }, [data]);

  return (
    <div className="profile-container">
       <Row className='justify-content-center'>
                <Image style={{ height: "150px", width: "150px" }} src={data && data.user.image} roundedCircle />
            </Row>
            <Row style={{ marginLeft: "20%" }}>
                <div>
                    <p>email : {data && data.user.email} </p>
                    <p>username : {data && data.user.username}</p>
                    <p>mobile : {data && data.user.mobile}</p>
                    <p>Firstname : {data && data.user.firstname}</p>
                    <p>Lastname : {data && data.user.lastname}</p>
                    <p>gender : {data && data.user.gender}</p>
                    <p>age : {data && data.user.age}</p>
                    <p>city : {data && data.user.city}</p>
                </div>

            </Row>
    </div>
  );
};
export default Profile;
