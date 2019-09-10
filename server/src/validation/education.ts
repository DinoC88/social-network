import Validator from 'validator';
import isEmpty from './is-empty';
import { IEducation } from '../interface/IEducation.interface';

function validateEducationInput(data: IEducation) {
  let errors: any = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from_date = !isEmpty(data.from_date) ? data.from_date : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }
  if (Validator.isEmpty(data.from_date)) {
    errors.from_date = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default validateEducationInput;
