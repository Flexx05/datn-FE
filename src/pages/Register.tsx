import { AuthHeader } from "../components/authHeader";
import Background from "../assets/image/shoes.svg";
import React, { useEffect, useState } from "react";
import OtpVerificationForm from "../components/OtpVerificationForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
const Register: React.FC = () => {
 useEffect(() => {
    document.title = "Đăng ký";
  }, []);
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegisterSuccess = (email: string) => {
    setEmail(email);
    setIsRegistered(true);
  };
  const navigate = useNavigate();

  const handleOtpVerified = () => {
    navigate("/login");
  };
  
  return (
    <>
      <AuthHeader title={"Đăng ký"} />
      <div className="auth-box">
        <div className="container mx-auto">
          <div className="grid place-items-center grid-cols-2">
            <img src={Background} className="ani" />
            {!isRegistered ? (
              <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            ) : (
              <OtpVerificationForm email={email} onOtpVerified={handleOtpVerified} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
