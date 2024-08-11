const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const app = express();
require('./config/database');
const cors = require('cors');

const tracksController = require('./controllers/tracks');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: process.env.CORS_ORIGIN}));

app.use('/tracks', tracksController);

app.listen(3000, () => {
    console.log('The express app is ready!');
});