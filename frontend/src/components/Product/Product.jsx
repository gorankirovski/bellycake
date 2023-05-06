import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import "./Featureproduct.css";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const isCarted = cartItems.find((item) => item.product === product._id);
  const cartPlusClass = product.stock === 0 ? "disableBtn" : "cartPlus" + (isCarted ? " cartedItem" : "");

  const addToCart = () => {
    if (isCarted) {
      dispatch(removeItemFromCart(product._id));
      return toast.error("Removed from cart")
    }
    dispatch(addItemToCart(product._id, quantity));
    toast.success("Added to Cart", {
      className: "myToast",
    });
    // navigate("/cart");
  };
  return (
    <>
    <div id="productBox">
    <button
      className={cartPlusClass}
      disabled={product.stock === 0}
      onClick={addToCart}
    >
      {product.stock === 0 ? "comming soon" : <FaCartPlus className="cartPlusIcon" />}
    </button>
    
      <Link to={`/product/${product._id}`} className="pro" >
        <img src={product.images[0].url} alt="" />
        <div className="des">
          {/* <span>{product.seller}</span> */}
          <h5 className="productTitle">{product.name}</h5>
          <div className="star ratings">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} review)</span>
          </div>
          <h4>₦‎{product.price}</h4>
        </div>
      </Link>
      </div>
    </>
  );
};

export default Product;
