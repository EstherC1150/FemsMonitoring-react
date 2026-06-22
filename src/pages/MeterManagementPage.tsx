import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from "recharts";
import type { MeterManagementPageProps, ExpandedNodes } from "../types";

export function MeterManagementPage({ subId = "meterRef" }: MeterManagementPageProps) {
  // Tree state
  const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({
    root: true,
    plant1: true,
  });

  const toggleNode = (node: string) => {
    setExpandedNodes((prev) => ({ ...prev, [node]: !prev[node] }));
  };

  // Status bars
  const statusBars = [
    { label: "정상 가동", value: 1100, color: "#16a34a" },
    { label: "점검 필요", value: 72, color: "#f59e0b" },
    { label: "통신 장애", value: 58, color: "#ef4444" },
    { label: "교체 예정", value: 32, color: "#3b82f6" },
    { label: "미가동", value: 14, color: "#9ca3af" },
  ];

  // Donut values
  const donutSegments = [
    { label: "전력", value: 55, color: "#1f4c8f" },
    { label: "LNG", value: 18, color: "#f59e0b" },
    { label: "스팀", value: 15, color: "#14b8a6" },
    { label: "압축공기", value: 8, color: "#d1d5db" },
    { label: "기타", value: 4, color: "#9ca3af" },
  ];

  // Content Dispatcher
  return (
    <div className="flex flex-col gap-5 p-1">
      {subId === "meterRef" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
          {/* ① 조직 구성도 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col lg:col-span-3 overflow-hidden">
            <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              조직 구성도
            </div>
            <div className="flex flex-col gap-1 text-sm font-medium text-gray-700 overflow-y-auto pr-2">
              <div className="flex flex-col ml-1">
                <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleNode("root")}>
                  <span className="w-4 text-center text-gray-400 font-bold text-xs">{expandedNodes.root ? "▾" : "▶"}</span>
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                  <span>전체 사업장</span>
                </div>
                {expandedNodes.root && (
                  <div className="flex flex-col ml-4 border-l border-gray-100 pl-2">
                    <div className="flex flex-col ml-1">
                      <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${expandedNodes.plant1 ? 'bg-blue-100 text-blue-800 font-bold' : ''}`} onClick={() => toggleNode("plant1")}>
                        <span className="w-4 text-center text-gray-400 font-bold text-xs">{expandedNodes.plant1 ? "▾" : "▶"}</span>
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>제 1 공장(지곡)</span>
                      </div>
                      {expandedNodes.plant1 && (
                        <div className="flex flex-col ml-4 border-l border-gray-100 pl-2">
                          <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
                            <span className="w-4 text-center text-gray-400 font-bold text-xs"></span>
                            <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3h18v18H3z M9 3v18 M15 3v18 M3 9h18 M3 15h18" />
                            </svg>
                            <span>생산 1팀</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
                            <span className="w-4 text-center text-gray-400 font-bold text-xs"></span>
                            <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3h18v18H3z M9 3v18 M15 3v18 M3 9h18 M3 15h18" />
                            </svg>
                            <span>생산 2팀</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-gray-600">
                            <span className="w-4 text-center text-gray-400 font-bold text-xs"></span>
                            <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3h18v18H3z M9 3v18 M15 3v18 M3 9h18 M3 15h18" />
                            </svg>
                            <span>설비보전팀</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {["제 2 공장(성연)", "제 3 공장", "제 4 공장", "제 5 공장", "경합금공장"].map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="w-4 text-center text-gray-400 font-bold text-xs">▶</span>
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ② 계측기 관리 현황 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col lg:col-span-6">
            <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              계측기 관리 현황
            </div>
            <div className="flex flex-row items-center justify-between h-full gap-8">
              <div className="flex flex-col justify-start h-full pt-6 pl-2 min-w-[120px]">
                <div className="text-sm font-bold text-gray-700">총 계측기 수량</div>
                <div className="flex items-baseline gap-1 mt-2">
                  <div className="text-4xl font-extrabold text-gray-900 tracking-tight">1,276</div>
                  <div className="text-base font-bold text-gray-500">대</div>
                </div>
              </div>
              <div className="flex flex-col flex-1 h-[290px]">
                <div className="text-[13px] font-bold text-gray-700 text-center mb-2">상태별 계측기 현황</div>
                <div className="flex-1 w-full h-full flex items-end">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusBars} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#4b5563", fontWeight: "600" }} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v > 999 ? (v / 1000).toFixed(1) + "k" : v} tick={{ fontSize: 11, fill: "#4b5563", fontWeight: "600" }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                        labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "12px" }}
                        itemStyle={{ fontSize: "12px", fontWeight: "600" }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {statusBars.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* ③ 오른쪽: 도넛 + 에너지원 정보 */}
          <div className="flex flex-col gap-5 lg:col-span-3 h-full">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
              <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                에너지원별 계측기 분포
              </div>
              <div className="flex items-center justify-center gap-6 mt-2">
                <div className="w-[120px] h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={56}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {donutSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "11px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2">
                  {donutSegments.map((s, idx) => (
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700" key={idx}>
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }}></span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 주요 에너지원 정보 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-[13px] font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                주요 에너지원 정보
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">전력 (Electricity)</div>
                  <div className="text-[13px] text-gray-800 font-bold">0.4594 tCO₂/MWh &nbsp;<span className="text-gray-300">|</span>&nbsp; 0.229 TOE</div>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-bold text-gray-500 mb-1">LNG (Gas)</div>
                  <div className="text-[13px] text-gray-800 font-bold">2.178 kgCO₂/Nm³ &nbsp;<span className="text-gray-300">|</span>&nbsp; 1.055 TOE</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-1">스팀 (Steam)</div>
                  <div className="text-[13px] text-gray-800 font-bold">0.154 kgCO₂/kg &nbsp;<span className="text-gray-300">|</span>&nbsp; 외부수열</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subId === "meterLinked" && <LinkedTab />}
      {subId === "meterReport" && <ReportTab />}
      {subId === "meterAnalysis" && <AnalysisTab />}
    </div>
  );
}

// ── 연계데이터 조회 탭 ──────────────────────────────────────
function LinkedTab() {
  const dates = ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10"];
  const plan =   [2000,  2050,  1980,  2100,  2000,  2050,  0,     0,     2080,  1950];
  const actual = [1850,  1900,  1870,  1980,  1920,  1870,  0,     0,     1950,  1820];

  // Calendar
  const calRows = [];
  const startDow = 0;
  let day = 1;
  for (let row = 0; row < 5; row++) {
    const cells = [];
    for (let col = 0; col < 7; col++) {
      const cellDay = (row === 0 && col < startDow) || day > 31 ? null : day++;
      cells.push({ day: cellDay, col });
    }
    calRows.push(cells);
  }
  const workDays = new Set([2, 3, 4, 5, 6, 9, 10, 11, 12, 13]);

  // Bills
  const bills = [
    { month: "2026-02", energy: "전기", amount: "98,250,000", paid: true },
    { month: "2026-02", energy: "도시가스", amount: "27,150,000", paid: true },
    { month: "2026-03", energy: "전기", amount: "-", paid: false },
  ];

  // Weather Chart
  const temps = [9.2, 8.8, 9.5, 10.1, 11.2, 11.8, 10.0, 9.5, 11.0, 11.7];
  const solar = [14.5, 13.8, 15.2, 15.8, 16.2, 15.5, 12.5, 13.8, 15.9, 16.8];
  const tMin = 7, tMax = 13, sMin = 11, sMax = 17;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-5">
        <span className="text-sm font-bold text-gray-700">조회 기간</span>
        <input className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500" type="month" defaultValue="2026-03" />
        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">조회</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* ① 생산계획/실적 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            생산계획/실적 (MES 연계)
          </div>
          <div style={{ display: "flex", gap: "14px", justifyContent: "flex-end", fontSize: "11.5px", fontWeight: 700, color: "#4b5563", marginBottom: "2px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "28px", height: "10px", background: "#93c5fd", borderRadius: "2px", display: "inline-block" }}></span>계획 수량
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "28px", height: "10px", background: "#1f4c8f", borderRadius: "2px", display: "inline-block" }}></span>실적 수량
            </span>
          </div>
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={dates.map((d, i) => ({
                  name: d,
                  "계획 수량": plan[i] === 0 && actual[i] === 0 ? null : plan[i],
                  "실적 수량": plan[i] === 0 && actual[i] === 0 ? null : actual[i],
                }))} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => val > 0 ? (val / 1000).toFixed(1) + "k" : "0"} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "11px" }}
                  itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                />
                <Bar dataKey="계획 수량" fill="#93c5fd" radius={[2, 2, 0, 0]} />
                <Bar dataKey="실적 수량" fill="#1f4c8f" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ② 근무시간 캘린더 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            근무시간 (3월)
          </div>
          <table className="w-full text-center border-collapse table-fixed flex-1 h-full">
            <thead>
              <tr>
                <th className="text-red-600 font-bold border-b pb-2">일</th>
                <th className="font-bold border-b pb-2">월</th>
                <th className="font-bold border-b pb-2">화</th>
                <th className="font-bold border-b pb-2">수</th>
                <th className="font-bold border-b pb-2">목</th>
                <th className="font-bold border-b pb-2">금</th>
                <th className="text-blue-600 font-bold border-b pb-2">토</th>
              </tr>
            </thead>
            <tbody>
              {calRows.map((cells, rIdx) => (
                <tr key={rIdx}>
                  {cells.map((c, cIdx) => {
                    if (!c.day) return <td className="bg-gray-50/50 border border-gray-100 p-2" key={cIdx}></td>;
                    const isSun = c.col === 0, isSat = c.col === 6;
                    const hasWork = workDays.has(c.day);
                    const cls = `border border-gray-100 p-2 ${isSun ? "text-red-600 bg-red-50/30" : isSat ? "text-blue-600 bg-blue-50/30" : ""}`;
                    return (
                      <td className={cls} key={cIdx}>
                        <div className="text-sm font-bold mb-1">{c.day}</div>
                        {hasWork && <span className="text-xs font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">08-17</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ③ 전표 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            전표 현황 (고지서 조회)
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">청구월</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">에너지원</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600 text-right">청구금액(원)</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">상태</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800">{b.month}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800 font-semibold">{b.energy}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800 font-bold text-right">{b.amount}</td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <span className={b.paid ? "bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold" : "bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-md text-xs font-bold"}>
                      {b.paid ? "납부완료" : "청구예정"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* ④ 기상청 데이터 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4c8f" strokeWidth="2.5">
              <path d="M17.5 19a4.5 4.5 0 1 0 0-9H17A7 7 0 0 0 3 15" />
              <path d="M9 19h8" />
            </svg>
            기상청 데이터 (기온/습도/일사량)
          </div>
          <div className="flex items-center justify-end gap-4 text-xs font-bold text-gray-600 mb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }}></span>기온 (℃)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#14b8a6" }}></span>일사량 (MJ/m²)
            </span>
          </div>
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={dates.map((d, i) => ({
                  name: d,
                  "기온 (℃)": temps[i],
                  "일사량 (MJ/m²)": solar[i],
                }))} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} domain={[tMin - 1, tMax + 1]} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} domain={[sMin - 1, sMax + 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "11px" }}
                  itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                />
                <Line yAxisId="left" type="monotone" dataKey="기온 (℃)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="일사량 (MJ/m²)" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 리포트 탭 ──────────────────────────────────────────────
function ReportTab() {
  const days = ["1일", "5일", "10일", "15일", "20일", "25일", "30일"];
  const actual = [355, 362, 348, 344, 352, 345, null];
  const pred = [358, 360, 350, 346, 354, 348, 358];
  const eMin = 300, eMax = 410;

  // Solar Curve Chart
  const hours = ["06시", "09시", "12시", "15시", "18시"];
  const solarGen = [20, 350, 900, 700, 80];
  const sMax = 1000;

  // Energy bars
  const energyBars = [
    { label: "전력", value: 82, color: "#1f4c8f" },
    { label: "LNG", value: 42, color: "#f59e0b" },
    { label: "스팀", value: 28, color: "#14b8a6" },
    { label: "압축공기", value: 64, color: "#6b7280" },
  ];

  const reports = [
    { dt: "2026-03-31 13:45", type: "예측 분석", title: "2026년 3월 전력 사용량 및 태양광 생산량 예측 리포트", status: "완료", dl: "PDF", tagCls: "mm-tag-forecast" },
    { dt: "2026-03-31 09:00", type: "현황 분석", title: "에너지 분류 항목별 일일 현황 분석 (전력, LNG, 스팀)", status: "완료", dl: "Excel", tagCls: "mm-tag-actual" },
  ];

  return (
    <div className="flex flex-col">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
          <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span style={{ fontSize: "16px" }}>🟧</span>
            생성된 리포트: 2026년 3월 에너지 예측 분석
          </div>
          <div className="text-sm font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">기상청 데이터(일사량, 기온) 기반 예측 신뢰도: <strong className="text-blue-600">94.5%</strong></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 전력 사용량 예측 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700 mb-3 text-center">전력 사용량 예측</div>
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={days.map((d, i) => ({
                    name: d,
                    "실제 사용량 (MWh)": actual[i],
                    "AI 예측 (MWh)": pred[i],
                  }))} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <YAxis tickLine={false} axisLine={false} domain={[eMin, eMax]} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                    labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "11px" }}
                    itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                  />
                  <Line type="monotone" dataKey="실제 사용량 (MWh)" stroke="#1f4c8f" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="AI 예측 (MWh)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#4b5563", marginTop: "8px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "20px", height: "3px", background: "#1f4c8f", display: "inline-block" }}></span>실제 사용량 (MWh)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "20px", height: "3px", background: "#f59e0b", borderTop: "2px dashed #f59e0b", display: "inline-block" }}></span>AI 예측 (MWh)
              </span>
            </div>
          </div>

          {/* 태양광 생산량 예측 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700 mb-3 text-center">태양광 생산량 예측 (일일)</div>
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={hours.map((h, i) => ({
                    name: h,
                    "예측 발전량 (kWh)": solarGen[i],
                  }))} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="solGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity="0.25" />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, sMax]} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                    labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "11px" }}
                    itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                  />
                  <Area type="monotone" dataKey="예측 발전량 (kWh)" stroke="#16a34a" fillOpacity={1} fill="url(#solGrad)" strokeWidth={2} dot={{ r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#4b5563", marginTop: "8px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "20px", height: "3px", background: "#16a34a", display: "inline-block" }}></span>예측 발전량 (kWh)
              </span>
            </div>
          </div>

          {/* 에너지원별 분석 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700 mb-3 text-center">에너지원별 분석</div>
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyBars} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                    labelStyle={{ fontWeight: "700", color: "#111827", fontSize: "11px" }}
                    itemStyle={{ fontSize: "11px", fontWeight: "600" }}
                  />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {energyBars.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">최근 생성 리포트 목록</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">생성 일시</th>
              <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">분류</th>
              <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">리포트 제목</th>
              <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">상태</th>
              <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">다운로드</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-500">{r.dt}</td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${r.tagCls === 'mm-tag-forecast' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{r.type}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800 font-semibold">{r.title}</td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className="font-bold text-green-600 flex items-center gap-1">{r.status}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">&#128196; {r.dl}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

// ── 상관관계 분석 탭 ──────────────────────────────────────────────
function AnalysisTab() {
  const [activeSub, setActiveSub] = useState("corr");

  const points = [
    { x: 820, y: 710 }, { x: 855, y: 740 }, { x: 870, y: 755 }, { x: 890, y: 780 }, { x: 900, y: 770 },
    { x: 920, y: 790 }, { x: 940, y: 800 }, { x: 950, y: 810 }, { x: 960, y: 795 }, { x: 980, y: 820 },
    { x: 990, y: 830 }, { x: 1000, y: 845 }, { x: 1010, y: 820 }, { x: 1020, y: 860 }, { x: 1040, y: 870 },
    { x: 1050, y: 850 }, { x: 1070, y: 880 }, { x: 1080, y: 900 }, { x: 1100, y: 910 }, { x: 1120, y: 920 },
    { x: 1150, y: 930 }, { x: 1180, y: 940 }, { x: 1200, y: 960 }, { x: 1230, y: 970 }, { x: 1260, y: 980 },
    { x: 1290, y: 990 }, { x: 1320, y: 1000 }, { x: 1360, y: 1020 }, { x: 1400, y: 1040 }, { x: 1420, y: 1060 },
    { x: 1450, y: 1050 }, { x: 1470, y: 1080 }, { x: 1490, y: 1090 }, { x: 1520, y: 1100 }, { x: 1540, y: 1080 },
    { x: 1560, y: 1110 }, { x: 1570, y: 1120 }, { x: 1580, y: 1090 }, { x: 1590, y: 1130 }, { x: 1600, y: 1120 },
  ];

  const xMin = 700, xMax = 1700, yMin = 500, yMax = 1300;

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-gray-200 mb-5 overflow-x-auto">
        {[
          { id: "usage", label: "사용분석" },
          { id: "emission", label: "배출분석" },
          { id: "unit", label: "원단위분석" },
          { id: "corr", label: "상관관계 분석" },
        ].map((t) => (
          <div
            key={t.id}
            className={`px-5 py-3 text-sm font-bold text-gray-500 cursor-pointer border-b-2 transition-colors whitespace-nowrap ${activeSub === t.id ? "text-blue-600 border-blue-600" : "border-transparent hover:text-gray-800"}`}
            onClick={() => setActiveSub(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-5">
        <span className="text-sm font-bold text-gray-700">분석 조건</span>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 font-medium bg-white" defaultValue="default">
          <option value="default">전체 &gt; 사업장 &gt; 공장 &gt; 반 &gt; 계측기</option>
        </select>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 font-medium bg-white" defaultValue="elec">
          <option value="elec">전력 (kWh)</option>
          <option value="lng">LNG (m³)</option>
          <option value="steam">스팀 (Ton)</option>
        </select>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 font-medium bg-white" defaultValue="prod">
          <option value="prod">X축: 생산대수</option>
          <option value="time">X축: 가동시간</option>
          <option value="temp">X축: 온도</option>
        </select>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
          <input className="outline-none bg-transparent text-gray-700 font-medium" type="date" defaultValue="2026-01-01" />
          <span>~</span>
          <input className="outline-none bg-transparent text-gray-700 font-medium" type="date" defaultValue="2026-03-31" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
        <button className="px-5 py-1.5 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors md:ml-auto">분석</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* 산점도 패널 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="text-base font-bold text-gray-800 mb-4">상관관계 분석 (생산대수 vs 전력사용량)</div>
          <div className="flex items-center justify-end gap-4 text-xs font-bold text-gray-600 mb-4">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12">
                <circle cx="6" cy="6" r="5" fill="#3b82f6" fillOpacity="0.75" />
              </svg>
              실측 데이터
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="20" height="12">
                <line x1="0" y1="6" x2="20" y2="6" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
              </svg>
              회귀선 (Trend)
            </span>
          </div>
          <div className="w-full h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="생산대수" 
                  unit="EA" 
                  domain={[xMin, xMax]} 
                  tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "생산대수 (EA)", position: "insideBottom", offset: -5, style: { fontSize: 12, fill: "#374151", fontWeight: "700" } }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="전력 사용량" 
                  unit="kWh" 
                  domain={[yMin, yMax]} 
                  tick={{ fontSize: 10, fill: "#4b5563", fontWeight: "600" }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "전력 사용량 (kWh)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 12, fill: "#374151", fontWeight: "700" } }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: "3 3" }} 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Scatter name="실측 데이터" data={points} fill="#3b82f6" fillOpacity={0.75} shape="circle" />
                <Scatter 
                  name="회귀선 (Trend)" 
                  data={[
                    { x: xMin, y: Math.round(0.46 * xMin + 332) },
                    { x: xMax, y: Math.round(0.46 * xMax + 332) }
                  ]} 
                  fill="#f59e0b" 
                  line={{ stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '7 4' }}
                  shape={() => null}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 분석 요약 패널 */}
        <div className="w-full lg:w-80 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
          <div className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">분석 결과 요약</div>
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1">상관계수 (R²)</div>
            <div className="text-4xl font-extrabold text-blue-600">0.82</div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-3 before:bg-blue-600">해석</div>
            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              생산량과 전력 사용량 간에 <span className="font-bold text-gray-900 bg-yellow-100/50 px-1 rounded">강한 양의 상관관계</span>가 존재합니다.
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-3 before:bg-blue-600">인사이트</div>
            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              생산대수가 100대 증가할 때마다 전력 사용량은 약 <span className="font-bold text-gray-900 bg-yellow-100/50 px-1 rounded">50kWh</span> 증가하는 경향을 보입니다. 이상점(Outlier) 관리가 필요합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
