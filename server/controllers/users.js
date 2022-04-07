const express = require("express"); //importing express
const app = express.Router(); //the router object is made to be used as middleware works very similar to express()
const { requireAuth } = require("../models/auth");

const userModel = require("../models/user");
const CREATED_STATUS = 201;

app
  .get("/", requireAuth, (req, res, next) => {
    userModel
      .getList()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
    // res.send(userModel.list);
  })

  .get("/:id", (req, res, next) => {
    // const user = userModel.get(req.params.id); //we exported this function, model should know what database its accessing, models do not know what plateform we are using
    //controller should know its working with express but express does not know what database
    userModel
      .get(req.params.id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);

    // res.send(user);
  })
  .post("/", (req, res, next) => {
    userModel
      .create(req.body)
      .then((user) => {
        res.status(CREATED_STATUS).send(user);
        //we only run this line of code after
        //if anything goes wrong we can catch and pass it next
        //could also do .catch(x => next)
      })
      .catch(next); //this user is now a PROMISE we need to handle this PROMISE now, the user variable will now be where

    //Your controller is never supposed to know what database you are using
    //always avoid adding magic numbers to your code, i.e means something to the computer
  })
  .delete("/:id", requireAuth, (req, res, next) => {
    userModel
      .remove(req.params.id)
      .then(() => {
        res.send({ success: true, errors: [], data: user });
      })
      .catch(next);
    // const user = userModel.remove(req.params.id);

    // res.send({ success: true, errors: [], data: user });
  })
  //put replaces the object patch does not
  .patch("/:id", (req, res) => {
    //we pass both
    const user = userModel.update(req.params.id, req.body);

    res.send({ success: true, errors: [], data: user });
  })
  .post("/login", (req, res, next) => {
    userModel
      .login(req.body.email, req.body.password)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    userModel
      .seed()
      .then((x) => {
        res.send({ success: true, errors: [], data: [] });
      })
      .catch(next);
  });

module.exports = app; //This is how common js exports items
