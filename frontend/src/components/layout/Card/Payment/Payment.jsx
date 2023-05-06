import { useEffect } from "react";

import { MetaData } from "../../../allComponents";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../../../actions/orderActions";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  
  // Flutterwave payment
      const config = {
        public_key: 'FLWPUBK_TEST-c17e20f66d56b1346372bc197ac505e8-X',
        tx_ref: Date.now(),
        amount: order.totalPrice,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd,applepay',
        customer: {
          email: user.email,
          phone_number: shippingInfo.phoneNo,
          name: user.name,
        },
        customizations: {
          title: 'My store',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      
      const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
           console.log('Payment response:', response);
      if (response.error) {
        toast.error(response.error.message, {
          className: "myToast",
        });
      } else {
        // The payment is processed or not
        if (response.status === 'successful') {

          order.paymentInfo = {
            id: response.transaction_id,
            status: response.status,
          };

          dispatch(createOrder(order))
          localStorage.removeItem('cartItems')
          navigate("/success");
        } else {
          toast.error("There is some issue while payment processing", {
            className: "myToast",
          });
        }
      }
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };

  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="LOGIN_BOX" id="pay_btn">
        <FlutterWaveButton {...fwConfig} />
      </div>
    </>
  );
};

export default Payment;
