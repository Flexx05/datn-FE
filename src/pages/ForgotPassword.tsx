import { AuthHeader } from "../components/authHeader"
import Background from '../assets/image/shoes.svg';
import { useState } from "react";
import { Space, Steps } from "antd";

export const ForgotPassword = () => {

    const [method, setMethod] = useState<number | null>(null);
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const handleNext = () => {
        setStep(1);
    };

    const handleBack = () => {
        setStep(0);
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
                                    <Steps current={step} size="small" style={{ marginBottom: 24 }}>
                                        <Steps.Step title={method === 0 ? "Nhập Email" : "Nhập SĐT"} />
                                        <Steps.Step title="Nhập mã xác nhận" />
                                    </Steps>

                                    {step === 0 && (
                                        <>
                                            <div className="input-group mb-4">
                                                <input
                                                    type={method === 0 ? "email" : "text"}
                                                    className="input"
                                                    placeholder={method === 0 ? "Nhập email" : "Nhập số điện thoại"}
                                                    value={method === 0 ? email : phone}
                                                    onChange={(e) =>
                                                        method === 0 ? setEmail(e.target.value) : setPhone(e.target.value)
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
                                                Nhập mã xác nhận đã được gửi tới {method === 0 ? email : phone}
                                            </div>
                                            <div className="input-group mb-4">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Nhập mã xác nhận"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    maxLength={6}
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <button className="btn-auth bg-gray-400" onClick={handleBack}>
                                                    Quay lại
                                                </button>
                                                <button
                                                    className="btn-auth rounded"
                                                    disabled={otp.trim().length !== 6}
                                                >
                                                    Xác nhận
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}