const express = require("express");
const router = express.Router();
const passport = require("passport");
const conn = require("../../database");

//Load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//@route GET api/profile/test
//@desc Test profile route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

//@route GET api/profile
//@desc Get current user profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const userid = req.user.id
    conn.query('Select * from profile WHERE userid = ?', userid, (err, profile)=> {
        if(profile.length == 1) {
          return res.json(profile);
        } else {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
    }) 
  }
);

//@route GET api/profile
//@desc Get current user education
//@access Private
router.get(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const userid = req.user.id
    conn.query('Select * from experience WHERE userid = ?', userid, (err, experience)=> {
        if(experience.length > 0) {
          return res.json(experience);
        } else {
          errors.noexperience = "There is no experience for this user";
          return res.status(404).json(errors);
        }
    }) 
  }
);

//@route GET api/profile
//@desc Get current user education
//@access Private
router.get(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const userid = req.user.id
    conn.query('Select * from education WHERE userid = ?', userid, (err, education)=> {
        if(education.length > 0) {
          return res.json(education);
        } else {
          errors.noeducation = "There is no education for this user";
          return res.status(404).json(errors);
        }
    }) 
  }
);

//@route GET api/profile/educationbyid/:id
//@desc Get current user education
//@access public
router.get("/educationbyid/:id",  (req, res) => {
    const errors = {};
    const userid = req.params.id;
    conn.query("SELECT * FROM education where userid=?", userid, (err, result)=> {
      if(result.length > 0) {
        return res.json(result);
      } else {
        return res.json([]);
      }
    })
    
  }
);

//@route GET api/profile/experiencebyid/:id
//@desc Get current user experience
//@access public
router.get("/experiencebyid/:id",  (req, res) => {
  const errors = {};
  const userid = req.params.id;
  conn.query("SELECT * FROM experience where userid=?", userid, (err, result)=> {
    if(result.length > 0) {
      return res.json(result);
    } else {
      return res.json([]);
    }
  })
  
}
);

//@route GET api/profile/all
//@desc  Get all profiles
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  conn.query('select profile.*, users.name, users.avatar from profile join users on profile.userid = users.id ', (err, profiles)=> {
    if(profiles.length == 0) {
      errors.noprofile = "There is no profiles";
      res.status(404).json(errors);
    } else {
    res.json(profiles);
    }
  })
});

//@route GET api/profile/handle/:handle
//@desc  Get profile by handle
//@access Public
router.get("/:id", (req, res) => {
  const errors = {};
  const checkId = req.params.id;
  conn.query('select profile.*, users.name, users.avatar from profile join users on profile.userid = users.id WHERE profile.userid = ?', checkId, (err, profile)=> {
    if(profile.length == 0) {
      errors.noprofile = "There is no profile for this user";
      return res.status(404).json(errors);
    } else {
      return res.json(profile);
    }
  })
});

//@route POST api/profile
//@desc Create or edit user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Check validation
    if (!isValid) {
      //Return errors
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.userid = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.github = req.body.githubusername;
    if(req.body.skills) profileFields.skills = req.body.skills;
    if(req.body.youtube) profileFields.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.instagram = req.body.instagram;
    if(req.body.linkedin) profileFields.linkedin = req.body.linkedin;

    const userid = req.user.id;
    conn.query('Select * from profile WHERE userid = ?', userid, (err, profile)=> {
     if(profile.length == 1) {
       conn.query(`UPDATE profile SET ? WHERE userid=?`, [profileFields, userid], (err, result) => {
        conn.query("Select * from profile where userid = ?", userid, (err,resp)=> {
          res.json(resp);
        })
       })
     } else {
        const handleCheck = profileFields.handle;
        conn.query("Select * from profile WHERE handle = ?", handleCheck, (err, result)=> {
        if(result.length > 0) {
          errors.handle = "That handle already exist";
          res.status(400).json(errors);
        } else {
          conn.query('INSERT INTO profile SET ?', [profileFields], (err, result)=> {
            conn.query("Select * from profile where userid = ?", userid, (err,resp)=> {
              res.json(resp);
            })
          })
        }
      })
     }
  }) 
    
  }
);

//@route POST api/profile/experience
//@desc  Add experience to profile
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    const { errors, isValid } = validateExperienceInput(req.body);
    //Check validation
    if (!isValid) {
      //Return errors
      return res.status(400).json(errors);
    }
    const userid = req.user.id;
    const newExp = {
      userid: userid,
      title: req.body.title,
      company: req.body.company,
      location: req.body.location ? req.body.location : "",
      from_date: req.body.from,
      to_date: req.body.to ? req.body.to : "",
      current: req.body.current == false ? 0 : 1,
      description: req.body.description ? req.body.description : ""
    };
    conn.query('INSERT INTO experience SET ?', [newExp], (err, result)=> {
      conn.query("Select * from experience where userid = ?", userid, (err,exp)=> {
        res.json(exp);
      })
    }) 
  }
);

//@route POST api/profile/education
//@desc  Add education to profile
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //Check validation
    if (!isValid) {
      //Return errors
      return res.status(400).json(errors);
    }
    const userid = req.user.id;
    const newEdu = {
      userid,
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from_date: req.body.from,
      to_date: req.body.to ? req.body.to : "",
      current: req.body.current == false ? 0 : 1,
      description: req.body.description ? req.body.description : ""
    };
    conn.query('INSERT INTO education SET ?', [newEdu], (err, result)=> {
      conn.query("Select * from education where userid = ?", userid, (err,edu)=> {
        res.json(edu);
      })
    })   
  }
);

//@route DELETE api/profile/experience
//@desc  Delete experience from profile
//@access Private
router.delete(
  "/experience/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const expid = req.params.id;
    const userid = req.user.id;
    conn.query('DELETE FROM experience WHERE id=?', expid, (err, result)=> {
      conn.query('Select * from experience WHERE userid = ?', userid, (err, experience)=> {
        if(experience.length > 0) {
          return res.json(experience);
        } else {
          return res.json([]);
        }
    })
    })
  }
);

//@route DELETE api/profile/education
//@desc  Delete education from profile
//@access Private
router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const eduid = req.params.id;
    const userid = req.user.id;
    conn.query('DELETE FROM education WHERE id=?', eduid, (err, result)=> {
      conn.query('Select * from education WHERE userid = ?', userid, (err, education)=> {
        if(education.length > 0) {
          return res.json(education);
        } else {
          return res.json([]);
        }
    }) 
    })
  }
);

module.exports = router;