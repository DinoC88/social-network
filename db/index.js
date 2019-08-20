const mysql = require("mysql");
const dbInfo = require("./database").mysqlInfo;

//create connection
const DB = mysql.createConnection(dbInfo)

//connect 
DB.connect((err) => {
  if(err) {
    console.log(err);
  }
  console.log("MySQL connected");
})

module.exports = DB;

