const express = require("express")
const { db } = require("../database")
const router = express.Router()
const {body, validationResult} = require("express-validator")

router.get("/", function(req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.render("register.ejs", { fail: "false" })
	} else {
		res.redirect("/")
	}
})

router.post("/", body("email").isEmail(), body("email").isLength({min: 5, max: 150}), function(req, res) {
	
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.redirect("/")
	} else {
		db.query(`SELECT * FROM Users WHERE Username = '${req.body.username}' `, function(err, result) {
			if (result == "") {
				db.query(`INSERT INTO Users (Username, Name, Mail, Password, Perm, Products, Kredi) VALUES ('${req.body.username}', '${req.body.name}', '${req.body.email}', '${req.body.password}', 2, '[]', 0)`, function(err) {
					if (err) {
						res.send(err.stack)
					} else {
						res.redirect("/login")
					}
				})
			} else {
				res.redirect("/")
				
				//res.render("register.ejs", { fail: "true" })
			}
		})
	}
})

module.exports = router