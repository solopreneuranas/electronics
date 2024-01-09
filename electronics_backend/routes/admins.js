var express = require('express');
var router = express.Router();
var pool = require('./pool')


router.post('/check_admin_login', function (req, res, next) {
  pool.query('select * from admins where (emailid=? or mobileno=?) and password=?', [req.body.emailid, req.body.emailid, req.body.password], function (error, result) {
    if (error) { res.status(200).json({ message: 'Database Error', status: false }) }
    else {
      if (result.length == 1)
        res.status(200).json({ message: 'Success', status: true, data: result[0] })
      else
        res.status(200).json({ message: 'Invalid Emailid/Mobileno/Password', status: false })

    }
  })
});

router.post('/update_account', function (req, res, next) {
  pool.query('update admins set mobileno = ?, emailid = ?, password = ?, name =? where username = ?', [req.body.mobileno, req.body.emailid, req.body.password, req.body.name, req.body.username], function (error, result) {
    if (error) {
      res.json({ message: 'Database Error', status: false })
    }
    else {
      res.json({ message: 'Success', status: true })
    }
  })
});

module.exports = router;
