import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      throw error;
    }
  },

  getProductBySlug: async (slug: string) => {
    try {
      const response = await axios.get(`${API_URL}/product/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      throw error;
    }
  }
};
