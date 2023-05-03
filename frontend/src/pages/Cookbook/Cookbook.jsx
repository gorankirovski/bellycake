import './Cookbook.css';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipes } from "../../actions/recipeActions";
import Pagination from "react-js-pagination";
import { Loader, MetaData } from "../../components/allComponents";

const Cookbook = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [price, setPrice] = useState([1, 1000]);

    const categories = [
        "All",
        "Certification",
        "Mini Treats",
        "Desserts",
        "Cakes",
        "Special Bakes",
      ];

      const dispatch = useDispatch();
      const { loading, recipes, error, recipesCount, resPerPage } = useSelector(
        (state) => state.recipes
      );
      const params = useParams();
      const keyword = params.keyword;
      useEffect(() => {
        if (error) {
          toast.error(error);
        }
        dispatch(
          getRecipes(keyword, currentPage, price, category, rating)
        );
      }, [ dispatch, error, toast, keyword, currentPage, price, category, rating ]);

      function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
      }

      const handleCategory = (value) => {
        if (value === "All") {
          return setCategory("")
        }
        setCategory(value);
      };

      let count = recipesCount;
      if (keyword) {
        let recLen = recipes.length;
        if (recLen <= 8) {
          count = 0;
        }
      }

    return (
        <>
        <MetaData title={"save money buy more"} />
        {loading ? (
          <Loader />
        ) : (
          <div className="cookbookSection">
            <div className="cookbook">
              <div className="cookbookCategoryBox">
            <ul className="cookbookCategories">
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
          </div>
              <div className="cookbook__recipes">
                <div className="cookbook__single recipe" id="cookbook__recipe_1">
                  <div className="recipe_container">
                    {recipes &&
                        recipes.map((recipe) => (
                        <div className="cookbook__pro" key={recipe._id}>
                          <Link
                            to={`/product/${recipe._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <img src={recipe.images[0].url} alt="" />
                            <div className="shop__des">
                              <span>{recipe.author}</span>
                              <h5>{recipe.title}</h5>
                              <div className="star ratings">
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${(recipe.ratings / 5) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span id="no_of_reviews">
                                  ({recipe.numOfReviews} review)
                                </span>
                              </div>
                              <h4>${recipe.price}</h4>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>

                {resPerPage <= count && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={recipesCount}
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
    )
}

export default Cookbook;