import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import  ProductCategory  from "./pages/ProductCategory";
import  DetailProduct  from "./pages/DetailProduct";
import  DetailCart  from "./pages/DetailCart";
import  BlogCategory  from "./pages/BlogCategory";
import  DetailBlog  from "./pages/DetailBlog";
import { UserInfo } from "./pages/Userinfo";
import ProtectedRoute from "./auth/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import Order from "./pages/Order";




const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Products */}
          <Route path="/products" element={< ProductCategory />} />
          <Route path="/products/detail" element={< DetailProduct />} />
          <Route path="/products/cart" element={< DetailCart />} />
          {/* Blogs */}
          <Route path="/blogs" element={< BlogCategory />} />
          <Route path="/blogs/detail" element={< DetailBlog />} />
          <Route path="/user/info" element={<ProtectedRoute>< UserInfo /></ProtectedRoute>} />
          <Route path="/user/changepassword" element={<ProtectedRoute>< ChangePassword /></ProtectedRoute>} />
          <Route path="/user/order" element={<ProtectedRoute>< Order /></ProtectedRoute>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
