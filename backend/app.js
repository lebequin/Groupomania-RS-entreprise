const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

let corsOptions = {
    origin: "http://127.0.0.1:8080"
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.body)
    //console.log(req)
    next();
});

const userRoutes = require("./routes/user");
const apiRoot = '/api/users'
app.use(apiRoot, userRoutes);

const postRoutes = require("./routes/meme");
app.use('/api/post', postRoutes);

const likeRoutes = require("./routes/like");
app.use('api/post/:memeId/like', likeRoutes);

const commentRoutes = require("./routes/like");
app.use('api/post/', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database connection established");
});

module.exports = app;