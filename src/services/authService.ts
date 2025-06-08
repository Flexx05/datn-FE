import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api/';
axios.defaults.withCredentials = true;

export const login = async (email: string, password: string) => {
  return axios.post('/login', { email, password });
};


export const register = async (fullName: string, email: string, password: string, confirmPassword: string) => {
  try {
    const response = await axios.post('/register', {
      fullName,
      email,
      password,
      confirmPassword
    });
    return response.data;
  } catch (error: any) {
    console.error('Registration failed:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred during registration.');
    }
    throw new Error('An unexpected error occurred.');
  }
};


export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post('/verify-otp', {
      email,
      otp,
    });
    return response.data;
  } catch (error: any) {
    // Kiểm tra nếu có lỗi phản hồi từ server
    if (error.response) {
      console.error("Lỗi xác thực OTP: ", error.response.data.message);
      throw new Error(error.response.data.message || "Xác thực OTP thất bại");
    } else if (error.request) {
      // Nếu không có phản hồi từ server
      console.error("Không nhận được phản hồi từ server: ", error.request);
      throw new Error("Không nhận được phản hồi từ server. Vui lòng thử lại.");
    } else {
      console.error("Lỗi không xác định: ", error.message);
      throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
};
