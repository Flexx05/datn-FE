import { Button } from "antd";
import { useRef, useState } from "react";
import { verifyOtp } from "../services/authService";


interface OtpVerificationFormProps {
  email: string;
  onOtpVerified: () => void;
}


const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email, onOtpVerified }) => {
 const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

   const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await verifyOtp(email, otp.join(""));
      onOtpVerified();
    } catch (error: any) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-form" style={{ minHeight: "279px" }}>
        <form action="">
          <div className="text-left mb-2 text-sm text-gray-500">
            Nhập mã xác nhận đã được gửi
          </div>
          <div className="input-group mb-4 mt-5">
            <div style={{ display: "flex", gap: "10px" }}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="input"
                  style={{
                    width: "calc(100% / 6)",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "25px",
                  }}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>
          <Button
            className="btn-auth rounded" onClick={handleVerifyOtp} disabled={loading}>
             {loading ? "Đang xác thực..." : "Xác thực OTP"}
          </Button>
          <span className="text-center block mt-8">Bạn chưa được gửi mã ? <a className="text-blue-600 font-bold" href="/register">Gửi lại mã OTP</a></span>
        </form>
      </div>
    </>
  );
}
export default OtpVerificationForm;