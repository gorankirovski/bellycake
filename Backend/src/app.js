
const cors = require('cors')

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')

// setting up config file
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/.env" });

app.use(express.json());
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(
    cors({
      origin: [process.env.URL_WEB],
    }),
  )

// import all routes
const products = require('./routes/product');
const recipes = require('./routes/recipe');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1',products);
app.use('/api/v1',recipes);
app.use('/api/v1', auth)
app.use('/api/v1', order)



// middleware to handel error
app.use(errorMiddleware);

module.exports = app;