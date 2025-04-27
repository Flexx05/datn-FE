import { AuthHeader } from "../components/authHeader";
import Background from '../assets/image/shoes.svg';
import Facebook from '../assets/image/facebook.svg';
import Google from '../assets/image/google.svg';
import { Link } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
const Login: React.FC = () => {
    const [showPass , setShowPass] = useState(false);

    document.title = "Đăng nhập"
    const togglePassword = () => {
        setShowPass(!showPass);
    };
    return (
        <>
            <AuthHeader title={"Đăng nhập"} />
            <div className="auth-box">
                <div className="container mx-auto">
                    <div className="grid place-items-center grid-cols-2">
                        <img src={Background} className="ani" />
                        <div className="auth-form">
                            <form action="">
                                <div className="input-group">
                                    <input
                                        required
                                        type="text"
                                        name="text"
                                        autoComplete="off"
                                        className="input"
                                    />
                                    <label className="user-label">Email</label>
                                </div>
                                <div className="input-group">
                                    <input
                                        required
                                        type={showPass? "text" : "password"}
                                        name="text"
                                        autoComplete="off"
                                        className="input"
                                    />
                                    <label className="user-label">Mật khẩu</label>
                                    <div className="changepass" onClick={togglePassword}>
                                        {
                                            showPass ? <EyeInvisibleFilled /> : <EyeFilled />
                                        }
                                    </div>
                                </div>
                                <div className="input-group">
                                    <button className="btn-auth rounded">
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center ">
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" className="form-text ml-2">Duy trì đăng nhập</label>
                                    </div>
                                    <a href="" className="form-text">Quên mật khẩu</a>
                                </div>

                            </form>
                            <div className="line">
                                <strong>Or</strong>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <div className="bg-blue-700 flex items-center justify-center social">
                                    <img src={Facebook} />
                                </div>
                                <div className="flex items-center justify-center border border-black border-solid social">
                                    <img src={Google} alt="" />
                                </div>
                            </div>
                            <span className="text-center block mt-8">Bạn chưa có tài khoản? <Link to="/register" className="text-blue-600 font-bold">Đăng ký</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
