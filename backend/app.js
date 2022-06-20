const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

let corsOptions = {
    origin: "http://localhost:8080",
};

app.use(helmet());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRoutes = require("./routes/user");
const apiRoot = '/api/users'
app.use(apiRoot, userRoutes);

const postRoutes = require("./routes/meme");
app.use('/api/post', postRoutes);

const likeRoutes = require("./routes/like");
app.use('api/post/:memeId/like', likeRoutes);

const commentRoutes = require("./routes/like");
app.use('api/post/:memeId/', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync({force: false}).then(() => {
    console.log("Database connection established");
});

module.exports = app;