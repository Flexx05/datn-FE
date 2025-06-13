import { AuthHeader } from "../components/authHeader";
import Background from "../assets/image/shoes.svg";
import { useRef, useState } from "react";
import { Steps } from "antd";
import Swal from "sweetalert2";
import { sendOtpToEmail, verifyOtpToEmail, resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);  // State cho việc xác thực OTP
  const [password, setPassword] = useState("");  // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState("");  // Xác nhận mật khẩu mới
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  document.title = "Quên mật khẩu";

  const [show, setShow] = useState<{ newPwd: boolean; confirm: boolean }>({
    newPwd: false,
    confirm: false,
  });

  const toggleShow = (field: keyof typeof show) => () =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) {
      e.target.value = "";
      return;
    }

    // Dùng index đã được truyền vào, không cần currentIndex
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus(); // Sử dụng index thay vì currentIndex
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

  const handleSendEmail = async () => {
    setLoading(true);
    const response = await sendOtpToEmail(email);
    setLoading(false);

    if (response.success) {
      setStep(1);
    } else {
      Swal.fire({
        title: "Lỗi",
        text: response.message,
        icon: "error",
      });
    }
  };

  const navigate = useNavigate();

  const verifyOtp = async () => {
    setOtpLoading(true);  // Bật trạng thái loading cho OTP
    const otp = inputsRef.current.map((input) => input?.value).join(""); // Lấy OTP từ các input
    const response = await verifyOtpToEmail(email, otp);
    setOtpLoading(false);  // Tắt loading

    if (response.success) {
      setStep(2);  // Chuyển sang bước 2 - Nhập mật khẩu mới
    } else {
      Swal.fire({
        title: "Lỗi",
        text: response.message,
        icon: "error",
      });
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Lỗi",
        text: "Mật khẩu và mật khẩu nhập lại không khớp",
        icon: "error",
      });
      return;
    }
    const response = await resetPassword(email, password, confirmPassword);
    if (response.success) {
      Swal.fire({
        title: "Thành công",
        text: "Mật khẩu đã được thay đổi thành công",
        icon: "success",
      });
      navigate('/login');
    } else {
      Swal.fire({
        title: "Lỗi",
        text: response.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <AuthHeader title={"Quên mật khẩu"} />
      <div className="auth-box">
        <div className="container mx-auto">
          <div className="grid place-items-center grid-cols-2">
            <img src={Background} className="ani" />
            <div className="auth-form text-center" style={{ minHeight: "auto" }}>
              <div className="step-title mb-7">Nhập Email để nhận mã xác thực</div>

              <Steps current={step} size="small" style={{ marginBottom: 24 }}>
                <Steps.Step title="Nhập Email" />
                <Steps.Step title="Nhập mã xác nhận" />
                <Steps.Step title="Đặt lại mật khẩu" />
              </Steps>

              {step === 0 && (
                <>
                  <div className="input-group mb-4">
                    <input
                      type="email"
                      className="input"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn-auth rounded"
                    onClick={handleSendEmail}
                    disabled={!/\S+@\S+\.\S+/.test(email) || loading}
                  >
                    {loading ? "Đang gửi..." : "Tiếp tục"}
                  </button>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="text-left mb-2 text-sm text-gray-500">
                    Nhập mã xác nhận đã được gửi tới {email}
                  </div>
                  <div className="input-group mb-4">
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
                  <button
                    className="btn-auth rounded"
                    onClick={verifyOtp}
                    disabled={otpLoading}
                  >
                    {otpLoading ? "Đang xác thực..." : "Xác nhận"}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-left mb-2 text-sm text-gray-500">
                    Nhập mật khẩu mới
                  </div>
                  <div className="input-group mb-4 relative">
                    <input
                      required
                      type={show.newPwd ? "text" : "password"}
                      className="input"
                      placeholder="Mật khẩu mới"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShow("newPwd")}
                      className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-gray-500"
                    >
                      {show.newPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="input-group mb-4 relative">
                    <input
                      required
                      type={show.confirm ? "text" : "password"}
                      className="input"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShow("confirm")}
                      className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-gray-500"
                    >
                      {show.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    className="btn-auth rounded"
                    onClick={handleResetPassword}
                  >
                    Đặt lại mật khẩu
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
