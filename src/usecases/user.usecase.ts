import {
  User,
  UserCreate,
  UserInterfaceRepository,
} from "./../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserUseCase {
  private userRepository: UserInterfaceRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const result = await this.userRepository.create({ name, email, password });

    return result;
  }
}