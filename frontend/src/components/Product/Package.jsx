import { Link } from "react-router-dom";
import "./Featureproduct.css";

const Package = ({ product }) => {
    return (
        <div className="packageBox">
            <div className="packageCard">
                <div className="packageImg">
                    <img src={`${product.images[0].url}`} alt="package" />
                </div>
                <div className="packageTxt">
                    <h3 className="packageTitle">{product.name}</h3>
                    <p className="packageDescription">{product.description}</p>
                    <p className="packagePrice">{product.price}</p>
                    <div className="packageButton">
                        <Link to={`/product/${product._id}`}>
                            Buy now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;