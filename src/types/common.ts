export interface Contact {
  id: string;
  name: string;
  contactNumber: string;
}

export interface ContactWithoutId extends Omit<Contact, 'id'> {}
