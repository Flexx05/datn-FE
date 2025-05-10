import axios from "axios";

axios.defaults.baseURL = 'https://localhost:7047/api/auth/';
axios.defaults.withCredentials = true;

export const login = async (email: string, password: string) => {
    return axios.post('/login', { email, password });
  };


  export const register = async (email: string, password: string, fullName: string) => {
    const response = await axios.post('/register', {
      email,
      password,
      fullName,
    });
    return response.data;
  };
  
  
  export const getProfile = async () => {
    return axios.get('/auth/profile');
  };
  
  export const logout = async () => {
    return axios.post('/auth/logout');
  };
  