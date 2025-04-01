import { ThemedLayoutV2, Header, ThemedSiderV2 } from "@refinedev/antd";
import { Authenticated, ErrorComponent } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Routes, Route, Outlet } from "react-router";
import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "../pages/admin/blog-posts";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "../pages/admin/categories";
import { ForgotPassword } from "../pages/admin/forgotPassword";
import { Login } from "../pages/admin/login";
import { Register } from "../pages/admin/register";

function AdminRouters() {
  return (
    <Authenticated
      key="authenticated-inner"
      fallback={<CatchAllNavigate to="/login" />}
    >
      <ThemedLayoutV2
        Header={Header}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
      >
        <Outlet />
      </ThemedLayoutV2>
    </Authenticated>
  );
}

function ClientRouters() {
  return (
    <Authenticated key="authenticated-outer" fallback={<Outlet />}>
      <NavigateToResource />
    </Authenticated>
  );
}

function Routers() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route element={<AdminRouters />}>
        <Route index element={<NavigateToResource resource="blog_posts" />} />
        <Route path="/blog-posts">
          <Route index element={<BlogPostList />} />
          <Route path="create" element={<BlogPostCreate />} />
          <Route path="edit/:id" element={<BlogPostEdit />} />
          <Route path="show/:id" element={<BlogPostShow />} />
        </Route>
        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>

      {/* Client Routes */}
      <Route element={<ClientRouters />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default Routers;
