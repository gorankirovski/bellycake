import { COMPRESS_IMAGE_SUCCESS, COMPRESS_IMAGE_FAIL } from "../constants/imageConstants";

const initialState = {
    compressedImages: [],
    error: null,
  };
  
export const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMPRESS_IMAGE_SUCCESS:
        return {
          ...state,
          compressedImages: [...state.compressedImages, action.payload],
          error: null,
        };
      case COMPRESS_IMAGE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  