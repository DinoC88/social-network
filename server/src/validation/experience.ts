import Validator from 'validator';
import isEmpty from './is-empty';
import { IExperience } from '../interface/IExperience.interface';

function validateExperienceInput(data: IExperience) {
  let errors: any = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from_date = !isEmpty(data.from_date) ? data.from_date : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }
  if (Validator.isEmpty(data.from_date)) {
    errors.from_date = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default validateExperienceInput;
