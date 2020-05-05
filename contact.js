module.exports = 
(req, res) => {
  // setup the mysql connection info 
  const mysql = require('mysql');
  let pool = mysql.createPool({
    host: "ec2-35-164-148-141.us-west-2.compute.amazonaws.com",
    user: "root",
    password: "passwd1",
    database: "travelexpert",
    dateStrings:"date"
  });

// function to display information from database when request to visit /contact
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    let agencyquery = "select * from agencies";
    connection.query(agencyquery, function(err, result) {
      if (err) throw err;
      agencies = result;
// list of agents from database with database querys
      let agentsquery = "select * from agents where agents.AgencyId = ?";
      connection.query(agentsquery,['1'], function(err, result2) {
        if (err) throw err;
        agents1 = result2;
        connection.query(agentsquery,['2'], function(err, result3) {
          if (err) throw err;
          agents2 = result3
          res.render("contact", {agencies:agencies, agentList1:agents1, agentList2:agents2});
          connection.release();
        });
      });
    });
  });
}