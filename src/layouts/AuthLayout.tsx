import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const AuthLayout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
