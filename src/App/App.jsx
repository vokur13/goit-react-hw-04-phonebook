import { useState, useMemo } from 'react';
import { Box } from '../components/Box';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';
import { nanoid } from 'nanoid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initailContacts } from '../utils/initialContacts';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, initailContacts);
  const [filter, setFilter] = useState('');

  function formSubmitHandler({ name, number }) {
    const checkName = contacts.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    checkName
      ? alert(`${name} is already in contacts`)
      : setContacts([{ id: nanoid(), name, number }, ...contacts]);
  }

  function onFilterChange([value]) {
    !value ? setFilter('') : setFilter(value);
  }

  const filteredContacts = useMemo(() => {
    return contacts.filter(item => {
      return item.name
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim());
    });
  }, [contacts, filter]);

  function deleteItem(itemID) {
    setContacts(contacts.filter(item => item.id !== itemID));
  }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      <ContactList onDelete={deleteItem} list={filteredContacts} />
    </Box>
  );
};
