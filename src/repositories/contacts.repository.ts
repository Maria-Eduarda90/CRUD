import { prisma } from "../prisma/config.prisma";
import {
  ContactsCreate,
  Contacts,
  ContactsInterfaceRepository,
} from "./../interfaces/contacts.interface";
export class ContactsRepository implements ContactsInterfaceRepository {
  async create({
    email,
    name,
    phone,
    userId,
  }: ContactsCreate): Promise<Contacts> {
    try {
      const createdContacts = await prisma.contacts.create({
        data: {
          email,
          name,
          phone,
          userId,
        },
      });

      return createdContacts;
    } catch (err) {
      throw err;
    }
  }

  async findByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<Contacts | null> {
    const result = await prisma.contacts.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    });

    return result || null;
  }

  async findAllContacts(userId: string): Promise<Contacts[]> {
    const result = await prisma.contacts.findMany({
      where: {
        userId,
      },
    });

    return result;
  }
}
