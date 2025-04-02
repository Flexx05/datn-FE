import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <nav>
        <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
          <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Trang chủ</Link></li>
          <li><Link to="/about" style={{ color: "white", textDecoration: "none" }}>Giới thiệu</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
