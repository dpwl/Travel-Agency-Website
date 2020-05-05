module.exports = 
(req, res) => {
  // setup the mysql connection info and passwd encryption parameter
  const mysql = require('mysql');
  const crypto = require('crypto');
  const hashsalt = 'd9399cd68197e17f7e656b481e217483';
  let pool = mysql.createPool({
    host: "ec2-35-164-148-141.us-west-2.compute.amazonaws.com",
    user: "root",
    password: "passwd1",
    database: "travelexpert",
    dateStrings:"date"
  });

  // get a connection to the database
  pool.getConnection(function(err, connection2) {
    if (err) throw err;
    let query2 = "INSERT INTO customers (CustUserID, CustPasswd, CustName, CustAddress, CustCity, CustProv, CustPostal, CustPhone, CustEmail, CustMsg ) VALUES (?,?,?,?,?,?,?,?,?,?) ";
    // encrypt the password before storing into database
    let hashpw = crypto.pbkdf2Sync(req.body.password, hashsalt, 1000, 64, `sha512`).toString('hex');
    let data1 = [req.body.userID, hashpw, req.body.name, req.body.address, req.body.city, req.body.prov, req.body.postalCode, req.body.phone, req.body.email, req.body.message];
    connection2.query(query2, data1, function(err, result) {
      if (err) throw err;
      console.log(result.affectedRows);
      connection2.release();
      res.redirect('/thanks-register')
    });
  });
}