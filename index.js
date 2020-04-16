const express = require('express');
const articleRouter = require('./routes/article')
const functions = require('firebase-functions');
const mongoose = require('mongoose');
const Articles = require('./models/articles');
const firebase = require('firebase')

//MLABS MONGO DB
mongoose.connect('mongodb+srv://sagar:sagar12345@myfirstmongodb-tldsv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//FOR FIREBASE
const serviceAccount = require('./nodejs2613-firebase-adminsdk-7cds5-5462fc2575.json')

const admin = require("firebase-admin");
firebase.initializeApp({
    serviceAccount: "./nodejs2613-firebase-adminsdk-7cds5-5462fc2575.json",

    databaseURL: "https://nodejs2613.firebaseio.com"
}, );

admin.initializeApp(
    functions.config.admin
)

//FOR FIREBASE REALTIME DATABASE
var db = firebase.database();
var ref = db.ref("/user_data");



//CREATE AN EXPRESS APP
const app = express();

//TO ACCESS THE BODY.TITLE FROM ARTICLES PAGE
app.use(express.urlencoded({ extended: false }));

//TO ROUTE ARTICLES ROUTES
app.use('/articles', articleRouter);

//TO USE EJS
app.set('view engine', 'ejs');

//LISTEN TO PORT NO.
app.listen('3000');

//INDEX PAGE WILL LOOK LIKE
app.get('/', async(req, res) => {
    const articles = await Articles.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles })
        // res.send("hello this is index page")

    //SENDING DATA TO FIREBASE REALTIME DATABASE
    ref.set([{
            id: 20,
            name: "Jane Doe",
            email: "jane@doe.com",
            website: "https://jane.foo.bar"
        },
        {
            id: 21,
            name: "John doe",
            email: "john@doe.com",
            website: "https://foo.bar"
        }
    ]);

})

exports.app = functions.https.onRequest(app, () => {
    console.log("working");
});