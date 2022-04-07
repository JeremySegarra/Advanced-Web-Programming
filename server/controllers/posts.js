const express = require("express");
const app = express.Router();

const postModel = require("../models/posts");

const CREATED_STATUS = 201;

app
  .get("/", (req, res) => {
    res.send(postModel.list);
  })
  .get("/wall", (req, res) => {
    res.send(postModel.list.filter((post) => post.owner === req.user.id));
  })
  .get("/:id", (req, res) => {
    const post = postModel.get(req.params.id);
    res.send(post);
  })
  .post("/", (req, res) => {
    const post = postModel.create(req.body);
    res.status(CREATED_STATUS).send(post);
  })
  .delete("/:id", (req, res) => {
    const post = postModel.remove(req.params.id);

    res.send({ success: true, errors: [], data: post });
  })
  .patch("/:id", (req, res) => {
    const post = postModel.update(req.params.id, req.body);

    res.send({ success: true, errors: [], data: post });
  });

module.exports = app; //This is how common js exports items
//we exported this function, model should know what database its accessing, models do not know what plateform we are using
//controller should know its working with express but express does not know what database
//Your controller is never supposed to know what database you are using
//always avoid adding magic numbers to your code, i.e means something to the computer
