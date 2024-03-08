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

  async listAllContacts(userId: string) {
    const contacts = await this.contactsRepository.findAllContacts(userId);

    if (contacts.length === 0) {
      throw new Error("nenhum contato existente").message;
    }

    return contacts;
  }

  async updateContact({ id, name, email, phone }: Contacts): Promise<Contacts> {
    const data = await this.contactsRepository.updateContact({
      id,
      name,
      email,
      phone,
    });

    return data;
  }

  async deleteContact(id: string): Promise<Object> {
    const data = await this.contactsRepository.delete(id);

    return {
      contato: data,
      message: "Contato excluido com sucesso",
    };
  }
}
