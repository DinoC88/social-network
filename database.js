const mysql = require("mysql");
const dbInfo = require("./db/keys").mysqlInfo;

//create connection
const DB = mysql.createPool(dbInfo);

//connect 
DB.getConnection((err) => {
  if(err) {
    console.log(err);
  }
  console.log("MySQL connected");
})


module.exports = DB;

