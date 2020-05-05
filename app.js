/* Author:        Jin Li (most parts, including database, server connection, and encryption), 
                  Yeji Soh(Overall structure and show package info on the images.), 
                  Jacobus Badenhorst(package date validation) */
//Date:          03/20/2020 
//Course Module: CPRG 210 XM5
//Assignment:    Proj-207 Travel Experts


// Import modules for connection 
const express = require('express');
const app = express();
const streamParser = require('body-parser');
const mysql = require('mysql');

// Some configurations
let pool = mysql.createPool({
  host: "ec2-35-164-148-141.us-west-2.compute.amazonaws.com",
  user: "root",
  password: "passwd1",
  database: "travelexpert",
  dateStrings:"date"
});
app.use(streamParser.urlencoded({ extended: true }));
// Set pug engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
// Use static folder for css, images, and javascript
app.use(express.static(__dirname + '/static'));


// service listening and page routing
app.listen(8000, (err) => {
  if (err) throw err;
  console.log("Server listening to port 8000...")
});

// index page, packages are from database
const indexpage = require("./indexpage")
app.get('/', indexpage);

// redirect when customer request the /index page
app.get('/index', (req, res) => {
  res.redirect("/");
});

// render register page
app.get('/register', (req, res) => {
  res.render("register")
});

const contact = require("./contact.js")
// show agents from each agency from database, and additional contact info
app.get('/contact', contact);
  

// get thank-you pages
app.get('/thanks-register', (req, res) => {
  res.render("thanksRegister")
});

// get thank-you booking page
app.get('/thanks-booking', (req, res) => {
  res.render("thanksBooking")
});


// read the package selection from index page and display related info
app.get('/order/:packageChoice', (req, res) => {
  let pkId = req.params.packageChoice;
  pool.getConnection(function(err, connection4) {
    if (err) throw err;
    let pdquery = "select * from packages where packageId=?" ;
    connection4.query(pdquery,[pkId], function(err, result) {
      if (err) throw err;
      res.render("order", {pkDetails:result[0]});
      connection4.release();
    });
  });
});


// store all the registered information to customer table, password is hashed before storing
const registerform = require("./registerform.js")
app.post("/post_form", registerform );


// main order form
const orderform = require("./orderform.js")
app.post("/order_form", orderform );


// if page not found, paste in message
app.get('*', (req,res)=>{
    res.status(404).send('Sorry, we can NOT find the file reqeusted.');
});

