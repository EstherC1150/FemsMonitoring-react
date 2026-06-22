import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Line } from "recharts";

export function RE100RenewablePage() {
  // 1) Solar Data
  const solarGen = [800, 850, 950, 1100, 1200, 1150, 500, 320, 900, 950, 1000, 1150, 1200, 1100, 950, 850, 750, 450, 350, 850, 950, 1000, 1050, 1150, 1250, 1150, 950, 850, 900, 1050, 1100];
  const solarUse = [800, 820, 900, 950, 980, 950, 480, 300, 850, 880, 950, 980, 1000, 950, 850, 800, 700, 400, 320, 800, 850, 900, 950, 980, 1000, 950, 850, 800, 850, 900, 950];

  const solarData = solarGen.map((gen, idx) => ({
    day: `${idx + 1}일`,
    gen: gen,
    use: solarUse[idx]
  }));

  // 2) PPA Data
  const ppaUse = [1200, 1300, 1400, 1450, 1500, 1100, 850, 1300, 1400, 1550, 1600, 1650, 1700, 1600, 1500, 1400, 1200, 950, 1350, 1450, 1500, 1600, 1750, 1900, 2100, 1800, 1650, 1500, 1400, 1550, 1600];

  const ppaData = ppaUse.map((val, idx) => ({
    day: `${idx + 1}일`,
    value: val
  }));

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* 1. 태양광 자가발전 현황 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            태양광 자가발전 현황
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-yellow-50 border-yellow-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 최대 발전</span>
              <span className="text-base font-bold text-yellow-600">1,250 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border border-gray-100 bg-gray-50">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 최소 발전</span>
              <span className="text-base font-bold text-gray-800">320 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-blue-50 border-blue-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 평균 발전</span>
              <span className="text-base font-bold text-blue-600">845 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-green-50 border-green-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">월 누계</span>
              <span className="text-base font-bold text-green-600">25.4 MWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-orange-50 border-orange-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">전체 구매량 (연간)</span>
              <span className="text-base font-bold text-orange-600">85.2 MWh</span>
            </div>
          </div>
        </div>

        <div className="relative mt-2">
          <div className="flex items-center justify-end gap-4 text-xs font-semibold text-gray-600 mb-3">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#f59e0b", background: "white" }}></div> 일별 발전량 (kWh)</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#0ea5e9", background: "white" }}></div> 자가 소비량 (kWh)</div>
          </div>
          
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={solarData} margin={{ top: 10, right: -5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSolarGen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 1500]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="gen" name="일별 발전량" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorSolarGen)" dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="use" name="자가 소비량" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. PPA 현황 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            PPA (재생에너지 구매) 현황
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-green-50 border-green-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 최대 사용</span>
              <span className="text-base font-bold text-green-600">2,100 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border border-gray-100 bg-gray-50">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 최소 사용</span>
              <span className="text-base font-bold text-gray-800">850 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-blue-50 border-blue-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">일 평균 사용</span>
              <span className="text-base font-bold text-blue-600">1,450 kWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-green-50 border-green-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">월 총 구매</span>
              <span className="text-base font-bold text-green-600">43.5 MWh</span>
            </div>
            <div className="flex flex-col justify-center px-4 py-2 rounded-lg border bg-purple-50 border-purple-100">
              <span className="text-xs font-semibold text-gray-500 mb-1">전체 구매량 (연간)</span>
              <span className="text-base font-bold text-blue-600">154.2 MWh</span>
            </div>
          </div>
        </div>

        <div className="relative mt-2">
          <div className="flex items-center justify-end gap-4 text-xs font-semibold text-gray-600 mb-3">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#16a34a", background: "white" }}></div> PPA 일별 사용량 (kWh)</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#ef4444", background: "white" }}></div> 계약 한도 (kWh)</div>
          </div>
          
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ppaData} margin={{ top: 10, right: -5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 2200]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="value" name="PPA 일별 사용량" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorPpa)" dot={{ r: 3, fill: "#16a34a", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <ReferenceLine y={2100} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" label={{ value: "계약 한도 (2,100 kWh)", position: "top", fill: "#ef4444", fontSize: 11, fontWeight: "bold" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
