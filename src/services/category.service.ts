import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const categoryService = {
  // Lấy tất cả danh mục
  getAllCategories: async () => {
    const res = await axios.get(`${API_URL}/category`);
    return res.data;
  },

  // Lấy tất cả danh mục con
  getAllSubCategory: async (parentId: string) => {
    const res = await axios.get(`${API_URL}/category/get-all-subcategory/${parentId}`);
    return res.data;
  },
};