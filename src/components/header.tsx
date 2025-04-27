import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/image/logo.png';
import Bag from '../assets/image/bag.svg';
import BagDark from '../assets/image/bag-dark.svg';

import { SearchOutlined, UserOutlined } from "@ant-design/icons";

interface HeaderProps {
  isHome: boolean;
  isPage: string;
}

const Header: React.FC<HeaderProps> = ({ isHome, isPage }) => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return; // Chỉ áp dụng trên trang chủ

    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 200) {
          header.classList.remove("active");
          header.classList.add("header-fixed");
        } else {
          header.classList.add("active");
          header.classList.remove("header-fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header className={isHome ? 'active' : ''}>
      <div className="container mx-auto">
        <div className="flex">
          <a href="/" className="w-4/12">
            <img src={Logo} alt="" className='logo' />
          </a>
          <ul className='ul-menu w-8/12'>
            <li>
              <Link to="/" className={isPage === '/' ? 'active' : ''} >Trang chủ</Link>
            </li>
            <li><a href="">Giới thiệu</a></li>
            <li><a href="">Sản phẩm</a></li>
            <li><a href="">Tin tức</a></li>
            <li><a href="">Liên hệ</a></li>
            <li className='right-item'>
              <div className='header-icon'><a href=""><SearchOutlined /></a></div>
              <div className='header-icon'><a href=""><UserOutlined /></a></div>
              <div className='header-icon'>
                <a href="" className='cart-icon' data-count="10">
                  <img src={Bag} className="bag-light"/>
                  <img src={BagDark} className="bag-dark"/>
                  <small className='cart-sml'>Giỏ hàng</small>
                </a></div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
