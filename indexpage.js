module.exports = 
(req, res) => {
  // setup the mysql connection info 
  const mysql = require('mysql');
  const moment = require('moment');
  let pool = mysql.createPool({
    host: "ec2-35-164-148-141.us-west-2.compute.amazonaws.com",
    user: "root",
    password: "passwd1",
    database: "travelexpert",
    dateStrings:"date"
  });

  pool.getConnection(function(err, connection3) {
    if (err) throw err;
    console.log("package connection is ok");
    let pkquery = "select * from packages";
    connection3.query(pkquery, function(err, packages) {
      if (err) throw err;
      let content2 = '';
      
      // Check if package date is valid. If end date >= current data, display. If start date < current date, make start date bold
      let dateColor = '';
      let currentDate = moment();
      packages.forEach(package => {

        // Get start and end dates
        let startDate = moment(`${package.PkgStartDate}`);
        let endDate = moment(`${package.PkgEndDate}`);

        // Set dates color to red if past, yellow if ongoing, and green if not happened yet
        if (currentDate >= endDate){
          dateColor = 'red';
        } else if (currentDate >= startDate && currentDate <= endDate) {
          dateColor = 'yellow';
        } else {
          dateColor = 'green';
        }

        // Insert package data into html string with variables and classes embedded
        let orderurl = "order/" + package.PackageId;
        content2 += `<figure class="img_${package.PackageId}"> <a href=${orderurl} target="_blank">
                    <img src="../img/${package.PkgImg}.JPG" class="gallery_img" alt="${package.PkgName}"> 
                    <section class="overlay_${package.PackageId}">
                    <p class=${dateColor}>
                    Name: <strong>${package.PkgName}</strong> <br>
                    Description: ${package.PkgDesc} <br>
                    Period: ${package.PkgStartDate} - ${package.PkgEndDate} <br>
                    Price: CAD ${package.PkgBasePrice}
                    </p>
                    </section>
                    </a>
                    </figure>`
      });

      res.render("index", {gallery2:content2});
      connection3.release();
    });
  });
}