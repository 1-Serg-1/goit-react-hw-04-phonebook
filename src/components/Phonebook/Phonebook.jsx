import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContainerPhonebook, SearchMessage } from './Phonebook.styled';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const Phonebook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = contact => {
    setContacts(prevState => [contact, ...prevState]);
  };

  const handleChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const createFilter = () => {
    const normalizedContactName = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedContactName)
    );
    return filteredContacts;
  };
  const handleChangeContactDelete = id => {
    const filteredContactsDelete = contacts.filter(
      contact => contact.id !== id
    );
    setContacts(filteredContactsDelete);
  };
  const filtered = createFilter();
  return (
    <ContainerPhonebook>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onAddContact={handleChange} />
      {contacts.length !== 0 && (
        <>
          <h2>Contacts</h2>
          <Filter contacts={contacts} onFilterContact={handleChangeFilter} />
          {filter === '' ? (
            <ContactList
              contacts={contacts}
              onDeleteContact={handleChangeContactDelete}
            />
          ) : filtered.length === 0 ? (
            <SearchMessage>Contact not found</SearchMessage>
          ) : (
            <ContactList
              contacts={filtered}
              onDeleteContact={handleChangeContactDelete}
            />
          )}
        </>
      )}
    </ContainerPhonebook>
  );
};
