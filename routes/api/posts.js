const express = require("express");
const router = express.Router();
const passport = require("passport");
const conn = require("../../database");

//Post validation
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc Test post route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

//@route  GET api/posts
//@desc   Get post
//@access Public
router.get("/", (req, res) => {
  conn.query("SELECT * FROM posts", (err, result)=> {
    res.json(result);
    })
  
});

//@route  POST api/posts
//@desc   Create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if error exist
      return res.status(400).json(errors);
    }
    const newPost = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      userid: req.user.id
    };
    conn.query("INSERT INTO posts SET ?", newPost, (err, result)=> {
      conn.query("SELECT * FROM posts", (err, posts)=> {
        res.json(posts)
      })
  })
  }
);

//@route  Delete api/posts/:id
//@desc   Delete post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postid = req.params.id;
    const userid = req.user.id;
    
    conn.query("DELETE FROM posts WHERE id=? AND userid=?", [postid, userid], (err, result)=> {
      res.json({msg: "Post deleted"});
  })
  }
);

module.exports = router;
