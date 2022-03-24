const express = require("express"); //importing express
const app = express.Router(); //the router object is made to be used as middleware works very similar to express()

const userModel = require("../models/user");
const CREATED_STATUS = 201;

app
  .get("/", (req, res) => {
    res.send(userModel.list);
  })
  .get("/:id", (req, res) => {
    const user = userModel.get(req.params.id); //we exported this function, model should know what database its accessing, models do not know what plateform we are using
    //controller should know its working with express but express does not know what database
    res.send(user);
  })
  .post("/", (req, res) => {
    const user = userModel.create(req.body);
    res.status(CREATED_STATUS).send(user);
    //Your controller is never supposed to know what database you are using
    //always avoid adding magic numbers to your code, i.e means something to the computer
  });

module.exports = app; //This is how common js exports items
