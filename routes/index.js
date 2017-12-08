const express = require('express')
const router = express.Router()
const pageServicse = require('../servicse/page_servicse')
/* GET home page. */
router.use('/', async (req, res, next) => {
    res.locals.List = await pageServicse.getList();
    res.render('index');
})

module.exports = router
