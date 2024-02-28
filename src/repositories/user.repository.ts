import { sign } from "jsonwebtoken";
import {
  UserCreate,
  UserInterfaceRepository,
  User,
  UserLogin,
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

  async login(data: UserLogin): Promise<string> {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!user) {
      throw new Error("email ou senha invalida").message;
    }

    const token = sign(
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
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
