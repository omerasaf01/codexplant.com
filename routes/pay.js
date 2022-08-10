const express = require("express")
const { db } = require("../database")
const router = express.Router()

router.get("/", function(req, res) {
	res.redirect("/login")
})

router.post("/", function(req, res) {

	console.log("istek geldi")
	if (req.cookies["CodexplantLogin"] == undefined) {
		res.redirect("/login")
	} else {
		if (req.query.type || req.query.id) {
			if (req.body.coupon == "") {
				//res.send(`${req.query.id} \n ${req.query.type}`)
				//res.send("Sanal Pos Şu Anlık Kullanılamıyor.")
				db.query(`SELECT * FROM Ürünler WHERE id=${req.query.id}`, (err, result) => {
					if (err) {
						res.send("Hata")
					} else {
						if (result == "") {
							res.send("Aradığınız Ürün Bulunamadı")
						} else {
							db.query(`SELECT * FROM Users WHERE Username='${req.cookies["CodexplantLogin"].Username}'`, (err, inf) => {
								if (err) {
									res.send("Hata 1")
								} else {
									if (inf == "") {
										res.redirect("/logout")
									} else {
										if (inf[0].Kredi >= result[0].Price) {
											var kalan = parseInt(inf[0].Kredi) - parseInt(result[0].Price)

											db.query(`UPDATE Users SET Kredi=${kalan}, Products='${inf[0].Products}`+`,`+`${req.query.id}' WHERE Username='${req.cookies["CodexplantLogin"].Username}'`, (err) => {
												if (err) {
													res.send("Hata 2\n" + err.stack)
												} else {
													res.redirect("/author")
												}
											})
										} else {
											res.send("Bakiye Yetersiz")
										}
									}
								}
							})
						}
					}
				})

			} else {
				db.query(`SELECT * FROM Ürünler WHERE id=${req.query.id}`, (err, result) => {
					if (err) {
						res.send("Hata")
					} else {
						if (result == "") {
							res.send("Satın Alacağınız Ürün Bulunamadı")
						} else {
							db.query(`SELECT * FROM Coupons WHERE Code='${req.query.coupon}'`, function (err, cinfo) {
								if (err) {
									res.send("Hata")
								} else {
									console.log(cinfo)
									var credi = parseInt(cinfo[0].Kredi)
									var price = parseInt(cinfo[0].Price)
									var Username = req.cookies["CodexplantLogin"].Username
									if (!cinfo == "") {
										if (credi >= price) {
											db.query(`SELECT * FROM Users WHERE Username='${Username}'`, (err, datas) => {
												db.query(`UPDATE Users SET Products='${datas[0].Products}` + `,` + `${req.query.id}'` + `WHERE Username=${Username}`, (err) => {
													if (err) {
														res.send("Hata")
													} else {
														res.redirect("/author")
													}
												})
											})
										} else {
											res.send("Kupon Değeri Yetmiyor.")
										}
									}
								}
							})
						}
					}
				})
			}
		} else {
			res.redirect("/shop")
		}
	}
})

module.exports = router