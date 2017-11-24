const express = require('express')
const router = express.Router()
const pageServicse = require('../servicse/page_servicse')
/* GET home page. */
router.use('/', (req, res, next) => {
    res.json(pageServicse.setPage(req.body))
})

module.exports = router