import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPage = location.pathname;
  return (
    <>
    <Header isHome={isHome} isPage = {isPage} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
