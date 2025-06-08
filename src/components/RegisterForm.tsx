import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import Button from "antd/es/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Facebook from "../assets/image/facebook.svg";
import Google from "../assets/image/google.svg";
import { register } from "../services/authService";
import Swal from "sweetalert2";

interface RegisterFormProps {
  onRegisterSuccess: (email: string) => void;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPass, setShowPass] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const toggleOldPassword = () => {
        setShowPass(!showPass);
    };

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }
        setLoading(true);

        try {
            await register(
                formData.fullName,
                formData.email,
                formData.password,
                formData.confirmPassword
            );
            onRegisterSuccess(formData.email);
            Swal.fire({
                title: "Good job!",
                text: "Đăng ký thành công, Nhập mã OTP để xác thực",
                icon: "success"
            });
        } catch (error: any) {
            console.error('Đăng ký thất bại:', error);
            alert(error.message || 'Đăng ký thất bại!');
        } finally {
            setLoading(false);
        }
    };
    const steps = [
        {
            title: "Email của bạn",
            content: (
                <div className="input-group">
                    <input
                        required
                        type="text"
                        name="email"
                        autoComplete="off"
                        className="input"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <label className="user-label">Email</label>
                </div>
            ),
        },
        {
            title: "Nhập họ và tên của bạn",
            content: (
                <div className="input-group">
                    <input
                        required
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="input"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <label className="user-label">Họ và tên</label>
                </div>
            ),
        },
        {
            title: "Nhập mật khẩu",
            content: (
                <>
                    <div className="input-group">
                        <input
                            required
                            type={showPass ? "text" : "password"}
                            name="password"
                            autoComplete="off"
                            className="input"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        <label className="user-label">Nhập mật khẩu</label>
                        <div className="changepass" onClick={toggleOldPassword}>
                            {showPass ? <EyeInvisibleFilled /> : <EyeFilled />}
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            required
                            type={showNewPassword ? "text" : "password"}
                            name="confirmPassword"
                            autoComplete="off"
                            className="input"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                        />
                        <label className="user-label">Nhập lại mật khẩu</label>
                        <div className="changepass" onClick={toggleNewPassword}>
                            {showNewPassword ? <EyeInvisibleFilled /> : <EyeFilled />}
                        </div>
                    </div>
                </>
            ),
        },
    ];

    const isStepValid = () => {
        switch (current) {
            case 0:
                return /\S+@\S+\.\S+/.test(formData.email);
            case 1:
                return formData.fullName.trim().length > 0;
            case 2:
                return (
                    formData.password.length >= 6 &&
                    formData.password === formData.confirmPassword
                );
            default:
                return false;
        }
    };

    const next = () => setCurrent(current + 1);
    return (
        <>
            <div className="auth-form">
                <form action="">
                    <div style={{ width: "100%", margin: "auto" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }}
                        >
                            {steps.map((step, index) => (
                                <div
                                    className="steps-line"
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor:
                                            current === index ? "#1890ff" : "#f0f0f0",
                                        color: current === index ? "#fff" : "#000",
                                        margin: "0 2px",
                                        width: "123px",
                                        height: "7px",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="step-title">{steps[current].title}</div>
                    <div style={{ marginTop: 20 }}>{steps[current].content}</div>
                    <div className="input-group">
                        {current < steps.length - 1 ? (
                            <Button
                                className="btn-auth rounded"
                                onClick={next}
                                disabled={!isStepValid()}
                            >
                                Tiếp theo
                            </Button>
                        ) : (
                            <Button
                                className="btn-auth rounded"
                                disabled={!isStepValid()}
                                onClick={handleSubmit}
                            >
                                Đăng ký
                            </Button>
                        )}
                        {/* <button className="btn-auth rounded">
                    Đăng nhập
                  </button> */}
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
                <span className="text-center block mt-8">
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-600 font-bold">
                        Đăng ký
                    </Link>
                </span>
            </div>
        </>
    );
}
export default RegisterForm;