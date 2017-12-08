const express = require('express')
const router = express.Router()
const pageServicse = require('../servicse/page_servicse')

router.use('/',async (req, res, next) => {
    const page = await pageServicse.getPage(req.query.id);
    console.log(page)
    res.locals.page = page;
    res.render('read')
})

module.exports = router