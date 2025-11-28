import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaExit } from "react-icons";
import { FaSignOutAlt } from "react-icons/fa";
function about() {
  const navigate = useNavigate();

  const username = useMemo(
    () => localStorage.getItem("username") || "User",
    []
  );

  const logout = () => {
    localStorage.removeItem("token");
    // Nếu trước đó bạn có lưu username, có thể xoá luôn:
    // localStorage.removeItem('username');
    navigate("/login", { replace: true });
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-12 bg-gray-400 text-white flex items-center justify-between px-4">
        <nav className="flex gap-4 text-sm">
          <Link className="hover:underline" to="/home">
            Home
          </Link>
          <Link className="hover:underline" to="/about">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome <b>{username}</b>,
          </span>
          <button
            onClick={logout}
            className="text-red-600 w-5 h-5 hover:text-red-700"
          >
            <FaSignOutAlt className="w-5 h-5"></FaSignOutAlt>
          </button>
        </div>
      </header>
      <main>
        <h2>Hello</h2>
      </main>
    </div>
  );
}

export default about;
