const express = require('express')
const router = express.Router()
const pageServicse = require('../servicse/page_servicse')
/* GET home page. */
router.use('/', (req, res, next) => {
    res.locals.List = pageServicse.getList()
    res.render('index')
})

module.exports = router
