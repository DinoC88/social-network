import { Router } from 'express';
import { checkJwt } from '../config/checkJwt';
import {
	testProfileRoute,
	getCurrentProfile,
	getCurrentExperience,
	getCurrentEducation,
	getEducationById,
	getExperienceById,
	getAllProfiles,
	getProfile,
	createProfile,
	createExperience,
	createEducation,
	deleteExperience,
	deleteEducation
} from '../controllers/profile.controller';
const router = Router();

router.route('/test').get(testProfileRoute);

router.route('/').get(checkJwt, getCurrentProfile);
router.route('/experience').get(checkJwt, getCurrentExperience);
router.route('/education').get(checkJwt, getCurrentEducation);
router.route('/educationbyid/:id').get(getEducationById);
router.route('/experiencebyid/:id').get(getExperienceById);
router.route('/all').get(getAllProfiles);
router.route('/:id').get(getProfile);
router.route('/').post(checkJwt, createProfile);
router.route('/experience').post(checkJwt, createExperience);
router.route('/education').post(checkJwt, createEducation);
router.route('/experience/:id').delete(checkJwt, deleteExperience);
router.route('/education/:id').delete(checkJwt, deleteEducation);

export default router;
