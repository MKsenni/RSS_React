export type PersonProps = {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
};

export type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PersonProps[];
};

export type Gender = 'male' | 'female';

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
