var express = require('express')
var router = express.Router()

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.cookies["CodexplantLogin"] == undefined) {
    res.render("index.ejs", { Page: "index", LoginStatus: "false", Username: "" })
  } else {
    res.render("index.ejs", { Page: "index", LoginStatus: "true" })
  }
})

router.get("/logout", function(req, res) {
  res.clearCookie("CodexplantLogin")
  res.redirect("/")
})

router.get("/privacy", function(req, res) {
  if (req.cookies["CodexplantLogin"] == undefined) {
    res.render("privacy.ejs", { Page: "index", LoginStatus: "false", Username: "" })
  } else {
    res.render("privacy.ejs", { Page: "index", LoginStatus: "true" })
  }
})

router.get("/terms", function(req, res) {
  if (req.cookies["CodexplantLogin"] == undefined) {
    res.render("terms.ejs", { Page: "index", LoginStatus: "false", Username: "" })
  } else {
    res.render("terms.ejs", { Page: "index", LoginStatus: "true" })
  }
})

module.exports = router