const mysql = require("mysql")
require("dotenv").config()
var sets = require("./env.json")

var env = sets

let db = mysql.createConnection({
	host: env.database_host,
	user: env.database_user,
	password: env.database_password,
	database: env.database_name
})

db.connect(function(err) {
	if (err) {
		console.log("Mysql Bağlantısı Başarısız!")
	} else {
		console.log("Mysql Bağlantısı Başarılı!")
	}
})

module.exports = { db }