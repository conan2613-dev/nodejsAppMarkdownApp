const express = require('express');
const articleRouter = require('./routes/article')
//const functions = require('firebase-functions');
const mongoose = require('mongoose');
const Articles = require('./models/articles');
//const firebase = require('firebase')

//MLABS MONGO DB
mongoose.connect('mongodb+srv://sagar:sagar12345@myfirstmongodb-tldsv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//FOR FIREBASE





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
    

})


});
