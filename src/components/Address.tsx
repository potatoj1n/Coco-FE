import axios from 'axios';

const username = 'coco';
const password = 'coco';
const token = btoa(`${username}:${password}`);

const address = axios.create({
  baseURL: 'https://43.201.76.117:8080',
  headers: {
    Authorization: `Basic ${token}`,
  },
  withCredentials: true,
});

export default address;
