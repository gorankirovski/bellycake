const Recipe = require('../models/recipe');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const recipes = require('../data/recipes.json');

// Setting dotenv file
dotenv.config({ path: 'Backend/config/config.env' })

connectDatabase();

const seedRecipes = async () => {
    try {

        await Recipe.deleteMany();
        console.log('Recipes are deleted');

        await Recipe.insertMany(recipes)
        console.log('All Recipes are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedRecipes()