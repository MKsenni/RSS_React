import * as yup from 'yup';
import { Gender } from '../services/types';

yup.setLocale({
  string: {
    min: `password must be at least 6 characters`,
  },
});

const validFileExtensions = ['jpg', 'png', 'jpeg'];

export type FormData = yup.InferType<typeof schema>;
export const schema = yup
  .object({
    name: yup
      .string()
      .required('Required field')
      .matches(/^[A-ZА-Я]/, 'First latter must be uppercase'),
    age: yup
      .number()
      .required('Required field')
      .typeError('Must be number')
      .positive('Must be positive number')
      .integer('Must be integer number'),
    email: yup
      .string()
      .required('Required field')
      .email('e.g. example@ex.ex without leading or trailing whitespace')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'e.g. example@ex.ex without leading or trailing whitespace'
      ),
    password: yup
      .string()
      .required('Required field')
      .matches(/(?=.*\d)/, 'Password must contain 1 number')
      .matches(/(?=.*[A-Z])/, 'Password must contain 1 uppercased letter')
      .matches(/(?=.*[a-z])/, 'Password must contain 1 lowercased letter')
      .matches(/(?=.*\W)/, 'Password must contain 1 special character')
      .min(6, `Password must be at least 6 characters`),
    confirmPassword: yup
      .string()
      .required('Required field')
      .oneOf([yup.ref('password')], 'Passwords must matches'),
    gender: yup.mixed<Gender>().required('Required field'),
    country: yup.string().required('Required field'),
    accept: yup.boolean().oneOf([true], 'Accept must be checked').required(),
    image: yup
      .mixed<FileList>()
      .required('Required field')
      .test('fileType', 'Image must be jpeg, png, jpg', (value: FileList) => {
        for (const file of value) {
          if (
            file &&
            !validFileExtensions.includes(file.name.split('.').pop() || '')
          ) {
            return false;
          }
          return true;
        }
      })
      .test('fileSize', 'Image must be less 2 Mb', (value: FileList) => {
        for (const file of value) {
          if (file && file.size > 2000000) {
            return false;
          }
          return true;
        }
      }),
  })
  .required('Required field');
