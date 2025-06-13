import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const brandService = {
  // Lấy tất cả thương hiệu
  getAllBrands: async () => {
    const res = await axios.get(`${API_URL}/brand`);
    return res.data;
  },
};