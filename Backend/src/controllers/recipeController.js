const Recipe = require("../models/recipe");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// create new Recipe  =>  /api/v1/admin/Recipe/new
exports.newRecipe = catchAsyncErrors(async (req, res, next) => {

    // for admin push images in cloudinary
  
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)  // for only one image
    } else {
        images = req.body.images // if multiple images then else will be executed
    }
  
    let imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'Recipes'
        });
  
        imagesLinks.push({
            public_id: result.public_id,
            ref: i.ref,
            url: result.secure_url
        })
    }
  
    req.body.images = imagesLinks
    req.body.user = req.user.id;
  
    const recipe = await Recipe.create(req.body);
  
    res.status(201).json({
      success: true,
      recipe,
    });
  });
  
  // Get all Recipes   =>   /api/v1/Recipes?keyword=apple
  exports.getRecipes = catchAsyncErrors(async (req, res, next) => {
  
    const resPerPage = 8;
    const recipesCount = await Recipe.countDocuments();
  
    const apiFeatures = new APIFeatures(Recipe.find(), req.query).search().filter().pagination(resPerPage)
  
    let recipes = await apiFeatures.query;
  
    setTimeout(()=> {
      res.status(200).json({
        success: true,
        recipesCount,
        resPerPage,
        recipes,
      });
    }, 500)
  });
  
  
  // Get all Recipes (Admin)  =>   /api/v1/admin/Recipes
  exports.getAdminRecipes = catchAsyncErrors(async (req, res, next) => {
  
    const recipes = await Recipe.find();
  
    res.status(200).json({
        success: true,
        recipes
    })
  
  })
  
  
  // Get single  Recipe details  =>   /api/v1/Recipe/:id
  exports.getSingleRecipe = catchAsyncErrors(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);
  
    if (!recipe) {
      return next(new ErrorHandler("Recipe not found", 404));
    }
  
    res.status(200).json({
      success: true,
      recipe,
    });
  });
  
  // Update Recipe   =>   /api/v1/admin/Recipe/:id
  exports.updateRecipe = catchAsyncErrors(async (req, res, next) => {
    let recipe = await Recipe.findById(req.params.id);
  
    if (!recipe) {
      return next(new ErrorHandler("Recipe not found", 404));
    }
  
    
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
  
    if (images !== undefined) {
  
        // Deleting images associated with the Recipe
        for (let i = 0; i < recipe.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(recipe.images[i].public_id)
        }
  
        let imagesLinks = [];
  
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'recipes'
            });
  
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
  
        req.body.images = imagesLinks
  
    }
  
    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      recipe,
    });
  });
  
  // Delete Recipe   =>   /api/v1/admin/Recipe/:id
  exports.deleteRecipe = catchAsyncErrors(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);
  
    if (!recipe) {
      return next(new ErrorHandler("Recipe not found", 404));
    }
  
    // Deleting images associated with the Recipe
    for(let i = 0; i < recipe.images.length; ++i) {
      const result = await cloudinary.v2.uploader.destroy(recipe.images[i].public_id);
    }
  
    await recipe.remove();
  
    res.status(200).json({
      success: true,
      message: "Recipe is deleted.",
    });
  });
  
  
  
  // Create new review   =>   /api/v1/review
  exports.createRecipeReview = catchAsyncErrors(async (req, res, next) => {
  
    const { rating, comment, recipeId } = req.body;
  
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
  
    const recipe = await Recipe.findById(recipeId);
  
    const isReviewed = recipe.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )
  
    if (isReviewed) {
        recipe.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
  
    } else {
        recipe.reviews.push(review);
        recipe.numOfReviews = recipe.reviews.length
    }
  
    recipe.ratings = recipe.reviews.reduce((acc, item) => item.rating + acc, 0) / recipe.reviews.length
  
    await recipe.save({ validateBeforeSave: false });
  
    res.status(200).json({
        success: true
    })
  
  })
  
  // Get Recipe Reviews   =>   /api/v1/reviews
  exports.getRecipeReviews = catchAsyncErrors(async (req, res, next) => {
      const recipe = await Recipe.findById(req.query.id);
  
      res.status(200).json({
          success: true,
          reviews: recipe.reviews
      })
  })
  
  
  // Delete Recipe Review   =>   /api/v1/reviews
  exports.deleteRecipeReview = catchAsyncErrors(async (req, res, next) => {
  
    const recipe = await Recipe.findById(req.query.RecipeId);
  
    // console.log(recipe);
  
    const reviews = recipe.reviews.filter(review => review._id.toString() !== req.query.id.toString());
  
    const numOfReviews = reviews.length;
  
    const ratings = recipe.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
  
    await Recipe.findByIdAndUpdate(req.query.recipeId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
  
    res.status(200).json({
        success: true
    })
  })