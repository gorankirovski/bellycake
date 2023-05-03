const express = require("express");
const router = express.Router();

const { getRecipes, newRecipe, getSingleRecipe, updateRecipe, deleteRecipe, createRecipeReview, getRecipeReviews, deleteRecipeReview, getAdminRecipes} = require("../controllers/recipeController");

const { isAuthenticatedUser, authorizeRoles  } = require('../middlewares/auth');

router.route('/recipes').get(getRecipes);
router.route('/admin/recipes').get(getAdminRecipes);
router.route('/recipe/:id').get(getSingleRecipe);

router.route('/admin/recipe/new').post(isAuthenticatedUser, authorizeRoles('admin'), newRecipe);

router.route('/admin/recipe/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateRecipe).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteRecipe);

router.route('/review').put(isAuthenticatedUser, createRecipeReview);
router.route('/reviews').get(isAuthenticatedUser, getRecipeReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteRecipeReview)

module.exports = router;
