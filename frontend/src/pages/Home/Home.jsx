import {
  Banner,
  Cta,
  Loader,
  MetaData,
  Product,
} from "../../components/allComponents";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { FaTags } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./Featureproduct.css";
import "./Home.css";
import { useParams } from "react-router-dom";
import Smallbanner from "../../components/layout/Smallbanner";
import Specialbakes from "./Specialbakes";

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "MenClothes",
    "WomenClothes",
    "shoe",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
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
    dispatch(getProducts(keyword, currentPage, price, category, rating));
    // eslint-disable-next-line 
  }, [dispatch, error, toast, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = 4;
  if (keyword) {
    let proLen = products.length
    if (proLen <= 8) {
      count = 0;
    }
  }
  return (
    <div className="home">
      <MetaData title={`Buy best products online`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPage === 1 && !keyword && <Banner />}

          {keyword ? (
            <div className="search__component">
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5 ">
                  <div className="mt-5 catergory_box ">
                    <h4 className="mb-3">Categories</h4>

                    <ul className="pl-0">
                      {categories.map((category) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                          }}
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>

                    <div className="">
                      <h4 className="mb-3">Ratings</h4>

                      <ul className="pl-0">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                            }}
                            key={star}
                            onClick={() => setRating(star)}
                          >
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${star * 20}%`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="product1" className="section__p1 view__product_search">
                <h2
                  className="title_for_trending_and_search"
                  style={{ color: "grey" }}
                >
                  {keyword ? `${keyword.toLocaleUpperCase()}` : "Best sellers"}
                </h2>
                <div
                  to="/products"
                  className="view__product view__product_1"
                  style={{ marginTop: "20px" }}
                >
                  <div className="pro__container">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
            <Cta />
            <div id="product1" className="section__p1 mt-4">
              <h2 style={{ color: "grey" }} className="mt-4">
                {keyword ? `${keyword.toLocaleUpperCase()}` : "Best sellers"}
              </h2>
              <div
                to="/products"
                className="view__product"
                style={{ marginTop: "20px" }}
              > <span className="badgeBox popuBadge"><FaTags />&nbsp;Popular</span>
                <div className="pro__container">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </div>
              <div className="moreProBox">
                <Link to="/shop" className="moreProducts">
                  More Products <IoStorefront />
                </Link>
              </div>
            </div>
          
            </>
          )}

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


          <Specialbakes />

          <Smallbanner />
        </>
      )}
    </div>
  );
};

export default Home;
