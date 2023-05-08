import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";

import MetaData from "../../MetaData";
import CheckoutSteps from '../Checkoutsteps/CheckoutSteps'
import '../../User/Login/Login.css';

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../../actions/cartActions";

const Shipping = () => {
  const countriesList = Object.values(countries)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
  const [country, setCountry] = useState(shippingInfo?.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/order/confirm");
  };
  return (
    <div className="shippingPage">
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping /> 
      <div className="LOGIN_BOX Shippingbox">
        <form className="login " onSubmit={submitHandler}>
          <h2 className="">Shipping Info</h2>
          <p>Please Enter valid address</p>
          <input
            type="text"
            id="address_field"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            id="city_field"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="phone"
            id="phone_field"
            placeholder="Phone No"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          <input
            type="number"
            id="postal_code_field"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <select
            id="country_field"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <input type="submit" value="CONTINUE" />
        </form>
      </div>
    </div>
  );
};

export default Shipping;
