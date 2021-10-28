var express = require("express");
const { Collection } = require("mongoose");
var router = express.Router();
var adminModel = require("../models/adminModel");

router.get("/", (req, res, next) => {
  res.send("its working , admin router invoked");
});

router.get("/fetchusers", (req, res, next) => {
  collection_name = "register";
  adminModel
    .fetchUsers(collection_name)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/manageuserstatus", (req, res, next) => {
  var collection_name = "register";
  adminModel
    .manageuserstatus(collection_name, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/cpadmin", (req, res, next) => {
  var collection_name = "register";
  adminModel
    .cpadmin(collection_name, req.body)
    .then((result) => {
      if (result.length == 0) res.json({ response: 0 });
      else {
        if (req.body.npass == req.body.cnpass) {
          //res.json({'response':'change pass'})
          adminModel
            .upadmin(collection_name, req.body)
            .then((result) => {
              res.json({ response: 2 });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json({ response: 1 });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/epfetch", (req, res, next) => {
  var collection_name = "register";
  adminModel
    .epfetch(collection_name, req.body)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/upadminprofile", (req, res, next) => {
  var collection_name = "register";
  adminModel
    .upadminprofile(collection_name, req.body)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
