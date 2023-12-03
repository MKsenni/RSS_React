export const baseUrl = 'https://swapi.dev/api/people';

export const INITIAL_PAGE = 1;

export const STRENGTH_PASS = {
  NUMBER: /(?=.*\d)/,
  UPPERCASE: /(?=.*[A-Z])/,
  LOWERCASE: /(?=.*[a-z])/,
  SPECIAL: /(?=.*\W)/,
};

export type Data = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  accept: boolean;
  image: string;
};
