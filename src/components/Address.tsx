import axios from 'axios';

const address = axios.create({
  baseURL: 'http://43.201.76.117:8080',
  withCredentials: true,
});

export default address;
