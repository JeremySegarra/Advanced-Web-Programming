const express = require("express"); //importing express
const app = express.Router(); //the router object is made to be used as middleware works very similar to express()

const userModel = require("../models/user");

app
  .get("/", (req, res) => {
    res.send(user.list);
  })
  .get("/:id", (req, res) => {
    const user = userModel.get(req.params.id); //we exported this function, model should know what database its accessing, models do not know what plateform we are using
    //controller should know its working with express but express does not know what database
    res.send(user);
  });

module.exports = app; //This is how common js exports items
