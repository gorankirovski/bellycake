import { COMPRESS_IMAGE_FAIL, COMPRESS_IMAGE_SUCCESS  } from "../constants/imageConstants";
import { compressImage } from '../Utils/compressImage';

export const compressImage = (image) => async (dispatch) => {
    try {
        const compressedImage = await compressImage(image, 800, 800, 0.8);
        dispatch({ type: COMPRESS_IMAGE_SUCCESS, payload: compressedImage });
      } catch (error) {
        dispatch({ type: COMPRESS_IMAGE_FAIL, payload: error.message });
      }

}