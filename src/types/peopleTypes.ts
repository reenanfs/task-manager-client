export interface IPerson {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface IPeopleData {
  users: IPerson[];
}
