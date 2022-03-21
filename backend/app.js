const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

let corsOptions = {
    origin: "http://127.0.0.1:5500"
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
app.use('/api/users', userRoutes);

const postRoutes = require("./routes/meme");
app.use('/api/post', postRoutes);

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = app;