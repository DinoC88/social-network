const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const conn = require("../../db/index");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route GET api/users/test
//@desc Test users route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users works" });
});

//@route POST api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  conn.query('SELECT * FROM users WHERE email=? LIMIT 1', email, (err, result)=> {
    if(result.length > 0) {
      res.json({error: "Email already exists"});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Size
        r: "pg", //Rating
        d: "mm" // Default
      });
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //make user password equal to hash
          newUser.password = hash;
          //save newUser to DB
         conn.query('INSERT INTO users SET ?', [newUser]);
         res.json({msg: "User register"});
        });
      });
    }
  }); 

});

//@route POST api/users/login
//@desc Login user
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  conn.query('SELECT * FROM users WHERE email=? LIMIT 1', email, (err, user)=> {
    if(user.length == 0) {
      res.json({error: "User not found"});
    } else {
      //Check password
    bcrypt.compare(password, user[0].password).then(isMatch => {
      if (isMatch) {
        //User matched
        //Create JWT Payload
        const payload = { id: user[0].id, name: user[0].name, avatar: user[0].avatar };
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
    }
  })
});

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      created: req.user.date_added
    });
  }
);

//@route DELETE api/users
//@desc  Delete user and profile info
//@access Private
router.delete(
  "/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const userid = req.user.id;
    conn.query("DELETE FROM users WHERE id = ?", userid, (err, result)=> {
        res.json({msg: "User deleted"});
    })
  }
);

module.exports = router;
