const express = require("express")
const router = express.Router()
const { db } = require("../../database")

router.get("/", function(req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.redirect("/login")
	} else {
		db.query(`SELECT * FROM Users WHERE ${req.cookies["CodexplantLogin"].Username} `, function(err, result) {
			if (result == "") {
				res.redirect("/logout")
			} else {
				res.render("Admin/index.ejs", { LoginData: req.cookies["CodexplantLogin"], Data: "dafa" })
			}
		})
	}
})

router.get("/productadd", function(req, res) {
	if (req.cookies["CodexplantLogin"].Perm >= 4) {
		res.render("Admin/product_add.ejs", { LoginData: req.cookies["CodexplantLogin"] })
	} else {
		res.redirect("/")
	}
})

router.post("/productadd", function(req, res) {
	var name = req.body.name
	var price = req.body.price
	var features = req.body.features
	var description = req.body.description
	var link = req.body.link

	if (name && price && features && description && link) {
		db.query(`INSERT INTO Ürünler (Name, Price, Features, Description, link) VALUES ('${req.body.name}', ${(req.body.price)}, '${req.body.features}', '${req.body.description}', '${req.body.link}')`)
		res.render("Admin/product_add.ejs", { LoginData: req.cookies["CodexplantLogin"] })
	} else {
		res.redirect("/admin/productadd", { LoginData: req.cookies["CodexplantLogin"] })
	}	
})


module.exports = router