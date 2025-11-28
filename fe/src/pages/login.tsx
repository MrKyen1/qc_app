import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type MachineType = "Measure 2D" | "Measure 3D" | "Measure 2.5D";

interface LoginValues {
  username: string;
  password: string;
  machineType: MachineType;
}
function ForgotPass() {
  alert("Comming soon!");
}

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginValues>({
    username: "",
    password: "",
    machineType: "Measure 2D",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValid = useMemo(
    () => values.username.trim() !== "" && values.password.trim().length >= 1,
    [values]
  );

  const onChange =
    (field: keyof LoginValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    setErrorMsg(null);
    if (!isValid) {
      setErrorMsg("Vui lòng nhập Username và Password.");
      return;
    }

    try {
      setLoading(true);

      // 🔒 Logic tạm thời: hard-code user/pass
      const ok = values.username === "adm" && values.password === "1";
      await new Promise((res) => setTimeout(res, 400)); // giả lập chờ

      if (!ok) {
        throw new Error("Sai tài khoản hoặc mật khẩu (tạm thời: adm / 1).");
      }

      // Lưu thông tin tạm (tuỳ chọn)
      localStorage.setItem("token", "TEMP_TOKEN");
      localStorage.setItem("machineType", values.machineType);

      // Điều hướng sau login
      navigate("/home", { replace: true });
    } catch (err: any) {
      setErrorMsg(err?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2 gap-6 p-6 bg-white text-gray-900"
      onKeyDown={onKeyDown}
    >
      {/* Left: Title + Illustration placeholder */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Welcome to the QC Application
        </h1>
        <div className="w-full max-w-md">
          <img src="src/assets/Login.svg" sizes="10000"></img>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-6">Login Here</h2>

          {/* Username */}
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="adm"
            className="w-full rounded-md border border-gray-300 bg-gray-50 focus:bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            value={values.username}
            onChange={onChange("username")}
            autoComplete="username"
          />

          {/* Password + Forgot */}
          <div className="flex items-center justify-between mt-4">
            <label className="text-sm font-medium">Password</label>
            <a href="/#" className="text-sm textword" onClick={ForgotPass}>
              Forgot password
            </a>
          </div>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="1"
              className="w-full rounded-md border border-gray-300 bg-gray-50 focus:bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              value={values.password}
              onChange={onChange("password")}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              onClick={() => setShowPwd((s) => !s)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          {/* Machine type */}
          <label className="block text-sm font-medium mt-4 mb-1">
            Loại máy đo
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 focus:bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              value={values.machineType}
              onChange={onChange("machineType")}
            >
              {(
                ["Measure 2D", "Measure 3D", "Measure 2.5D"] as MachineType[]
              ).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="mt-4 rounded-md border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-items-center ">
            <button
              className="w-full mt-6 w-[100px] rounded-md bg-linear-to-bl from-violet-600 to-fuchsia-600 hover:bg-linear-to-bl from-violet-700 to-fuchsia-700 text-white font-semibold py-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handleSubmit}
              disabled={!isValid || loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>

          {/* Gợi ý trong dev */}
          <p className="mt-3 text-xs text-gray-500">
            Temporary credentials: <code>adm</code> / <code>1</code>
          </p>
        </div>
      </div>
    </div>
  );
}
