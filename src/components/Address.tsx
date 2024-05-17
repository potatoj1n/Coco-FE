import axios from 'axios';

const address = axios.create({
  baseURL: 'https://k4d76a25863a.user-app.krampoline.com',
});

export default address;
