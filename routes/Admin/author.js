const express = require("express")
const { db } = require("../../database")
const router = express.Router()

router.get("/", function(req, res) {
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.redirect("/login")
	} else {
		db.query(`SELECT * FROM Users WHERE Username=${req.cookies["CodexplantLogin"].Username} `, function(err, result) {
			if (err) {
				res.send(err.stack)
			} else {
				res.send(result)
				
				//res.render("author.ejs", { Data: result })
			}
		})
	}
})

module.exports = router