const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Articles() })
})

router.get('/:_id', async(req, res) => {
    const articleID = await Articles.findById(req.params._id);
    if (articleID == null) res.redirect('/')
    res.render('articles/show', { article: articleID });
})




router.post('/', async(req, res) => {
    let article = new Articles({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,

    })
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);

    } catch (e) {
        res.render('articles/new', { article: article })

    }
    res.send(article);
})

module.exports = router;