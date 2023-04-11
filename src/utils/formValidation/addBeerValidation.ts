import * as Yup from 'yup';

const stringValidate = Yup.string().min(2, 'Must be 2 characters or more').required('Required field');

export const addBeerSchema = Yup.object().shape({
  name: stringValidate.max(35, 'Cannot be more than 100 characters'),
  genre: stringValidate.max(35, 'Cannot be more than 100 characters'),
  description: stringValidate.max(250, 'Cannot be more than 250 characters'),
});
