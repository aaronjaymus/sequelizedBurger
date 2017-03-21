// var express = require("express");

// var router = express.Router();

// var burger = require("../models/burger.js");

// router.get("/", function(req, res){
// 	burger.all(function(data){
// 		var hbsObject = {
// 			burgers: data
// 		};
// 		console.log(hbsObject);
// 		res.render("index", hbsObject);
// 	});
// });

// router.post("/", function(req, res){
// 	burger.create("burger_name", req.body.burger_name, function(){
// 		res.redirect("/");
// 	});
// });

// router.put("/:id", function(req, res){
// 	var condition = "id= " + req.params.id;

// 	console.log("condition ", condition);

// 	burger.update({
// 		devoured: req.body.devoured
// 	}, condition, function(){
// 		res.redirect("/");
// 	});
// });

// module.exports = router;

var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res){
		db.burger.findAll({}).then(function(dbTodo) {
			res.json(dbTodo);
		});
	});

	app.post("/", function(req, res){
		db.burger.create({
			burger_name: req.body.burger_name
		}).then(function(dbTodo){
			res.json(dbTodo);
		});
	});

	app.put("/:id", function(req, res){
		db.burger.update({
			devoured: true
		}, {
			where: {id: req.params.id}
		}).then(function(dbTodo){
			res.json(dbTodo);
		});
	});
}