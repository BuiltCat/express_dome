const express = require('express')
const router = express.Router()
const pageServicse = require('../servicse/page_servicse')

router.use('/', (req, res, next) => {
    res.locals.page = pageServicse.getPage(req.query.id)
    res.render('read')
})

module.exports = router