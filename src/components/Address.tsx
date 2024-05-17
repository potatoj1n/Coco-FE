import axios from 'axios';

const address = axios.create({
  baseURL: 'https://kd8514eb63fc1a.user-app.krampoline.com',
});

export default address;
