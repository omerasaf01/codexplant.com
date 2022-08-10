const express = require("express")
const router = express.Router()
const { db } = require("../database")

router.get(["/", "/:params"], function(req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.render("login.ejs")

	} else {
		res.redirect("/")
	}
})

router.post(["/", ":params"], function(req, res) {
	var num1 = 0
	db.query(`SELECT * FROM Users WHERE Username = '${req.body.username}'`, function(err, result) {
		num1 = 0
		for (i in result) {
			if (result[i].Username == req.body.username && result[i].Password == req.body.passwword) {

				res.cookie("CodexplantLogin", { 
					Username: result[i].Username, 
					Password: result[i].Password, 
					Name: result[i].Name, 
					Mail: result[i].Mail, 
					Perm: result[i].Perm 
				})

				if (result[i].Perm >= 2) {
					num1 = 1
					res.redirect("/")
				} else {
					num1 = 1
					res.redirect("/author")
				}
				
			} else {
				res.redirect("/logout")
			}
		}
		if (num1 = 0) {
			res.redirect("/register")
		}
	
	})
})

module.exports = router