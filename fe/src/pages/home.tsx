import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeClock from "../components/ui/TimeClock";
/* ------------------ Demo data ------------------ */
type Row = {
  id: number;
  name: string;
  pcname: string;
  robotLocation: string;
  batFile: string;
  pic: string;
  version: string;
  status: "Finished" | "Running" | "NG" | "OK";
  detailProblem?: string;
  lastRuntime?: string;
};

const initialRows: Row[] = [
  {
    id: 10,
    name: "RPA_bbbca",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_bbbca.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "NG",
    detailProblem: "Automation",
  },
  {
    id: 9,
    name: "RPA_bbbxa",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_bbbxa.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "NG",
    detailProblem: "Automation",
  },
  {
    id: 8,
    name: "RPA_bbbx",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_x.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "NG",
    detailProblem: "Automation",
  },
  {
    id: 7,
    name: "RPA_xaz",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_xz.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "OK",
  },
  {
    id: 6,
    name: "RPA_yyy",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_xx.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "OK",
  },
  {
    id: 5,
    name: "RPA_xxx",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_xxx.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "Finished",
  },
  {
    id: 4,
    name: "RPA_aaa",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_aaa.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "Finished",
  },
  {
    id: 3,
    name: "RPA_bbb",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_bbb.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "Finished",
  },
  {
    id: 2,
    name: "RPA_ccc",
    pcname: "PEM/ECHS5",
    robotLocation: "\\\\svcm-veng\\Test share\\7",
    batFile: "RPA_ccc.bat",
    pic: "Kien-Ngo",
    version: "1.0.1",
    status: "Finished",
  },
  {
    id: 1,
    name: "RPA_xxx",
    pcname: "PEM/ECHS5",
    robotLocation: "D:\\Users\\v139384\\Desktop",
    batFile: "testAppRealtime.bat",
    pic: "v139384",
    version: "1.0.1",
    status: "Finished",
    detailProblem: "NG",
    lastRuntime: "2025-11-24T03:48:18Z",
  },
];

/* ------------------ SVG Line Chart (simple) ------------------ */
function SimpleLineChart({
  labels,
  series,
  height = 260,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
}: {
  labels: string[];
  series: { label: string; color: string; data: number[] }[];
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}) {
  const width = 900; // sẽ dàn đều theo w-full bằng CSS
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const maxY = Math.max(0, ...series.flatMap((s) => s.data));
  const stepX = labels.length > 1 ? innerW / (labels.length - 1) : innerW;
  const yScale = (v: number) => innerH - (v / (maxY || 1)) * innerH;

  return (
    <svg width={width} height={height} className="w-full">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <rect width={innerW} height={innerH} fill="#fff" stroke="#e5e7eb" />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={0}
            x2={innerW}
            y1={innerH * (1 - t)}
            y2={innerH * (1 - t)}
            stroke="#eee"
          />
        ))}
        {series.map((s, idx) => {
          const d = s.data
            .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${yScale(v)}`)
            .join(" ");
          return (
            <g key={idx}>
              <path d={d} fill="none" stroke={s.color} strokeWidth={2.4} />
              {s.data.map((v, i) => (
                <circle
                  key={i}
                  cx={i * stepX}
                  cy={yScale(v)}
                  r={3}
                  fill={s.color}
                />
              ))}
            </g>
          );
        })}
        {labels.map((lab, i) => (
          <text
            key={lab + i}
            x={i * stepX}
            y={innerH + 20}
            fontSize={10}
            textAnchor="middle"
            fill="#6b7280"
          >
            {lab}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* ------------------ Home ------------------ */
export default function Home() {
  const navigate = useNavigate();

  const username = useMemo(
    () => localStorage.getItem("username") || "Admin",
    []
  );
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<Row[]>(initialRows);

  /* Left sidebar controls (nếu bạn cần) */
  const [sourcePath, setSourcePath] = useState("\\\\svcm-veng\\test\\source");
  const [krsw, setKrsw] = useState("KRSW-1");
  const [soQuanLy, setSoQuanLy] = useState("0001");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [
        r.id,
        r.name,
        r.pcname,
        r.robotLocation,
        r.batFile,
        r.pic,
        r.version,
        r.status,
        r.detailProblem,
        r.lastRuntime,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, query]);

  const chartLabels = filtered.map((r) => r.name);
  const chartDataset1 = filtered.map((_, i) => Math.max(0, 10 - i));
  const chartDataset2 = filtered.map((_, i) => Math.max(0, 8 - i * 0.8));

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const startMeasure = () => {
    alert(
      `Start Measure:\nPath: ${sourcePath}\nKRSW: ${krsw}\nSố quản lý: ${soQuanLy}`
    );
  };
  const resetSidebar = () => {
    setSourcePath("\\\\svcm-veng\\test\\source");
    setKrsw("KRSW-1");
    setSoQuanLy("0001");
  };

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-white">
      {/* ========= LEFT NAV (hover để hiện) ========= */}
      <aside
        className="
          peer fixed left-0 top-0 bottom-0
          w-2 hover:w-[280px] overflow-hidden
          transition-all duration-300 ease-out
          bg-gray-100 border-r border-gray-200
        "
      >
        {/* Nội dung chỉ hiện khi hover */}
        <div className="opacity-0 pointer-events-none hover:opacity-100 hover:pointer-events-auto transition-opacity duration-200 p-3 h-full flex flex-col">
          <h2 className="text-sm font-semibold mb-3">Left Nav</h2>

          <label className="text-xs font-medium">Nhập đường link gốc</label>
          <input
            type="text"
            value={sourcePath}
            onChange={(e) => setSourcePath(e.target.value)}
            placeholder="\\server\\share\\source"
            className="mt-1 mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex gap-2 mb-3">
            <button
              className="flex-1 rounded-md bg-indigo-600 text-white text-xs px-2 py-1 hover:bg-indigo-700"
              onClick={startMeasure}
            >
              Start Measure
            </button>
            <button
              className="rounded-md bg-gray-200 text-gray-800 text-xs px-2 py-1 hover:bg-gray-300"
              onClick={resetSidebar}
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="text-xs font-medium">KRSW</label>
              <select
                value={krsw}
                onChange={(e) => setKrsw(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-400"
              >
                {["KRSW-1", "KRSW-2", "KRSW-3"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium">Số quản lý</label>
              <input
                type="text"
                value={soQuanLy}
                onChange={(e) => setSoQuanLy(e.target.value)}
                placeholder="0001"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs font-semibold mb-2">Leader activities</p>
            <div className="flex flex-col gap-2">
              <button className="rounded-md bg-amber-500 text-white text-xs px-2 py-1 hover:bg-amber-600">
                Check
              </button>
              <button className="rounded-md bg-emerald-600 text-white text-xs px-2 py-1 hover:bg-emerald-700">
                Approve
              </button>
              <button className="rounded-md bg-rose-600 text-white text-xs px-2 py-1 hover:bg-rose-700">
                Return
              </button>
            </div>
          </div>

          <div className="mt-auto border-t pt-2 text-[11px] text-gray-500">
            {new Date().toLocaleString()}
          </div>
        </div>
      </aside>

      {/* ========= MAIN CONTENT (full khi không hover) ========= */}
      <div
        className="
          ml-0 peer-hover:ml-[280px]
          transition-all duration-300 ease-out
          h-screen flex flex-col min-w-0
        "
      >
        {/* Top bar */}
        <header className="h-12 bg-red-700 text-white px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/home" className="text-sm font-semibold">
              Home
            </Link>
            <Link to="/about" className="text-xs hover:underline">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Xin chào <b>{username}</b>.
            </span>
            <button
              onClick={logout}
              className="rounded-md bg-white text-red-700 px-3 py-1 text-sm hover:bg-red-50"
            >
              Exit
            </button>
          </div>
        </header>

        {/* Search bar (thay “Main Content”) */}
        <div className="p-3 border-b flex items-center gap-2">
          <label className="text-sm font-medium">Search:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo ID, NAME, STATUS, PCNAME..."
            className="flex-1 max-w-xl rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            className="rounded-md bg-gray-200 text-gray-800 text-sm px-3 py-2 hover:bg-gray-300"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        </div>

        {/* Main area fills screen height; table scrolls only */}
        <main className="flex-1 min-h-0 p-3">
          <div className="grid grid-rows-[1fr_auto] gap-4 h-full">
            {/* ======= Table (scroll + sticky header) ======= */}
            <section className="min-h-0 overflow-y-auto rounded-md border border-gray-200 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr className="text-left">
                    <th className="px-3 py-2 border-b w-12">ID</th>
                    <th className="px-3 py-2 border-b">NAME</th>
                    <th className="px-3 py-2 border-b">PCNAME</th>
                    <th className="px-3 py-2 border-b">ROBOTLOCATION</th>
                    <th className="px-3 py-2 border-b">BATFILE</th>
                    <th className="px-3 py-2 border-b">PIC</th>
                    <th className="px-3 py-2 border-b">VERSION</th>
                    <th className="px-3 py-2 border-b">STATUS</th>
                    <th className="px-3 py-2 border-b">DETAILPROBLEM</th>
                    <th className="px-3 py-2 border-b">LASTRUNTIME</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 py-2 border-b">{r.id}</td>
                      <td className="px-3 py-2 border-b">{r.name}</td>
                      <td className="px-3 py-2 border-b">{r.pcname}</td>
                      <td
                        className="px-3 py-2 border-b max-w-[320px] truncate"
                        title={r.robotLocation}
                      >
                        {r.robotLocation}
                      </td>
                      <td className="px-3 py-2 border-b">{r.batFile}</td>
                      <td className="px-3 py-2 border-b">{r.pic}</td>
                      <td className="px-3 py-2 border-b">{r.version}</td>
                      <td className="px-3 py-2 border-b">
                        <span
                          className={
                            "px-2 py-1 rounded text-xs " +
                            (r.status === "NG"
                              ? "bg-red-100 text-red-700"
                              : r.status === "OK"
                                ? "bg-green-100 text-green-700"
                                : r.status === "Finished"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-blue-100 text-blue-700")
                          }
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 border-b">
                        {r.detailProblem || "-"}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {r.lastRuntime || "-"}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        className="px-3 py-8 text-center text-gray-500"
                        colSpan={10}
                      >
                        Không tìm thấy kết quả cho “{query}”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            {/* ======= Chart (không scroll) ======= */}
            <section className="rounded-md border border-gray-200 bg-white p-3">
              <h3 className="text-sm font-semibold mb-2">Biểu đồ phân tích</h3>
              <SimpleLineChart
                labels={chartLabels}
                series={[
                  { label: "Dataset 1", color: "#ef4444", data: chartDataset1 },
                  { label: "Dataset 2", color: "#60a5fa", data: chartDataset2 },
                ]}
                height={260}
              />
              <div className="mt-2 flex gap-6 text-xs">
                <span className="inline-flex items-center gap-2">
                  <i className="inline-block w-3 h-0.5 bg-red-500" /> Dataset 1
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="inline-block w-3 h-0.5 bg-blue-400" /> Dataset 2
                </span>
              </div>
            </section>
          </div>
        </main>

        <footer className="right-0">
          {" "}
          <TimeClock></TimeClock>
        </footer>
      </div>
    </div>
  );
}
