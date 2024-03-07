import axios from 'axios';

const contactsInstance = axios.create({baseURL: 'https://65e871e24bb72f0a9c4f5c30.mockapi.io/',});

export const getContactsApi = async () => {
  const { data } = await contactsInstance.get('/contacts/');
  return data;
};
export const deleteContactsApi = async id => {
  const { data } = await contactsInstance.delete(`/contacts/${id}`);
  return data;
};
export const addContactsApi = async newContact => {
  const { data } = await contactsInstance.post('/contacts/', newContact);
  return data;
};