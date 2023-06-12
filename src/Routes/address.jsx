import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./address.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Address = () => {
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("selectedCity") || ""
  );
  const [postalCode, setPostalCode] = useState(
    localStorage.getItem("postalCode") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || ""
  );
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [showRejex, setShowRejex] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allowed , setAllowed] = useState(null);


const handleAllowNext = () => {
  function check(postalCode , phoneNumber , address) {
   


    if (postalCode.length != 10) {
      setErrorMessage('postal code should be 10 numbers');
      return false;
    }


    if (address.length < 10) {
      setErrorMessage('address should be more than 10  charecters ');
      return false;
    }

    if (phoneNumber.length != 11) {
      setErrorMessage('Phone number should be 11 numbers');
      return false;
    }
    if (/^\d+$/.test(phoneNumber) == false) {
      setErrorMessage('Phone number should be numbers');
      return false;
    }

    if (phoneNumber != localStorage.getItem("phone")) {
      setErrorMessage('phone number must be the one you singnedup with');
      return false;
    }



    return true;
  }


  if (check(postalCode , phoneNumber , address)) {
    setAllowed(true)
    console.log(allowed)
  }else {
    setShowRejex(true)
  }

}


const handleHide = () => {
  setShowRejex(false);
}




  const iranCities = {
    Tehran: "تهران",
    Mashhad: "مشهد",
    Isfahan: "اصفهان",
    Karaj: "کرج",
    Tabriz: "تبریز",
    Shiraz: "شیراز",
    Ahvaz: "اهواز",
    Qom: "قم",
    Kermanshah: "کرمانشاه",
    Urmia: "ارومیه",
    Rasht: "رشت",
    Zahedan: "زاهدان",
    Hamadan: "همدان",
    Kerman: "کرمان",
    Yazd: "یزد",
    Ardabil: "اردبیل",
    Bandar_Abbas: "بندرعباس",
    Zanjan: "زنجان",
    Sanandaj: "سنندج",
    Gorgan: "گرگان",
    Khorramabad: "خرم‌آباد",
    Arak: "اراک",
    Qazvin: "قزوین",
    Yazd: "یزد",
    Abadan: "آبادان",
    Kashan: "کاشان",
    Sabzevar: "سبزوار",
    Khomeyni_Shahr: "خمینی‌شهر",
    Borujerd: "بروجرد",
    Neyshabur: "نیشابور",
    Babol: "بابل",
    Sari: "ساری",
    Amol: "آمل",
    Babol: "بابل",
    Bojnurd: "بجنورد",
    Varamin: "ورامین",
  };

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  useEffect(() => {
    localStorage.setItem("postalCode", postalCode);
  }, [postalCode]);

  const handlePostalCode = (e) => {
    const code = e.target.value;
    setPostalCode(code);
  };

  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [phoneNumber]);

  const handlePhoneNumber = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
  };

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  const handleAddress = (e) => {
    const theAddress = e.target.value;
    setAddress(theAddress);
  };

  return (
<>


    <div className="form-cont">
      <div style={{ width: "20rem" }} className="form">
        <select
          className="city-selection"
          value={selectedCity}
          onChange={handleCityChange}
          aria-label="Default select example"
        >
          <option> choose a city </option>
          {Object.keys(iranCities).map((x) => {
            return <option key={x}> {x}</option>;
          })}
        </select>
        
        <input
          className="text-area"
          value={address}
          onChange={handleAddress}
          placeholder="example: cityname/street/Plaque"
          as="textarea"
          aria-label="With textarea"
        />
       
        <input
          className="inputs"
          value={postalCode}
          onChange={handlePostalCode}
          placeholder="postalcode"
          type="text"
        />
        <input
          className="inputs"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          placeholder="phone number"
          type="text"
        />
      </div>
      <Link
        style={{ textDecoration: "none", position: "relative", top: "40%" }}
        to={allowed && "/checkout"}
      >
        <button onClick={handleAllowNext} style={{ marginTop: "2rem" }} className="cssbuttons-io-button">
          NEXT
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </Link>
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

    </>
  );
};
export default Address;
