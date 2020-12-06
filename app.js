
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userRoutes = require('./routes/userRoutes')
const User = require('./models/userModel');

const app = express();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/web-project';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', userRoutes);

app.get('/',(req, res) => {
    res.render('index')
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listen on port ${port}`)
});