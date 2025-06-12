import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../auth/AuthContext ";
import { SidebarLink } from "./SidebarLink";

interface AccountForm {
    fullName: string;
    dob: string;
    phone: string;
    email: string;
    address: string;
}


const AccountSettings: React.FC = () => {
    const { user } = useAuth();
    const [form, setForm] = useState<AccountForm>({
        fullName: user?.fullName ?? "",
        dob: "2004-01-12",
        phone: "",
        email: user?.email ?? "",
        address: "",
    });

    const handleChange =
        <K extends keyof AccountForm>(field: K) =>
            (e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }));

    return (
        <div className="max-w-6xl mx-auto py-8  md:px-6 flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-56 space-y-3 mb-6 md:mb-0">
                 <SidebarLink />
            </aside>

            <main className="flex-1 space-y-12">
                <section>
                    <h1 className="text-2xl font-semibold mb-6">Thông tin tài khoản</h1>

                    <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Họ và tên */}
                        <div className="relative">
                            <label htmlFor="fullName" className="sr-only">
                                Họ và tên
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Họ và tên"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.fullName}
                                onChange={handleChange("fullName")}
                            />
                            <Pencil className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Ngày sinh */}
                        <div className="relative">
                            <label htmlFor="dob" className="sr-only">
                                Ngày sinh
                            </label>
                            <input
                                id="dob"
                                type="date"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.dob}
                                onChange={handleChange("dob")}
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className="relative">
                            <label htmlFor="phone" className="sr-only">
                                Số điện thoại
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Số điện thoại"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.phone}
                                onChange={handleChange("phone")}
                            />
                            <Pencil className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.email}
                                onChange={handleChange("email")}
                            />
                            <Pencil className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Địa chỉ (full‑width) */}
                        <div className="relative md:col-span-2">
                            <label htmlFor="address" className="sr-only">
                                Địa chỉ
                            </label>
                            <input
                                id="address"
                                type="text"
                                placeholder="Địa chỉ"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.address}
                                onChange={handleChange("address")}
                            />
                            <Pencil className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </section>
                {/* Delete account */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Xóa tài khoản</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Lưu ý: Khi xóa tài khoản toàn bộ thông tin sẽ bị mất. Các thông tin này sẽ
                        không thể khôi phục được.
                    </p>
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
                        onClick={() => console.log("TODO: handle delete account")}
                    >
                        Xóa tài khoản
                    </button>
                </section>
            </main>
        </div>
    );
};

export default AccountSettings;
