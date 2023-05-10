import { Link, useNavigate } from "react-router-dom";

import MetaData from "../../MetaData";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";

import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  // Define your Google Maps API key
  const { GOOGLE_API_KEY } = require('../../../../config/config.json')

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // const shippingPrice = itemsPrice > 5000 ? 0 : 0;
  const shippingPrice = parseInt(shippingInfo.ShippingCost)
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalCartPrice = itemsPrice + taxPrice + shippingPrice
  const totalPrice = Math.round(totalCartPrice)

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
                {`${shippingInfo.address}`}
              </p>
            </div>

            <h4 className="text-white font-weight-bold">Order Summary</h4>


            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">₦‎{itemsPrice}</span>
            </p>
            <p>
            Shipping Fee:{" "}
              <span className="order-summary-values">₦‎{shippingPrice} &nbsp;<b style={{color: 'green', fontSize:'12px'}}>+ Quality assurance</b></span>
            </p>
            <p>
              Tax: <span className="order-summary-values">₦‎{taxPrice}</span>
            </p>

            <hr />

            <h4 className="text-white">
              Total: <span className="order-summary-values" style={{color:'gold'}}>₦‎{totalPrice}</span>
            </h4>

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
