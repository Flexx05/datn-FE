import { AuthHeader } from "../components/authHeader";
import Background from "../assets/image/shoes.svg";
import Facebook from "../assets/image/facebook.svg";
import Google from "../assets/image/google.svg";
import { Link } from "react-router-dom";
import { Button } from "antd";
import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { register } from "../services/authService";

const Register: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthday: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
  
    try {
      await register(
        formData.email,
        formData.password,
        formData.name, 
      );
      alert("Đăng ký thành công!");
    } catch (error: unknown) {
      console.error("Đăng ký lỗi", error);
      alert("Đăng ký thất bại!");
    }

  };
  

  const toggleOldPassword = () => {
    setShowPass(!showPass);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  document.title ="Đăng ký"
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              type= {showNewPassword ? "text" : "password"}
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
        return formData.name.trim().length > 0;
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
  const prev = () => setCurrent(current - 1);

  return (
    <>
      <AuthHeader title={"Đăng ký"} />
      <div className="auth-box">
        {current > 0 && (
          <div className="icon-auth" onClick={prev}>
            <ArrowLeftOutlined />
          </div>
        )}
        <div className="container mx-auto">
          <div className="grid place-items-center grid-cols-2">
            <img src={Background} className="ani" />
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
                      onClick={submit}
                      disabled={!isStepValid()}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
