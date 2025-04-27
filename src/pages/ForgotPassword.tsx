import { AuthHeader } from "../components/authHeader";
import Background from "../assets/image/shoes.svg";
import { useRef, useState } from "react";
import { Space, Steps } from "antd";

export const ForgotPassword = () => {
  const [method, setMethod] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  document.title = "Quên mật khẩu"
  const handleNext = () => {
    setStep(1);
  };

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
  return (
    <>
      <AuthHeader title={"Quên mật khẩu"} />
      <div className="auth-box">
        <div className="container mx-auto">
          <div className="grid place-items-center grid-cols-2">
            <img src={Background} className="ani" />
            <div className="auth-form text-center">
              <div className="step-title mb-7">
                Phương thức nhận mã xác thực
              </div>
              {method === null && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div className="input-group" onClick={() => setMethod(0)}>
                    <button className="btn-auth rounded bg-[#6D75A8]">
                      Qua Email
                    </button>
                  </div>
                  <div className="input-group" onClick={() => setMethod(1)}>
                    <button className="btn-auth rounded bg-[#6D75A8]">
                      Qua Số Điện Thoại
                    </button>
                  </div>
                </Space>
              )}

              {method !== null && (
                <>
                  <Steps
                    current={step}
                    size="small"
                    style={{ marginBottom: 24 }}
                  >
                    <Steps.Step
                      title={method === 0 ? "Nhập Email" : "Nhập SĐT"}
                    />
                    <Steps.Step title="Nhập mã xác nhận" />
                  </Steps>

                  {step === 0 && (
                    <>
                      <div className="input-group mb-4">
                        <input
                          type={method === 0 ? "email" : "text"}
                          className="input"
                          placeholder={
                            method === 0 ? "Nhập email" : "Nhập số điện thoại"
                          }
                          value={method === 0 ? email : phone}
                          onChange={(e) =>
                            method === 0
                              ? setEmail(e.target.value)
                              : setPhone(e.target.value)
                          }
                        />
                      </div>
                      <button
                        className="btn-auth rounded"
                        onClick={handleNext}
                        disabled={
                          method === 0
                            ? !/\S+@\S+\.\S+/.test(email)
                            : phone.trim().length < 9
                        }
                      >
                        Tiếp tục
                      </button>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div className="text-left mb-2 text-sm text-gray-500">
                        Nhập mã xác nhận đã được gửi tới{" "}
                        {method === 0 ? email : phone}
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
                        <button
                          className="btn-auth rounded">
                          Xác nhận
                        </button>
                      </div>
                      <span className="text-center block mt-8">Bạn chưa được gửi mã ? <a className="text-blue-600 font-bold" href="/register">Gửi lại mã OTP</a></span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
