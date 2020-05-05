module.exports = 
(req, res) => {
  // setup the mysql connection info and passwd encryption parameter
  const mysql = require('mysql');
  let pool = mysql.createPool({
    host: "ec2-35-164-148-141.us-west-2.compute.amazonaws.com",
    user: "root",
    password: "passwd1",
    database: "travelexpert",
    dateStrings:"date"
  });
  const crypto = require('crypto');
  const hashsalt = 'd9399cd68197e17f7e656b481e217483';
  // setup the text generation module for generate order ID
  const textgen = require("./custom_modules/textgen");


  let custAccount = req.body.userID;
  let custPw = req.body.password;
  let hashpw = crypto.pbkdf2Sync(custPw, hashsalt, 1000, 64, `sha512`).toString('hex');
  let accountQuery = "select * from customers where CustUserID=?"
  pool.getConnection(function(err, connection5) {  
    if (err) throw err;
    connection5.query(accountQuery, custAccount, function(err, result) {
      if (err) throw err;
      if (hashpw === result[0].CustPasswd) {
        console.log("password is good");
        let insertOrder = "INSERT INTO bookings(BookingDate,BookingNo,TravelerCount,CustomerId,PackageId) VALUES (?,?,?,?,?)";
        // setting up the date to which the order is placed
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let bookingDate = year + "-" + month + "-" + date;
        // https://usefulangle.com/post/187/nodejs-get-date-time
        let bookingNo = textgen.maketext(8)
        // it will insert the order information into database when pass passwd validation
        let orderInfo = [bookingDate,bookingNo,req.body.travelerCount,result[0].CustomerId,req.body.pkgID];
        connection5.query(insertOrder, orderInfo, function(err, result) {
          if (err) throw err;
          console.log(result.affectedRows);   // double check this one
        });
        connection5.release();
        res.redirect('/thanks-booking');
      }else{
        res.send(500,'wrong account or password')
        connection5.release();
      };
    });
  });  
}