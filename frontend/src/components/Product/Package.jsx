import { useState } from "react";
import { MdNewReleases } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Featureproduct.css";

const Package = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch(addItemToCart(product._id, quantity));
    toast.success("Added to Cart", {
      className: "myToast",
    });
    navigate("/cart");
  };

  return (
    <div className="packageBox">
      <div className="packageCard">
        <Link to={`/product/${product._id}`} className="packageImg">
          <span className="badgeBox newBadge">
            <MdNewReleases />&nbsp;<b>New</b>
          </span>
          <img src={`${product.images[0].url}`} alt="package" />
        </Link>
        <div className="packageTxt">
          <h2 className="packageTitle">{product.name}</h2>
          <p className="packageDescription mb-0">{product.description}</p>
          <div className="star ratings">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} review)</span>
          </div>
          <p className="packagePrice">₦‎ {product.price}</p>
          <div className="packageButton">
            <button
              className={product.stock === 0 ? "disableBtn" : "buyNow"}
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              {product.stock === 0 ? "comming soon" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
