import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";

/** Hàm kiểm tra đã đăng nhập hay chưa (đơn giản: có token trong localStorage) */
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

/** Wrapper bảo vệ route: nếu chưa login → chuyển về /login */
function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* Protected routes: chỉ vào được khi đã login */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
