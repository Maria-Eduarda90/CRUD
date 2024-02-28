import {
  User,
  UserCreate,
  UserInterfaceRepository,
  UserLogin,
} from "./../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserUseCase {
  private userRepository: UserInterfaceRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const verifyIfEmailExist = await this.userRepository.findByEmail(email);
    if (verifyIfEmailExist) {
      throw new Error("Esse email já está cadastrado").message;
    }

    const result = await this.userRepository.create({ name, email, password });

    return result;
  }

  async login({ email, password }: UserLogin): Promise<string> {
    const result = await this.userRepository.login({ email, password });

    return result;
  }
}
