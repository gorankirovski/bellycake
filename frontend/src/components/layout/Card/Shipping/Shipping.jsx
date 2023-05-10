import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MetaData from "../../MetaData";
import CheckoutSteps from '../Checkoutsteps/CheckoutSteps'
import '../../User/Login/Login.css';

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../../actions/cartActions";
import axios from "axios";
import { getPreciseDistance } from 'geolib';
import { MapSelector } from "./map";
const { GEOAPIFY_KEY } = require('../../../../config/config.json')


const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [autocompleteResults, setAutocompleteResults] = useState([])
  const [coordinates, setCoordinates] = useState([])
  const [showMap, setShowMap] = useState(false)

  // FREE MAP API
  // const handleAutocomplete = async (query) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf62482cce1049959742a4b9b391af24fb6a62&text=${query}&boundary.country=NG`,
  //       {headers: {
  //         'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
  //       }}
  //     );
  //     setAutocompleteResults(response.data.features);
  //   } catch (error) {
  //     console.log('Please enter an address!');
  //   }
  // };

  const handleAutocomplete = async (query) => {
    // Free Trial Map from GEOAPIFY
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_KEY}`,
        {headers: {}}
      );
      setAutocompleteResults(response.data.features);
    } catch (error) {
      console.log(error);
    }
  };

  // GOOGLE PLACES API {BILLING REQUIRED}

  // const handleAutocomplete = async (query) => {
  //   try {
  //     const autocompleteService = new window.google.maps.places.AutocompleteService();
  //     autocompleteService.getPlacePredictions(
  //       { input: query, types: ["address"], componentRestrictions: { country: "ng" } },
  //       (predictions, status) => {
  //         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //           const results = predictions.map((prediction) => ({
  //             address: prediction.description,
  //             placeId: prediction.place_id,
  //           }));
  //           setAutocompleteResults(results);
  //           console.log('Results:', results)
  //         } else {
  //           setAutocompleteResults([]);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Error loading auto complete results:", error);
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!coordinates.length) return(console.log('Please select a validated address.'))
      // Shipping coordinates from the state
      const lat = coordinates[0]
      const long = coordinates[1]
      const shippingCoordinates = { latitude: lat, longitude: long };

      // const storeAddress = `48V6+87G, Kubwa 901101, Kubwa, Federal Capital Territory`
      const storeLat = 9.143289
      const storeLong = 7.310718
      const storeCoordinates = { latitude: storeLat, longitude: storeLong };
      try {
        // Get coordinates distance
        // const calculatedDistance = getPreciseDistance(shippingCoordinates, storeCoordinates, 1) / 1000
        const allCoordinates = JSON.stringify({
          "mode": "drive",
          "sources": [
            { "location": [storeLong, storeLat] }
          ],
          "targets": [
            { "location": [long, lat] }
          ],
          "units":"imperial"
        });
        const calculatedDistance = await axios.post(
          `https://api.geoapify.com/v1/routematrix?apiKey=${GEOAPIFY_KEY}`,
          allCoordinates,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
      // Convert Miles to Km (imperial units uses miles) so 1 mile = 1.609344km
      const shippingDistanceMiles = calculatedDistance.data.sources_to_targets[0][0].distance
      const shippingDistanceKm = shippingDistanceMiles * 1.609344
      // Shipping rates
      const exchangeRate = 130;
      // const shippingRate = 0.09;
      const shippingFee = shippingDistanceKm * exchangeRate;
      const ShippingCost = shippingFee.toFixed(2)

      dispatch(saveShippingInfo({ address, phoneNo, ShippingCost }));
      navigate("/order/confirm");
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    setShowMap(true);
  };

  return (
    <div className="shippingPage">
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping /> 
      <div className="LOGIN_BOX Shippingbox">
        <form className="login " onSubmit={submitHandler}>
          <h2 className="">Shipping Info</h2>
          <p>Provide a valid Phone number & address.</p>
          <input
            type="phone"
            id="phone_field"
            placeholder="Phone No"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          <input
            type="text"
            id="address_field"
            placeholder="Address"
            value={address}
            autoComplete="off"
            onChange={(e) => {
              setAddress(e.target.value);
              setCoordinates([])
              setAutocompleteResults([])
              handleAutocomplete(e.target.value);
            }}
            required
          />
          <div className="autocomplete">
              {autocompleteResults.map((result) => {
                let searchAddress = result.properties.address_line1 + ", " + result.properties.country;
                if (result.properties.city) {
                  searchAddress += ", " + result.properties.city;
                }
                if (result.properties.state) {
                  searchAddress += ", " + result.properties.state;
                }
                return (
              <div
                key={result.properties.place_id}
                className="autocomplete-item"
                onClick={() => {
                  setAddress(searchAddress);
                  setCoordinates([result.properties.lat, result.properties.lon])
                  setAutocompleteResults([])
                }}
              >
                {searchAddress}
              </div>
              );
            })}
          </div>

          <div className="showMapBtnBox">
            {showMap ? (
              <MapSelector className="mapSelector" setAddress={setAddress} setCoordinates={setCoordinates} />
            ) : (
              <button className="showMapBtn" onClick={handleButtonClick}>Can't find my address!</button>
            )}
          </div>

          {/* <div className="autocomplete">
            {autocompleteResults.map((result) => (
              <div
                key={result.properties.id}
                className="autocomplete-item"
                onClick={() => {
                  setAddress(result.properties.label);
                  setCoordinates(result.geometry.coordinates)
                  setAutocompleteResults([])
                }}
              >
                {result.properties.label}
              </div>
            ))}
          </div> */}

          <input type="submit" value="CONTINUE" disabled={!coordinates.length} />
        </form>
      </div>
    </div>
  );
};

export default Shipping;
