import {
    ALL_RECIPES_REQUEST,
    ALL_RECIPES_SUCCESS,
    ALL_RECIPES_FAIL,
    ADMIN_RECIPES_REQUEST,
    ADMIN_RECIPES_SUCCESS,
    ADMIN_RECIPES_FAIL,
    NEW_RECIPE_REQUEST,
    NEW_RECIPE_SUCCESS,
    NEW_RECIPE_FAIL,
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    RECIPE_DETAILS_REQUEST,
    RECIPE_DETAILS_SUCCESS,
    RECIPE_DETAILS_FAIL,
    NEW_RECIPE_REVIEW_REQUEST,
    NEW_RECIPE_REVIEW_SUCCESS,
    NEW_RECIPE_REVIEW_FAIL,
    GET_RECIPE_REVIEWS_REQUEST,
    GET_RECIPE_REVIEWS_SUCCESS,
    GET_RECIPE_REVIEWS_FAIL,
    DELETE_RECIPE_REVIEW_REQUEST,
    DELETE_RECIPE_REVIEW_SUCCESS,
    DELETE_RECIPE_REVIEW_RESET,
    DELETE_RECIPE_REVIEW_FAIL,
    CLEAR_ERRORS,
    } from "../constants/recipeConstants";
    import axios from "axios";
    // setting up config file
    const { URL_API } = require('../config/config.json')
    // Get user token
const userTokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
const userToken = userTokenCookie ? userTokenCookie.split('=')[1] : null;

export const getRecipes =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RECIPES_REQUEST });
      let link = `${URL_API}/api/v1/recipes?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}`;
      // let link = `/api/v1/recipes?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
      if (category) {
        link = `${URL_API}/api/v1/recipes?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_RECIPES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_RECIPES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newRecipe = (recipeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RECIPE_REQUEST });

    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    
    const { data } = await axios.post(
      `${URL_API}/api/v1/admin/recipe/new`,
      recipeData,
      config
    );

    dispatch({
      type: NEW_RECIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete recipe (Admin)
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    
    dispatch({ type: DELETE_RECIPE_REQUEST });

    const { data } = await axios.delete(`${URL_API}/api/v1/admin/recipe/${id}`, config);

    dispatch({
      type: DELETE_RECIPE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Recipe (ADMIN)
export const updateRecipe = (id, recipeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RECIPE_REQUEST });

    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    
    const { data } = await axios.put(
      `${URL_API}/api/v1/admin/recipe/${id}`,
      recipeData,
      config
    );

    dispatch({
      type: UPDATE_RECIPE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RECIPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRecipeDetails = (id) => async (dispatch) => {
  try {
    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };

    dispatch({ type: RECIPE_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL_API}/api/v1/recipe/${id}`, config);

    dispatch({
      type: RECIPE_DETAILS_SUCCESS,
      payload: data.recipe,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RECIPE_REVIEW_REQUEST });

    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };

    const { data } = await axios.put(`${URL_API}/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_RECIPE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_RECIPE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminRecipes = () => async (dispatch) => {
  try {
    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    dispatch({ type: ADMIN_RECIPES_REQUEST });

    const { data } = await axios.get(`${URL_API}/api/v1/admin/recipes`, config);

    dispatch({
      type: ADMIN_RECIPES_SUCCESS,
      payload: data.recipes,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_RECIPES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get recipe reviews
export const getRecipeReviews = (id) => async (dispatch) => {
  try {
    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    dispatch({ type: GET_RECIPE_REVIEWS_REQUEST });

    const { data } = await axios.get(`${URL_API}/api/v1/reviews?id=${id}`, config);

    dispatch({
      type: GET_RECIPE_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_RECIPE_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete recipe review
export const deleteReview = (id, recipeId) => async (dispatch) => {
  try {
    let token = ''
    if (userToken) {
      token = userToken
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    dispatch({ type: DELETE_RECIPE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `${URL_API}/api/v1/reviews?id=${id}&recipeId=${recipeId}`, config
    );

    dispatch({
      type: DELETE_RECIPE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_RECIPE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
