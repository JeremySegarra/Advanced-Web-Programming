const express = require("express");
const app = express.Router();

const postModel = require("../models/posts");

const CREATED_STATUS = 201;

app
  .get("/", (req, res, next) => {
    postModel
      .getList()
      .then((posts) => res.json({ success: true, errors: [], data: posts }))
      .catch(next);
  })
  .get("/wall/:handle", (req, res, next) => {
    postModel
      .getWall(req.params.handle)
      .then((posts) => res.json({ success: true, errors: [], data: posts }))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    postModel
      .get(req.params.id)
      .then((post) => res.json({ success: true, errors: [], data: post }))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    postModel
      .create(req.body)
      .then((post) =>
        res
          .status(CREATED_STATUS)
          .json({ success: true, errors: [], data: post })
      )
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    postModel
      .remove(req.params.id)
      .then((post) => res.json({ success: true, errors: [], data: post }))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    postModel
      .update(req.params.id, req.body)
      .then((post) => res.json({ success: true, errors: [], data: post }))
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    postModel
      .seed()
      .then((post) =>
        res
          .status(CREATED_STATUS)
          .json({ success: true, errors: [], data: post })
      )
      .catch(next);
  });

module.exports = app; //This is how common js exports items
//we exported this function, model should know what database its accessing, models do not know what plateform we are using
//controller should know its working with express but express does not know what database
//Your controller is never supposed to know what database you are using
//always avoid adding magic numbers to your code, i.e means something to the computer
