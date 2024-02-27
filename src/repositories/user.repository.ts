import { User } from "@prisma/client";
import {
  UserCreate,
  UserInterfaceRepository,
} from "../interfaces/user.interface";
import { prisma } from "../prisma/config.prisma";

export class UserRepository implements UserInterfaceRepository {
  async create(data: UserCreate): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return createdUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const byEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return byEmail || null;
  }
}
