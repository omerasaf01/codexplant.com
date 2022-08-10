var index = require('../routes/index');
var adminhome = require("../routes/Admin/admin")
var login = require("../routes/login")
var shop = require("../routes/shop")
var pay = require("../routes/pay")
var reg = require("../routes/register")
var aut = require("../routes/author");

const { links } = require('express/lib/response');

var routes = [
    {
        name: index,
        title: "Ana Sayfa",
        path: "/"
    },
    {
        name: shop,
        title: "Mağaza",
        path: "/shop"
    },
    {
        name: login,
        title: "Giriş",
        path: "/login"
    },
    {
        name: adminhome,
        title: "Admin Panel",
        path: "/admin"
    },
    {
        name: reg,
        title: "Kayıt",
        path: "/register"
    },
    {
        name: aut,
        title: "",
        path: "/author"
    },
    {
        name: pay,
        title: "Ödeme",
        path: "/payment"
    }
]

module.exports = routes