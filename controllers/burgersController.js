var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.all(function (data) {

    console.log(data);
    res.render("index", data);
  });
});


router.post("/api/newburger", function (req, res) {
  burger.create("burger_name", req.body.name, function (result) {

    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});


router.post("/api/eatburger", function (req, res) {
  var condition = "burger_name = " + "'" + req.body.name +"'";

  console.log("condition", condition);

  burger.update("devoured = 1", condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
