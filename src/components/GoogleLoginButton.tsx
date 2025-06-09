import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext ";

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("http://localhost:8080/api/loginGoogle", {
        token: credentialResponse.credential,
      });
      const { user, accessToken } = res.data;
      login(accessToken, user); 
      navigate("/");
    } catch (err: any) {
      console.error("Đăng nhập Google thất bại:", err);
      alert("Không thể đăng nhập bằng Google");
    }
  };

  return (
    <GoogleLogin
     size="large"
      onSuccess={handleSuccess}
      onError={() => alert("Đăng nhập Google thất bại")}
    />
  );
};

export default GoogleLoginButton;
