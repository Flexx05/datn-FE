import { AuthHeader } from "../components/authHeader";
import Background from "../assets/image/shoes.svg";
import { useRef, useState } from "react";
import { Steps } from "antd";
import Swal from "sweetalert2";
import { sendOtpToEmail } from "../services/authService"; // Import dịch vụ gửi email

export const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  document.title = "Quên mật khẩu";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) {
      e.target.value = "";
      return;
    }
    if (value && index < inputsRef.current.length - 1) {
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

  const handleSendEmail = async () => {
    setLoading(true); // Bắt đầu loading
    const response = await sendOtpToEmail(email);
    setLoading(false); // Dừng loading

    if (response.success) {
      setStep(1);  // Chuyển sang bước nhập OTP
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
                    disabled={!/\S+@\S+\.\S+/.test(email) || loading} // Disable button khi đang loading
                  >
                    {loading ? "Đang gửi..." : "Tiếp tục"} {/* Hiển thị trạng thái loading */}
                  </button>
                  {loading && (
                    <div className="loading-spinner">
                      {/* Hiển thị vòng quay tải */}
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
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
                  <div className="flex justify-between">
                    <button className="btn-auth rounded">Xác nhận</button>
                  </div>
                  <span className="text-center block mt-8">
                    Bạn chưa nhận được mã?{" "}
                    <a className="text-blue-600 font-bold" href="/register">
                      Gửi lại mã OTP
                    </a>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
