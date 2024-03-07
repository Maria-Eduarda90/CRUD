import {
  Contacts,
  ContactsCreate,
  ContactsInterfaceRepository,
} from "../interfaces/contacts.interface";
import { ContactsRepository } from "../repositories/contacts.repository";

export class ContactsUseCase {
  private contactsRepository: ContactsInterfaceRepository;
  constructor() {
    this.contactsRepository = new ContactsRepository();
  }

  async create({
    email,
    name,
    phone,
    userId,
  }: ContactsCreate): Promise<Contacts> {
    const verifyIfExistContact =
      await this.contactsRepository.findByEmailOrPhone(email, phone);

    if (verifyIfExistContact) {
      throw new Error("Contato já existe").message;
    }

    const contact = await this.contactsRepository.create({
      email,
      name,
      phone,
      userId,
    });

    return contact;
  }
}