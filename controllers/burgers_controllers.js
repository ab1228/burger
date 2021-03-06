var express = require('express');
var router = express.Router();

var burger = require("../models/burger.js")
////get route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
///post route
router.post("/api/burgers", function (req, res) {
    burger.insertOne(
        ['burger_name', 'devoured'],
        [req.body.name, req.body.devoured],
        function (result) {
            res.json({ id: result.insertId });
        }
    );
});
///put route
router.put('/api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;
    console.log("condition", condition);

    burger.updateOne(
        condition,
        function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});
module.exports = router;
