import axios from 'axios';

const user = localStorage.getItem('user');

const api = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop/',
  headers: { 'Content-Type': 'application/json' },
});

const authApi = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + user,
  },
});

export { api, authApi };
