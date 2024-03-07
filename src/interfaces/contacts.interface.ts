export interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId?: string;
}

export interface ContactsCreate {
  name: string;
  email: string;
  phone: string;
  userId: string;
}

export interface ContactsInterfaceRepository {
  create(data: ContactsCreate): Promise<Contacts>;
  findByEmailOrPhone(email: string, phone: string): Promise<Contacts | null>;
  findAllContacts(userId: string): Promise<Contacts[]>;
  updateContact({ id, name, email, phone }: Contacts): Promise<Contacts>;
}
