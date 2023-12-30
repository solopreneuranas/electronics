var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer')

router.post('/submit_category', upload.single('image'), function (req, res, next) {
    try {
        pool.query('insert into category (categoryname, image) values (?,?)', [req.body.categoryname,  req.file.filename], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Category added successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.get('/display_all_category', function (req, res, next) {
    try {
        pool.query('select * from category', function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, categoryData: result })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/update_category', function (req, res, next) {
    try {
        pool.query('update category set categoryname = ?, status = ? where categoryid = ?', [req.body.categoryname, req.body.status, req.body.categoryid] , function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Category updated successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/delete_category', function (req, res, next) {
    try {
        pool.query('delete from category where categoryid = ?', [req.body.categoryid] , function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Category deleted successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/update_category_image', upload.single('image') ,function (req, res, next) {
    try {
        pool.query('update category set image = ? where categoryid = ?', [req.file.filename, req.body.categoryid] , function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Image updated successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

module.exports = router;
