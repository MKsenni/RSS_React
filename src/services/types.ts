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
