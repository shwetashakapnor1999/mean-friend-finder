var express = require("express");
var router = express.Router();
var indexModel = require("../models/indexModel");
var sendMail = require("./mailAPI");
const uploadPhoto = require("./helper");
var jwt = require("jsonwebtoken");
var generate_random_key = require("./randomStringAPI");

router.get("/", (req, res, next) => {
  res.send("its working");
});

router.post("/usersignup", (req, res, next) => {
  var collection_name = "register";
  indexModel
    .usersignup(collection_name, req.body)
    .then((result) => {
      sendMail(req.body);
      res.json({ response: "success" });
    })
    .catch((err) => {
      res.json({ response: "failed" });
    });
});

router.post("/usercontact", (req, res, next) => {
  var collection_name = "contact";
  indexModel
    .usercontact(collection_name, req.body)
    .then((result) => {
      res.json({ response: "success" });
    })
    .catch((err) => {
      res.json({ response: "failed" });
    });
});

router.post("/userlogin", (req, res, next) => {
  var collection_name = "register";
  indexModel
    .userlogin(collection_name, req.body)
    .then((result) => {
      var flag;
      if (result.length == 0) {
        flag = 0;
        res.json({ response: flag });
      } else {
        flag = 1;
        var payload = { subject: result[0]._id };
        var token = jwt.sign(payload, generate_random_key(50));
        res.json({ response: flag, token: token, user: result[0] });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addNewFriend", (req, res, next) => {
  var collection_name = "register";
  let { userId, friendId } = req.body;
  indexModel
    .addNewFriend(collection_name, parseInt(userId), parseInt(friendId))
    .then((result) => {
      console.log(result);
      res.json({ response: "success" });
    })
    .catch((err) => {
      res.json({ response: "failed" });
    });
});

router.post("/getRecommendations", (req, res, next) => {
  var collection_name = "register";
  let { userId } = req.body;
  indexModel
    .getRecommendations(collection_name, parseInt(userId))
    .then((result) => {
      console.log(result);
      res.json({ response: "success", result });
    })
    .catch((err) => {
      console.log(err);
      res.json({ response: "failed" });
    });
});

router.post("/getAllFriends", (req, res, next) => {
  var collection_name = "register";
  let { userId } = req.body;
  indexModel
    .getAllFriends(collection_name, parseInt(userId))
    .then((result) => {
      res.json({ response: "success", result });
    })
    .catch((err) => {
      console.log(err);
      res.json({ response: "failed" });
    });
});

router.post("/getUserProfile", (req, res, next) => {
  var collection_name = "register";
  let { userId } = req.body;
  indexModel
    .getUserProfile(collection_name, parseInt(userId))
    .then((result) => {
      res.json({ response: "success", user: result });
    })
    .catch((err) => {
      console.log(err);
      res.json({ response: "failed" });
    });
});

router.post("/update-profile-image", uploadPhoto, (req, res, next) => {
  var imagePath = `photos/${req.file.filename}`;
  const { userId } = req.body;
  var collection_name = "register";
  indexModel
    .updateUserProfileImage(collection_name, parseInt(userId), imagePath)
    .then((result) => {
      res.json({ response: "success", result });
    })
    .catch((err) => {
      res.json({ response: "failed" });
    });
});

module.exports = router;
