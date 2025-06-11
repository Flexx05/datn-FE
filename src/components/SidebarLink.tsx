import { Link } from "react-router-dom";

interface SidebarLinkProps {
    active?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ active = false}) => (
    <>
        <Link to="/user/info"
            type="button"
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition
      ${active ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
            <span>Tài khoản</span>
            <span className="ml-3 text-lg font-semibold">&gt;</span>
        </Link>
        <Link to="/user/changepassword"
            type="button"
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition
      ${active ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
            <span>Đổi mật khẩu</span>
            <span className="ml-3 text-lg font-semibold">&gt;</span>
        </Link>
    </>
);