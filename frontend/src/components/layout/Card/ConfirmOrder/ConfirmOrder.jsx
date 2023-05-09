import { Link, useNavigate } from "react-router-dom";

import MetaData from "../../MetaData";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";

import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 5000 ? 0 : 0;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  const calcShipping = () => {
    // Define your store and shipping addresses
    const storeAddress = "1600 Amphitheatre Parkway, Mountain View, CA";
    const shippingAddress = "123 Main St, San Francisco, CA";

    // Define your Google Maps API key
    const apiKey = "your_api_key_here";

    // Define your exchange rate between kilometers and Naira
    const exchangeRate = 120; // 120 Naira per kilometer

    // Send a request to the Google Maps API to calculate the distance between the two addresses
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(storeAddress)}&destinations=${encodeURIComponent(shippingAddress)}&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract the distance from the API response
        const distance = data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers

        // Apply a 5% shipping rate to the distance
        const shippingFee = distance * 0.05;

        // Convert the shipping fee from kilometers to Naira using the exchange rate
        const shippingFeeInNaira = shippingFee * exchangeRate;

        // Print the calculated shipping fee
        console.log(`Shipping fee: ${shippingFeeInNaira} Naira`);
      })
      .catch(error => {
        // Handle errors or exceptions that arise when communicating with the API
        console.error(error);
      });
  }

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between px-4">
        <div className="order-confirm itemPerBasket px-4 mx-4">
          <h4 className="mt-4 text-white font-weight-bold">Your Cart Items</h4>
          {cartItems.map((item, index) => (
            <div key={index}>
            <hr className="dividerWide" />
              <div className="cart-item m-1 row itemPerBasketChild justify-content-between" >
                <div className="imageName">
                  <div className="">
                    <img className="rounded-sm" src={item.image} alt="Laptop" height="60" width="60" />
                  </div>

                  <Link className="imageNameText" to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                  <div>
                    <p className="cartxPriceText">
                      {item.quantity} x ${item.price} ={" "}
                      <b>₦‎{(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="userSummary mx-4">
          <div className="summaryBox">
            <div className="userSideSummary">
              <h4 className="mb-3 text-white font-weight-bold">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p>
                <b>Address:</b>{" "}
                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
              </p>
            </div>

            <h4 className="text-white font-weight-bold">Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">₦‎{itemsPrice}</span>
            </p>
            <p>
              Quality assurance:{" "}
              <span className="order-summary-values">₦‎{shippingPrice} <b style={{color: 'green'}}>Free</b></span>
            </p>
            <p>
              Tax: <span className="order-summary-values">₦‎{taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">₦‎{totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="proceedBtn "
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
