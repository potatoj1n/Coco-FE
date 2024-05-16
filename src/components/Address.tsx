import axios from 'axios';

const address = axios.create({
  baseURL: 'https://k100f7af4f18ea.user-app.krampoline.com',
});

export default address;
