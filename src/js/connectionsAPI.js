import axios from 'axios';

const baseURL = 'https://connections-api.herokuapp.com';

export async function registerUser(newUserCreds) {
  return axios.post(baseURL + '/users/signup', newUserCreds);
}

export function loginUser(userCreds) {
  return axios.post(baseURL + '/users/login', userCreds);
}

export function logoutUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(baseURL + '/users/logout', null, config);
}

export function refreshUser(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(baseURL + '/users/current', config);
}

export function fetchContacts(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(baseURL + '/contacts', config);
}

export function postContact(newContact, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(baseURL + '/contacts', newContact, config);
}

export function delContact(id, token) {
  const deleteURL = baseURL + '/contacts/' + id.toString();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(deleteURL, config);
}

export function patchContact(id, updatedContact, token) {
  const updateURL = baseURL + '/contacts/' + id.toString();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(updateURL, updatedContact, config);
}
