const express = require("express")
const { db } = require("../database")
const router = express.Router()

router.get("/", function (req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		db.query("SELECT * FROM Ürünler", function(err, result) {

			res.render("shop.ejs", { "LoginStatus": "false", "Ürünler": result })
		})
	} else {
		db.query("SELECT * FROM Ürünler", function(err, result) {
			
			res.render("shop.ejs", { "LoginStatus": "true", "Ürünler": result })
		})
	}
})
router.get("/product", function(req, res, next) {
	var query = req.query

	db.query(`SELECT * FROM Ürünler WHERE id = '${query.id}'`, function(err, result) {
		if (err) {

			res.send("Bir Hata İle Karşılaştık.")
		} else {
			if (result == "") {

				res.redirect("/shop")
			} else {

				if (req.cookies["CodexplantLogin"] == undefined) {
					res.render("payment.ejs", { LoginStatus: "false", Prod: result })
				} else {
					res.render("payment.ejs", { LoginStatus: "true", Prod: result })
				}
			}
		}
	})
	
})

module.exports = router