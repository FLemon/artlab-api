var express = require('express')
var router = express.Router()

router.get('/health', function(req, res, next) { res.json({ status: 'healthy' }) })

module.exports = router
