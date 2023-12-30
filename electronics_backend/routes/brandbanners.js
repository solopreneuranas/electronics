var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

router.post('/submit_brand_banners', upload.any(), function (req, res) {
    try {
        var filenames = req.files.map((item) => item.filename)
        pool.query('insert into brandbanners (brandid, files) values (?,?)', [req.body.brandid, filenames + ''], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
                console.log(error)
            }
            else {
                res.json({ status: true, message: 'Brand Banners uploaded successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
        console.log(e)
    }
})

router.get('/fetch_brand_banners', function (req, res) {
    try {
        pool.query('select * from brandbanners', function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
                console.log(error)
            }
            else {
                res.json({ status: true, data: result })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
        console.log(e)
    }
})

module.exports = router;
