import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const brandService = {
  getAllBrands: async () => {
    const res = await axios.get(`${API_URL}/brand`);
    return res.data;
  },
};