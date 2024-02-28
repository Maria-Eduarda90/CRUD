export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserInterfaceRepository {
  create(data: UserCreate): Promise<User>;
  login(data: UserLogin): Promise<string>;
  findByEmail(email: string): Promise<User | null>;
}
