import React from "react";
import PageHader from "../PageHader/PageHader";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { VscDebugReverseContinue } from "react-icons/vsc";

import "./Cart.css";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addItemToCart, removeItemFromCart } from "../../../actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  };
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
}

const continueShopping = () => {
  navigate('/shop')
}

  return (
    <>
      <MetaData title={`${cartItems.length} Product in cart`} />
      <PageHader title="Cart" />

      <section id="cart" className="">
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    {cartItems.length === 0 ? (
                      <h5 className="mb-0">No items</h5>
                    ) : (
                      <h5 className="mb-0">Cart - {cartItems.length} item(s)</h5>
                    )}
                  </div>
                  <div className="card-body">
                    {/* <!-- Single item --> */}
                    {cartItems.map((item, idx) => (
                      <div  key={idx}>
                        <div className="row">
                          <div className="cartItemBoxForDetails">
                            {/* <!-- Image --> */}
                            <div className="cartItemDetailsBox1">
                            <Link to={`/product/${item.product}`} className="cartItemImgBoxLink">
                              <div className="cartItemImgBox">
                                <img src={item.image} />
                              </div>
                            </Link>
                            {/* <!-- Image --> */}
                            {/* <!-- Data --> */}
                            <Link to={`/product/${item.product}`} style={{textDecoration: 'none'}} className="itemNameCart">
                              <p className="text-black">
                                <b>{item.name}</b>
                              </p>
                              <p className="text-black">₦‎{item.price}</p>
                            </Link>
                            </div>
                            
                            {/* <!-- Quantity --> */}
                            <div className="cartItemDetailsBox">
                            <button
                              type="button"
                              className="deleteCart cartControlPlugs"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              style={{ background: "#f13333" }}
                              onClick={() =>
                                removeCartItemHandler(item.product)
                              }
                            >
                              <FaTimes />
                            </button>
                            {/* <!-- Data --> */}
                            <div className="cartItemsControllers">
                              <button
                                className="cartControlPlugs quan__min"
                                onClick={() =>
                                  decreaseQty(item.product, item.quantity)
                                }
                              >
                                <FaMinus />
                              </button>

                              <div className="quantityInput">
                                <input
                                  id="form1"
                                  name="quantity"
                                  value={item.quantity}
                                  readOnly
                                  type="number"
                                  className="form-control quantityInputField"
                                />
                              </div>

                              <button
                                className="cartControlPlugs quan__plus"
                                onClick={() =>
                                  increaseQty(
                                    item.product,
                                    item.quantity,
                                    item.stock
                                  )
                                }
                              >
                                <FaPlus />
                              </button>
                            </div>
                            </div>
                            {/* <!-- Quantity --> */}

                          </div>


                        </div>
                        <hr className="my-4" />
                      </div>
                    ))}
                    {/* <!-- Single item --> */}
                  </div>
                </div>
              </div>
              <div className={`col-md-4 `}>
              <div className="card mb-0 orderSummaryCart">
                <div className="card-header py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>

                <div className="card-body">
                  <div className="orderDetails">
                    <div className="orderUnits d-flex flex-row justify-content-between">
                      <p className="orderUnitsText text-black"> {cartItems.length}  Unit(s)</p>
                      <p className="orderUnitsAmount text-black">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} items</p>
                    </div>

                    <div className="orderTotalPrice d-flex flex-row justify-content-between">
                        <p className="orderPriceText text-black">Total amount</p>
                        <p className="orderPriceAmount text-black">₦‎{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`checkOutBtn`}
                    style={{background: '#181822', color: '#fff'}}
                    onClick={continueShopping}
                  >
                    <VscDebugReverseContinue />&nbsp;Continue Shopping
                  </button>
                  {cartItems.length === 0 ? '' : <button
                    type="button"
                    className={`checkOutBtn`}
                    style={{background: '#327a3e', color: '#fff'}}
                    onClick={checkoutHandler}
                  >
                    Checkout&nbsp;<MdOutlineShoppingCartCheckout />
                  </button>}
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Cart;
