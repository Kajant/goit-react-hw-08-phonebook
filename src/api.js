import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  contactsInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const getRegiser = async formData => {
  const { data } = await contactsInstance.post('/users/signup', formData);
  setToken(data.token);
  return data;
};

export const getLogin = async formData => {
  const { data } = await contactsInstance.post('/users/login', formData);
  setToken(data.token);
  return data;
};

export const getLogout = async () => {
  const { data } = await contactsInstance.post('/users/logout');
  return data;
};

export const getRefreshUser = async () => {
  const { data } = await contactsInstance.get('/users/current');
  return data;
};

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
  return data;
};
export const getDeleteContact = async id => {
  const { data } = await contactsInstance.delete(`/contacts/${id}`);
  return data;
};
export const getAddContact = async newContact => {
  const { data } = await contactsInstance.post('/contacts', newContact);
  return data;
};