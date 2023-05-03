import {
    ALL_RECIPES_REQUEST,
    ALL_RECIPES_SUCCESS,
    ALL_RECIPES_FAIL,
    ADMIN_RECIPES_REQUEST,
    ADMIN_RECIPES_SUCCESS,
    ADMIN_RECIPES_FAIL,
    NEW_RECIPE_REQUEST,
    NEW_RECIPE_SUCCESS,
    NEW_RECIPE_RESET,
    NEW_RECIPE_FAIL,
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_RESET,
    DELETE_RECIPE_FAIL,
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_RESET,
    UPDATE_RECIPE_FAIL,
    RECIPE_DETAILS_REQUEST,
    RECIPE_DETAILS_SUCCESS,
    RECIPE_DETAILS_FAIL,
    NEW_RECIPE_REVIEW_REQUEST,
    NEW_RECIPE_REVIEW_SUCCESS,
    NEW_RECIPE_REVIEW_RESET,
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
  
  export const recipesReducer = (state = { recipes: [] }, action) => {
    switch (action.type) {
      case ALL_RECIPES_REQUEST:
      case ADMIN_RECIPES_REQUEST:
        return {
          loading: true,
          recipes: [],
        };
  
      case ALL_RECIPES_SUCCESS:
        return {
          loading: false,
          recipes: action.payload.recipes,
          recipesCount: action.payload.recipesCount,
          resPerPage: action.payload.resPerPage,
        };
  
      case ADMIN_RECIPES_SUCCESS:
        return {
          loading: false,
          recipes: action.payload,
        };
  
      case ALL_RECIPES_FAIL:
      case ADMIN_RECIPES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const newRecipeReducer = (state = { recipe: {} }, action) => {
    switch (action.type) {
      case NEW_RECIPE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case NEW_RECIPE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          recipe: action.payload.recipe,
        };
  
      case NEW_RECIPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case NEW_RECIPE_RESET:
        return {
          ...state,
          success: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const recipeReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_RECIPE_REQUEST:
      case UPDATE_RECIPE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_RECIPE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_RECIPE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_RECIPE_FAIL:
      case UPDATE_RECIPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DELETE_RECIPE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
  
      case UPDATE_RECIPE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const recipeDetailsReducer = (state = { recipe: {} }, action) => {
    switch (action.type) {
      case RECIPE_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case RECIPE_DETAILS_SUCCESS:
        return {
          loading: false,
          recipe: action.payload,
        };
  
      case RECIPE_DETAILS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const newRecipeReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_RECIPE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case NEW_RECIPE_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
  
      case NEW_RECIPE_REVIEW_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case NEW_RECIPE_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const recipeReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {
      case GET_RECIPE_REVIEWS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_RECIPE_REVIEWS_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
  
      case GET_RECIPE_REVIEWS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const recipeReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_RECIPE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_RECIPE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case DELETE_RECIPE_REVIEW_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case DELETE_RECIPE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  