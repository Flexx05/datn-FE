import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const cartService = {
  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error:any) {
      console.error('Lỗi khi tải giỏ hàng:', error.response?.data || error.message);
      throw error;
    }
  },

  addToCart: async (cartItem: { productId: string; variantId: string; quantity: number }) => {
    try {
      console.log('Sending cartItem to add:', cartItem); // Log để debug
      const response = await axios.post(`${API_URL}/cart`, cartItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Add to cart response:', response.data); // Log phản hồi
      return response.data;
    } catch (error:any) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.response?.data || error.message);
      throw error;
    }
  },

  removeCart: async (cartItem: { productId: string; variantId: string }) => {
    try {
      const response = await axios.post(`${API_URL}/cart/remove`, cartItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error:any) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error.response?.data || error.message);
      throw error;
    }
  },

  updateCartQuantity: async (cartItem: { productId: string; variantId: string; quantity: number }) => {
    try {
      const response = await axios.patch(`${API_URL}/cart/update`, cartItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error:any) {
      console.error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:', error.response?.data || error.message);
      throw error;
    }
  },

  syncCart: async (cartData: { userId: string; items: { productId: string; variantId: string; quantity: number }[] }) => {
    try {
      const response = await axios.post(`${API_URL}/cart/sync`, cartData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error:any) {
      console.error('Lỗi khi đồng bộ giỏ hàng:', error.response?.data || error.message);
      throw error;
    }
  },
};