interface IUser {
  id?: string;
  email?: string;
  password?: string;
  name?: string | null;
  sessions?: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IUser };
