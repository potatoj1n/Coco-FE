import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const username = 'coco';
const password = 'coco';
const token = btoa(`${username}:${password}`);

const address = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Basic ${token}`,
  },
  withCredentials: true,
});

export default address;
