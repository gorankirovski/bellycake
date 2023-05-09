import { useEffect } from "react";
import { MetaData } from "../../../allComponents";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../../../actions/orderActions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { MdPayments } from "react-icons/md";

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
  }, [error, dispatch]);

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

  const transactionRef = `${Date.now()}${user._id}`
  const paymentOptions = ["card", "mobilemoneyghana", "ussd"];
  const logoUrl = 'https://cdn.discordapp.com/attachments/1104838764347527300/1104841133047160963/LOGO.png';

  const config = {
    public_key: 'FLWPUBK_TEST-c17e20f66d56b1346372bc197ac505e8-X',
    tx_ref: transactionRef,
    amount: order.totalPrice,
    currency: 'NGN',
    payment_options: paymentOptions.join(","),
    customer: {
      email: user.email,
      phone_number: shippingInfo.phoneNo,
      name: user.name,
    },
    customizations: {
      title: 'Belly Cake Shop',
      description: 'Payment for items in cart',
      logo: logoUrl,
    },
  };

  const handlePayment = (response) => {
    console.log('Payment response:', response);
    if (response.error) {
      toast.error(response.error.message, {
        className: "myToast",
      });
    } else {
      if (response.status === 'successful') {
        order.paymentInfo = {
          id: response.transaction_id,
          status: response.status,
        };
        dispatch(createOrder(order));
        navigate("/success");
      } else {
        toast.error("There was some issue while payment was processing", {
          className: "myToast",
        });
      }
    }
    closePaymentModal();
  }

  const fwConfig = {
    ...config,
    text: 'Pay now',
    callback: handlePayment,
    onClose: () => {},
  };

  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="LOGIN_BOX" id="pay_btn">
        <div className="flutterBtnBox">
          <h5 style={{color: 'white'}}>Shipping Instruction</h5>
          <p>You shall pay the rider on delivery. Check the fee from our store to your address in the Bolt app.</p>
          <p></p>
          <FlutterWaveButton {...fwConfig} className="flutterBtn" />
          <MdPayments />
          <p className="securelyPay">Securely pay with flutterwave</p>
        </div>
      </div>
    </>
  );
};

export default Payment;
