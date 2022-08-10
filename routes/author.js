const express = require("express")
const { db } = require("../database")
const router = express.Router()

router.get("/", function(req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.redirect("/login")
	} else {
		db.query(`SELECT * FROM Users WHERE Username='${req.cookies["CodexplantLogin"].Username}' `, function(err, result) {
			if (err) {
				res.send(err.stack)
			} else {
				//res.send(result)
				
				var products = result[0].Products
				db.query(`SELECT * FROM Ürünler WHERE id IN (${products})`, function(err, prods) {
					if (err){
						res.send(err.stack)
					} else {
						res.render("author.ejs", { Data: result, prods: prods, LoginStatus: "true" })
					}
					
				})

				/*
				var products = JSON.parse("[" + result[0].Products + "]")
				for (ürün in ürünler) {
					db.query()
					console.log(result)
					res.render("author.ejs", { Data: result, LoginStatus: "true" })
				}
				*/
			}
		})
	}
})

module.exports = router