const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    credentials: true,
}));

// app.use(morgan('combined'));

app.use(express.json()); // Parse incoming requests with JSON payloads

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});