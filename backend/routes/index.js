const express = require('express');
const router = express.Router();
const apiRputer = require('./api');

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send("Hello World!");
});
router.use('/api',apiRputer)

module.exports = router
