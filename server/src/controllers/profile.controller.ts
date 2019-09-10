import { Request, Response, NextFunction } from 'express';
import * as mysql from 'mysql2';

import * as SqlString from 'sqlstring';
//Validation
import validateProfileInput from '../validation/profile';
import validateExperienceInput from '../validation/experience';
import validateEducationInput from '../validation/education';

// DB
import { connect } from '../database';
import { IProfile } from '../interface/IProfile.interface';
import { IExperience } from '../interface/IExperience.interface';
import { IEducation } from '../interface/IEducation.interface';

//test user function
export async function testProfileRoute(req: Request, res: Response): Promise<Response | void> {
  res.json('Profile testing');
}

//@route GET api/profile
//@desc Get current user profile
//@access Private
export async function getCurrentProfile(req: Request, res: Response): Promise<Response | void> {
  const errors: any = {};
  const userid = res.locals.jwtPayload.id;
  const conn = await connect();
  await conn.query('Select * from profile WHERE userid =' + mysql.escape(userid), (err: Error, profile: any) => {
    if (profile) {
      return res.json(profile);
    } else {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
  });
}

//@route GET api/experience
//@desc Get current user education
//@access Private
export async function getCurrentExperience(req: Request, res: Response): Promise<Response | void> {
  const errors: any = {};
  const userid = res.locals.jwtPayload.id;
  const conn = await connect();
  await conn.query('Select * from experience WHERE userid=' + mysql.escape(userid), (err: Error, experience: any) => {
    if (experience) {
      return res.json(experience);
    } else {
      errors.noexperience = 'There is no experience for this user';
      return res.status(404).json(errors);
    }
  });
}

//@route GET api/education
//@desc Get current user education
//@access Private
export async function getCurrentEducation(req: Request, res: Response): Promise<Response | void> {
  const errors: any = {};
  const userid = res.locals.jwtPayload.id;
  const conn = await connect();
  await conn.query('Select * from education WHERE userid =' + mysql.escape(userid), (err: Error, education: any) => {
    if (education) {
      return res.json(education);
    } else {
      errors.noeducation = 'There is no education for this user';
      return res.status(404).json(errors);
    }
  });
}

//@route GET api/profile/educationbyid/:id
//@desc Get current user education
//@access public
export async function getEducationById(req: Request, res: Response): Promise<Response | void> {
  const userid = req.params.id;
  const conn = await connect();
  await conn.query('SELECT * FROM education where userid=' + mysql.escape(userid), (err: Error, result: any) => {
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json([]);
    }
  });
}

//@route GET api/profile/experiencebyid/:id
//@desc Get current user experience
//@access public
export async function getExperienceById(req: Request, res: Response): Promise<Response | void> {
  const userid = req.params.id;
  const conn = await connect();
  await conn.query('SELECT * FROM experience where userid=' + mysql.escape(userid), (err: Error, result: any) => {
    if (result !== undefined) {
      return res.json(result);
    } else {
      return res.json([]);
    }
  });
}

//@route GET api/profile/all
//@desc  Get all profiles
//@access Public
export async function getAllProfiles(req: Request, res: Response): Promise<Response | void> {
  const errors: any = {};
  const conn = await connect();
  await conn.query(
    'select profile.*, users.name, users.avatar from profile join users on profile.userid = users.id ',
    (err: Error, profiles: any) => {
      if (profiles.length == 0) {
        errors.noprofile = 'There is no profiles';
        res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    }
  );
}

//@route GET api/profile/handle/:handle
//@desc  Get profile by handle
//@access Public
export async function getProfile(req: Request, res: Response): Promise<Response | void> {
  const errors: any = {};
  const checkId = req.params.id;
  const conn = await connect();
  await conn.query(
    'select profile.*, users.name, users.avatar from profile join users on profile.userid = users.id WHERE profile.userid =' +
      mysql.escape(checkId),
    (err: Error, profile: any) => {
      if (profile.length == 0) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    }
  );
}

//@route POST api/profile
//@desc Create or edit user profile
//@access Private
export async function createProfile(req: Request, res: Response): Promise<Response | void> {
  const { errors, isValid } = validateProfileInput(req.body);
  //Check validation
  if (!isValid) {
    //Return errors
    return res.status(400).json(errors);
  }
  //Get fields
  const profileFields: any = {};
  profileFields.userid = res.locals.jwtPayload.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.github) profileFields.github = req.body.github;
  if (req.body.skills) profileFields.skills = req.body.skills;
  if (req.body.youtube) profileFields.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;
  try {
    const userid: number = res.locals.jwtPayload.id;
    const conn = await connect();
    await conn.query(
      'Select * from profile WHERE userid =' + mysql.escape(userid),
      async (err: Error, profile: any) => {
        if (profile.length > 0) {
          let sql = SqlString.format(`UPDATE profile SET ? WHERE userid=?`, [ profileFields, userid ]);
          const conn = await connect();
          await conn.query(sql, async (err: Error, result: any) => {
            const conn = await connect();
            await conn.query('Select * from profile where userid =' + mysql.escape(userid), (err: Error, resp: any) => {
              res.json(resp);
            });
          });
        } else {
          const handleCheck = profileFields.handle;
          const conn = await connect();
          await conn.query(
            'Select * from profile WHERE handle =' + mysql.escape(handleCheck),
            async (err: Error, result: any) => {
              if (result.length > 0) {
                errors.handle = 'That handle already exist';
                res.status(400).json(errors);
              } else {
                const conn = await connect();
                await conn.query(
                  'INSERT INTO profile SET' + mysql.escape(profileFields),
                  async (err: Error, result: any) => {
                    const conn = await connect();
                    await conn.query(
                      'Select * from profile where userid =' + mysql.escape(userid),
                      (err: Error, resp: any) => {
                        res.json(resp);
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (e) {
    res.json(e);
  }
}

//@route POST api/profile/experience
//@desc  Add experience to profile
//@access Private
export async function createExperience(req: Request, res: Response): Promise<Response | void> {
  const { errors, isValid } = validateExperienceInput(req.body);
  //Check validation
  if (!isValid) {
    //Return errors
    return res.status(400).json(errors);
  }
  const userid = res.locals.jwtPayload.id;
  const newExp: IExperience = {
    userid: userid,
    title: req.body.title,
    company: req.body.company,
    location: req.body.location ? req.body.location : '',
    from_date: req.body.from_date,
    to_date: req.body.to_date ? req.body.to_date : '',
    current: req.body.current == false ? 0 : 1,
    description: req.body.description ? req.body.description : ''
  };
  const conn = await connect();
  await conn.query('INSERT INTO experience SET' + mysql.escape(newExp), (err: Error, result: any) => {
    conn.query('Select * from experience where userid =' + mysql.escape(userid), (err: Error, exp: IExperience) => {
      res.json(exp);
    });
  });
}

//@route POST api/profile/education
//@desc  Add education to profile
//@access Private
export async function createEducation(req: Request, res: Response): Promise<Response | void> {
  const { errors, isValid } = validateEducationInput(req.body);
  //Check validation
  if (!isValid) {
    //Return errors
    return res.status(400).json(errors);
  }
  const userid = res.locals.jwtPayload.id;
  const newEdu: IEducation = {
    userid,
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from_date: req.body.from_date,
    to_date: req.body.to_date ? req.body.to_date : '',
    current: req.body.current == false ? 0 : 1,
    description: req.body.description ? req.body.description : ''
  };
  console.log(req.body);

  const conn = await connect();
  await conn.query('INSERT INTO education SET' + mysql.escape(newEdu), (err: Error, result: any) => {
    conn.query('Select * from education where userid =' + mysql.escape(userid), (err: Error, edu: IEducation) => {
      res.json(edu);
    });
  });
}

//@route DELETE api/profile/experience
//@desc  Delete experience from profile
//@access Private
export async function deleteExperience(req: Request, res: Response): Promise<Response | void> {
  const expid: any = req.params.id;
  const userid: number = res.locals.jwtPayload.id;
  const conn = await connect();
  await conn.query('DELETE FROM experience WHERE id=' + mysql.escape(expid), async (err: Error, result: any) => {
    const conn = await connect();
    await conn.query(
      'Select * from experience WHERE userid =' + mysql.escape(userid),
      (err: Error, experience: any) => {
        if (experience.length > 0) {
          return res.json(experience);
        } else {
          return res.json([]);
        }
      }
    );
  });
}

//@route DELETE api/profile/education
//@desc  Delete education from profile
//@access Private
export async function deleteEducation(req: Request, res: Response): Promise<Response | void> {
  const eduid: any = req.params.id;
  const userid: number = res.locals.jwtPayload.id;
  const conn = await connect();
  await conn.query('DELETE FROM education WHERE id=' + mysql.escape(eduid), async (err: Error, result: any) => {
    const conn = await connect();
    await conn.query('Select * from education WHERE userid =' + mysql.escape(userid), (err: Error, education: any) => {
      if (education.length > 0) {
        return res.json(education);
      } else {
        return res.json([]);
      }
    });
  });
}
