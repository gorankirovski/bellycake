import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { MdOutlineHotelClass } from "react-icons/md";
import "./Shop.css";
import Pagination from "react-js-pagination";
import { Loader, MetaData, Product } from "../../components/allComponents";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "All",
    "Mini Treats",
    "Desserts",
    "Cakes",
    "Special Bakes",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const params = useParams();
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      toast.error(error, {
        className: "myToast",
      });
    }
    dispatch(
      getProducts(keyword, currentPage, price, category, rating)
    );
  }, [ dispatch, error, toast, keyword, currentPage, price, category, rating ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategory = (value) => {
    if (value === "All") {
      return setCategory("")
    }
    if (value === "Special Bakes") {
      return navigate("/special")
    }
    setCategory(value);
  };

  let count = productsCount;
  if (keyword) {
    let proLen = products.length;
    if (proLen <= 8) {
      count = 0;
    }
  }
  return (
    <>
      <MetaData title={"save money buy more"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="shopSection">
          <div className="shop">
          <ul className="productCategories">
            {categories.map((category) => (
              <li
                style={{
                  cursor: "pointer",
                  listStyleType: "none",
                }}
                key={category}
                onClick={() => handleCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
            <div className="shop__products">
              <div
                to="/products"
                className="view__product"
                style={{ marginTop: "20px" }}
              > <span className="badgeBox popuBadge"><MdOutlineHotelClass />&nbsp;Hot Deals</span>
                <div className="pro__container">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </div>

              {resPerPage <= count && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
