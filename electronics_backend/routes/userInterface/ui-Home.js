var express = require('express');
var router = express.Router();
var pool = require('../pool');
var upload = require('../multer')

router.get('/fetch_banners', function (req, res) {
    try {
        pool.query('select * from banners', function (error, result) {
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

router.get('/fetch_banners_by_brands', function (req, res) {
    try {
        pool.query('select Bn.*, (select B.brandname from brands B where B.brandid = Bn.brandid ) as brandname from brandbanners Bn where brandid = ?', [req.query.brandid], function (error, result) {
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

router.get('/fetch_banners_by_category', function (req, res) {
    try {
        pool.query('select CB.*, (select C.categoryname from category C where C.categoryid = CB.categoryid) as categoryname from categorybanners CB where categoryid = ?', [req.query.categoryid], function (error, result) {
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

router.get('/display_all_category', function (req, res, next) {
    try {
        pool.query('select * from category', function (error, result) {
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

router.post('/fetch_products_by_category', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname from products P where categoryid = ?', [req.body.categoryid], function (error, result) {
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

router.get('/fetch_product_details', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P', function (error, result) {
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


router.get('/fetch_product_details_for_status', function (req, res) {
    try {
        pool.query('select * from productdetails group by status', function (error, result) {
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

router.get('/fetch_product_details_for_colors', function (req, res) {
    try {
        pool.query('select * from productdetails group by color', function (error, result) {
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

router.get('/fetch_brands', function (req, res) {
    try {
        pool.query('select * from brands group by brandname', function (error, result) {
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
    }
})

router.get('/fetch_product_details_by_category', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where categoryid = ?', [req.query.categoryid], function (error, result) {
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

router.post('/fetch_product_details_by_product_id', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where productid = ?', [req.body.productid], function (error, result) {
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

router.post('/fetch_product_details_by_id', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where productdetailsid = ?', [req.body.productdetailsid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, data: result })
                console.log(result)
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.get('/fetch_product_details_by_brand', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where brandid = ? and categoryid = ?', [req.query.brandid, req.query.categoryid], function (error, result) {
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

router.get('/fetch_product_details_by_status', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where status = ?', [req.query.status], function (error, result) {
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

router.get('/fetch_product_details_by_category_status', function (req, res) {
    try {
        pool.query('select P.*, (select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = P.brandid) as brandname, (select Pr.productname from products Pr where Pr.productid = P.productid) as productname from productdetails P where status = ? and categoryid = ?', [req.query.status, req.query.categoryid], function (error, result) {
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

router.get('/fetch_brands', function (req, res) {
    try {
        pool.query('select B.*, (select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brands B', function (error, result) {
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
    }
})

router.post('/fetch_brands_by_category', function (req, res) {
    try {
        pool.query('select B.*, (select C.categoryname from category C where C.categoryid = B.categoryid) as categoryname from brands B where B.categoryid = ?', [req.body.categoryid], function (error, result) {
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
    }
})

router.post('/submit_user', function (req, res, next) {
    try {
        pool.query('insert into users (firstname, lastname, email, mobileno, address1, address2 ) values (?,?,?,?,?,?)', [req.body.firstname, req.body.lastname, req.body.email, req.body.mobileno, req.body.address1, req.body.address2], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'User added successfully!', data: result })
                console.log("RESULT++>>", result)
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.get('/fetch_profile_details', function (req, res) {
    try {
        pool.query('select * from users', function (error, result) {
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
        console.log(e)
    }
})

router.post('/update_profile_details', function (req, res, next) {
    try {
        pool.query('update users set firstname = ?, lastname = ?, email = ?, mobileno = ?, address1 = ?, address2 = ? where userid = ?', [req.body.firstname, req.body.lastname, req.body.email, req.body.mobileno, req.body.address1, req.body.address2, req.body.userid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Profile updated successfully!' })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/check_user', function (req, res, next) {
    try {
        pool.query('select * from users where mobileno = ? ', [req.body.mobileno], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                if (result.length == 1) { res.json({ status: true, message: 'User found', data: result }) }
                else { res.json({ status: false, message: 'User not found', data: [] }) }
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})


router.post('/fetch_orders_by_user', function (req, res, next) {
    try {
        pool.query('select O.*, (select P.picture from productdetails P where P.productdetailsid = O.productdetailsid) as picture from orders O where O.userid = ?', [req.body.userid], function (error, result) {
            if (error) {
                res.json({ status: false, message: 'Database Error!' })
            }
            else {
                res.json({ status: true, message: 'Orders fetched', data: result })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post("/submit_order", function (req, res) {
    try {
        console.log(req.body)
        var q =
            "insert into orders ( productdetailsid, orderdate, userid, email, mobileno, paymentstatus, deliverystatus, qty)  values ?";
        pool.query(
            q,
            [
                req.body.cart.map((item, i) => {
                    console.log("hi");
                    return [
                        item.productdetailsid,
                        new Date(),
                        req.body.userid,
                        req.body.email,
                        req.body.mobileno,
                        req.body.paymentstatus,
                        "Undelivered",
                        item.qty
                    ];
                }),
            ],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.json({ status: false, message: "Database Error!" });
                } else {
                    console.log(result);
                    res.json({ status: true, message: "Order Submitted Successfully" });
                }
            }
        );
    } catch (e) {
        res.json({ status: false, message: "Server Error!" });
    }
});

router.post('/filter_products', function (req, res) {
    try {
        console.log('TEXT==>>', req.body.text)
        //var q = `select PD.*, (select C.categoryname from category C where C.categoryid = PD.categoryid) as categoryname, (select B.brandname from brands B where B.brandid = PD.brandid) as brandname, (select P.productname from products P where P.productid = PD.productid) as productname from productdetails PD where B.brandname like %${req.body.text}%`
        var q = `SELECT 
        PD.*,
        (SELECT C.categoryname FROM category C WHERE C.categoryid = PD.categoryid) AS categoryname,
        (SELECT B.brandname FROM brands B WHERE B.brandid = PD.brandid) AS brandname,
        (SELECT P.productname FROM products P WHERE P.productid = PD.productid) AS productname
    FROM 
        productdetails PD
    WHERE 
        PD.brandid IN (SELECT B.brandid FROM brands B WHERE B.brandname LIKE '%${req.body.text}%') or
        PD.categoryid IN (SELECT C.categoryid FROM category C WHERE C.categoryname LIKE '%${req.body.text}%') or
        PD.productid IN (SELECT P.productid FROM products P WHERE P.productname LIKE '%${req.body.text}%')`
        pool.query(q, function (error, result) {
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

module.exports = router;
