var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

router.post('/submit_product', upload.single('picture'), function (req, res) {
    try {
        pool.query('insert into products (productname, categoryid, brandid, picture) values (?,?,?,?)',
            [req.body.productname, req.body.categoryid, req.body.brandid, req.file.filename], function (error, result) {
                if (error) {
                    console.log (error)
                    res.json({ status: false, message: 'Database Error!' })
                }
                else {
                    res.json({ status: true, message: 'Product added successfully!' })
                }
            })
    }
    catch (e) {
        console.log (e)
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.get('/fetch_products', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname from products P', function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, data: result })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/fetch_products_by_brands', function (req, res) {
    try {
        pool.query('select P.*, (select B.brandname from brands B where B.brandid = P.brandid) as brandname from products P where brandid = ?', [req.body.brandid] , function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, data: result })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/update_product_data', function (req, res, next) {
    try {
        pool.query('update products set productname = ?, categoryid = ?, brandid = ? where productid = ?',
            [req.body.productname, req.body.categoryid, req.body.brandid, req.body.productid], function (error, result) {
                if (error) {
                    res.json({ status: false, message: 'Database Error!' })
                }
                else {
                    res.json({ status: true, message: 'Product updated successfully!' })
                }
            })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/update_product_picture', upload.single('picture'), function (req, res, next) {
    try {
        pool.query('update products set picture = ? where productid = ?', [req.file.filename, req.body.productid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
                console.log(error)
            }
            else {
                res.json({ status: true, message: 'Product Picture updated successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
        console.log(e)
    }
})

router.post('/delete_product', function (req, res, next) {
    try {
        pool.query('delete from products where productid = ?', [req.body.productid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Product deleted successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

module.exports = router;
