import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext ";

const FacebookLoginButton = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleFacebookResponse = async (response: any) => {
        try {
            const res = await axios.post("http://localhost:5000/api/login-facebook", {
                accessToken: response.accessToken,
                userID: response.userID,
            });
            const { user, accessToken } = res.data;
            login(accessToken, user);
            navigate("/");
        } catch (err) {
            alert("Đăng nhập Facebook thất bại");
        }
    };

    return (
        <button
            onClick={handleFacebookResponse}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
           <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" />
            <span>Đăng nhập với Facebook</span>
        </button>
    );
};

export default FacebookLoginButton;
