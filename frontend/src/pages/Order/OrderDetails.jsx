import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { MetaData, Loader } from "../../components/allComponents";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

import "./ListOrder.css";
const OrderDetails = () => {
  const match = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.id));

    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, match.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "successful" ? true : false;
  const parchaseDate = String(order.paidAt).substring(0, 10);
  return (
    <>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <div className="order__details__container">
          <p
            style={{
              padding: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          ><u>
            Order Id: {order._id}</u>
          </p>
          <div className="orderDetailsHeaderBox">
            <div className="shipping__info_order__details">
              <h4 className="mb-4">Shipping Info</h4>
            <div>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ₦‎{totalPrice}
              </p>
              <p>
                <b>Purchase Date:</b> {parchaseDate}
              </p>
              </div>
            </div>
            <div className="dividerSpan"></div>
            <div className="order__details_status">
              <div className="order__details_payment">
                <h4 className="my-2">Payment</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
              </div>
              <div className="order__details_status_sec">
                <h4 className="my-2">Order Status</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
              </div>
            </div>
          </div>
          

          <h4 className="orderItemsH4Title">Order Items</h4>    
          <div className="cart__item_order__details">
            {orderItems &&
              orderItems.map((item) => (
                <Link to={`/product/${item.product}`} key={item.product} className="orderDetailOrdersBox">
                    <div className="orderDetailOrdersImg">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="orderDetailOrdersTxt">
                      <p className="orderDetailOrdersTitle"><b>{item.name}</b></p>
                      <p className="orderDetailOrdersQty">{item.quantity} Piece(s)</p>
                      <p className="orderDetailOrdersPrice">₦‎{item.price}</p>
                    </div>
                </Link>
              ))}
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default OrderDetails;
