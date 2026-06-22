import { useState } from "react";
import { ResponsiveContainer, ComposedChart, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CustomYAxisLabel = ({ viewBox, value, fill = "#4b5563" }: any) => {
  const { x, y, height } = viewBox || {};
  const isLeft = x < 150;
  const finalAngle = isLeft ? -90 : 90;
  
  // Tab 1 uses wide label names: "전력 (kWh)" and "LNG/압축공기"
  const isWide = value === "전력 (kWh)" || value === "LNG/압축공기";
  
  // Calculate horizontal position relative to the axis line (x)
  const cx = isLeft ? (x - (isWide ? 52 : 36)) : (x + (isWide ? 52 : 36));
  const cy = y + (height || 0) / 2;
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <text
        transform={`rotate(${finalAngle})`}
        textAnchor="middle"
        fill={fill}
        fontSize={11}
        fontWeight="bold"
      >
        {value}
      </text>
    </g>
  );
};

const perfTabs = [
  { id: "usage", name: "사용량현황" },
  { id: "cost", name: "비용현황" },
  { id: "unit", name: "원단위현황" },
  { id: "standby_holiday", name: "대기 에너지 (휴일)" },
  { id: "standby_holiday_rank", name: "대기 에너지 순위 (휴일)" },
  { id: "standby_weekday", name: "대기 에너지 (평일심야)" },
  { id: "standby_weekday_rank", name: "대기 에너지 순위 (평일심야)" }
];

// --- SUB-COMPONENTS FOR EACH TAB ---

// 1. Usage Tab
function UsageStatusTab() {
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const pwrData = [12500, 12800, 12600, 11500, 8500, 8200, 12400, 12900, 13100, 12800, 11800, 8900, 8600, 12700, 13200];
  const lngData = [750, 780, 770, 750, 500, 480, 750, 790, 810, 780, 750, 500, 480, 780, 790];
  const airData = [1950, 2000, 1980, 1900, 1300, 1250, 1980, 2050, 2100, 2000, 1900, 1400, 1350, 2000, 2050];
  
  const chartData = days.map((day, idx) => ({
    name: `${day}일`,
    pwr: pwrData[idx],
    lng: lngData[idx],
    air: airData[idx]
  }));

  const pieData = [
    { name: "전력", value: 98.9, color: "#004d99" },
    { name: "LNG", value: 43.9, color: "#f59e0b" },
    { name: "압축공기", value: 32.9, color: "#14b8a6" },
    { name: "스팀", value: 26.3, color: "#6b7280" },
    { name: "유량", value: 17.5, color: "#854d0e" },
  ];

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-l-4 border-l-blue-900">
          <div className="text-sm font-bold text-gray-600 mb-1">총 관리 장비 (대)</div>
          <div className="text-2xl font-extrabold text-gray-900">1,276</div>
          <div className="text-xs text-gray-500 mt-1">&nbsp;</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004d99" strokeWidth="2">
            <rect x="2" y="4" width="20" height="6" rx="2"/><path d="M6 7h.01"/><rect x="2" y="14" width="20" height="6" rx="2"/><path d="M6 17h.01"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-l-4 border-l-orange-500">
          <div className="text-sm font-bold text-gray-600 mb-1">원동설비 (대)</div>
          <div className="text-2xl font-extrabold text-gray-900">172</div>
          <div className="text-xs text-gray-500 mt-1">(컴프레서, 펌프 등)</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-l-4 border-l-teal-500">
          <div className="text-sm font-bold text-gray-600 mb-1">공조설비 (대)</div>
          <div className="text-2xl font-extrabold text-gray-900">1,099</div>
          <div className="text-xs text-gray-500 mt-1">(공조기, EHP 등)</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
            <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-l-4 border-l-gray-500">
          <div className="text-sm font-bold text-gray-600 mb-1">금일 전력 사용량 (kWh)</div>
          <div className="text-2xl font-extrabold text-gray-900">12,450</div>
          <div className="text-xs text-gray-500 mt-1">&nbsp;</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-[2]">
          <div className="text-base font-bold text-gray-800 mb-4">일별 에너지 사용 추이 (복합)</div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 mb-2">
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#004d99" }}></div> 전력 (kWh)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#f59e0b" }}></div> LNG (m³)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#14b8a6" }}></div> 압축공기 (Nm³)</div>
          </div>
          
          <div className="w-full h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 75, left: 75, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  width={55}
                  domain={[8000, 14000]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="전력 (kWh)" angle={-90} />}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  width={55}
                  domain={[500, 2500]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="LNG/압축공기" angle={90} />}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Line yAxisId="left" type="monotone" dataKey="pwr" name="전력" stroke="#004d99" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="lng" name="LNG" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="air" name="압축공기" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 사용 비중</div>
          <div className="flex items-center justify-center gap-5 flex-1">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${((value / 219.5) * 100).toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-3 h-3 rounded-full" style={{ background: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">사업장별 에너지 사용량 상세 (5월 누계)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">구분</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">압축공기 (Nm³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">스팀 (Ton)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">콤프레서 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">유량 (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">합계 (TOE)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">452,100</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">12,500</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">54,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">1,250</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">15,400</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">45,200</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">125.4</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">385,400</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">10,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">48,500</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">980</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">12,100</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">38,500</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">108.2</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">150,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">5,400</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">21,300</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">450</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">5,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">15,800</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">42.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 2. Cost Tab
function CostStatusTab() {
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const pwrCost = [3200, 3100, 3300, 3100, 2800, 2750, 3400, 3450, 3300, 3250, 3100, 2900, 2850, 3500, 3550];
  const lngCost = [900, 850, 950, 850, 800, 750, 1000, 1050, 950, 900, 850, 800, 750, 1050, 1100];
  
  const chartData = days.map((day, idx) => ({
    name: `${day}일`,
    pwrCost: pwrCost[idx],
    lngCost: lngCost[idx]
  }));

  const pieData = [
    { name: "울산 사업장", value: 101.1, color: "#001f4d" },
    { name: "서산 사업장", value: 85.3, color: "#004d99" },
    { name: "성남 사업장", value: 33.5, color: "#93c5fd" },
  ];

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #111827" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">총 에너지 비용 (천원)</div>
          <div className="text-2xl font-extrabold text-gray-900">125,400 <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>(당월 누계)</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-green-600">전년 동월 대비: 2.5% 절감
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #004d99" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">전력 비용 (천원)</div>
          <div className="text-2xl font-extrabold text-gray-900">98,250 <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>(78.3%)</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-red-600">전월 대비: 1.2% 증가
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004d99" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #f59e0b" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">LNG 비용 (천원)</div>
          <div className="text-2xl font-extrabold text-gray-900">27,150 <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>(21.7%)</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-green-600">전월 대비: 4.8% 감소
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-[2]">
          <div className="text-base font-bold text-gray-800 mb-4">일별 에너지 비용 추이 (5월)</div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 mb-2">
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#004d99", background: "rgba(0,77,153,0.1)" }}></div> 전력 비용 (천원)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#f59e0b", background: "rgba(245,158,11,0.1)" }}></div> LNG 비용 (천원)</div>
          </div>
          
          <div className="w-full h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 15, right: -5, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPwrCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004d99" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#004d99" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorLngCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[0, 4000]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="pwrCost" name="전력 비용" stroke="#004d99" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPwrCost)" dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="lngCost" name="LNG 비용" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLngCost)" dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">사업장별 비용 점유율</div>
          <div className="flex items-center justify-center gap-5 flex-1">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${((value / 219.9) * 100).toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-3 h-3 rounded-full" style={{ background: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">사업장별 상세 비용 현황 (단위: 천원)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">구분</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 비용</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG 비용</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">합계</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">비중(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">45,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">12,500</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">57,700</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">46.0%</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">38,500</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">10,200</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">48,700</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">38.8%</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">15,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">3,800</td><td className="font-bold text-blue-700 bg-blue-50/30 px-4 py-3 border-b border-gray-100">19,000</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">15.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 3. Unit Tab
function UnitStatusTab() {
  const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const prodData = [42, 45, 48, 44, 46, 49, 52, 55, 51, 53, 56, 54]; 
  const pwrUnitTrend = [8.5, 8.3, 8.2, 8.0, 7.8, 8.1, 9.2, 9.5, 8.4, 8.0, 8.1, 8.6]; 
  const lngUnitTrend = [10.2, 9.8, 8.2, 7.3, 6.8, 6.4, 6.3, 6.2, 6.8, 7.8, 9.0, 10.5]; 
  
  const factories = ['울산 사업장', '서산 사업장', '성남 사업장'];
  const factoryPwrUnit = [10.0, 6.6, 8.2];
  const factoryColors = ['#dc2626', '#16a34a', '#001f4d'];

  const chartData = months.map((month, idx) => ({
    name: month,
    prod: prodData[idx],
    pwrUnit: pwrUnitTrend[idx],
    lngUnit: lngUnitTrend[idx]
  }));

  const barData = factories.map((fact, idx) => ({
    name: fact,
    value: factoryPwrUnit[idx],
    color: factoryColors[idx]
  }));

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-t-4 border-t-blue-900">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-bold text-gray-600 mb-1">전력 원단위 (kWh/EA)</div>
            <div className="text-xs font-bold text-gray-500">목표: 8.0 <span style={{ color: "#dc2626" }}>+ 2.5%</span></div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-extrabold text-gray-900">8.2</div>
            <div className="text-xs text-gray-500 mt-1">(평균)</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-t-4 border-t-orange-500">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-bold text-gray-600 mb-1">LNG 원단위 (m³/EA)</div>
            <div className="text-xs font-bold text-gray-500">목표: 0.30 <span style={{ color: "#16a34a" }}>- 6.7%</span></div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-extrabold text-gray-900">0.28</div>
            <div className="text-xs text-gray-500 mt-1">(평균)</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden border-t-4 border-t-teal-500">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-bold text-gray-600 mb-1">종합 원단위 (KTOE/EA)</div>
            <div className="text-xs font-bold text-gray-500">목표: 0.0025 <span style={{ color: "#16a34a" }}>- 4.0%</span></div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-extrabold text-gray-900">0.0024</div>
            <div className="text-xs text-gray-500 mt-1">(평균)</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-[2]">
          <div className="text-base font-bold text-gray-800 mb-4">월별 원단위 및 생산량 추이</div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 mb-2">
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#001f4d", background: "#fff" }}></div> 전력 원단위 (kWh/EA)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#f59e0b", background: "#fff" }}></div> LNG 원단위 (m³/EA)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 16, height: 12, background: "#cffafe", borderRadius: 2 }}></div> 생산량 (EA)</div>
          </div>
          <div className="w-full h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 15, right: 60, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  width={45}
                  domain={[0, 70]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="생산량 (EA)" angle={-90} />}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  width={45}
                  domain={[0, 14]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="원단위" angle={90} />}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar yAxisId="left" dataKey="prod" name="생산량" fill="#cffafe" radius={[2, 2, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="pwrUnit" name="전력 원단위" stroke="#001f4d" strokeWidth={2} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} />
                <Line yAxisId="right" type="monotone" dataKey="lngUnit" name="LNG 원단위" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">사업장별 전력 원단위 비교 (5월)</div>
          <div className="w-full flex-1 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 25, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[0, 15]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar dataKey="value" name="전력 원단위" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">사업장별 상세 원단위 현황 (2026년 5월)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">구분</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">생산량 (EA)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 사용량 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 원단위 (kWh/EA)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG 원단위 (m³/EA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">45,200</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">452,100</td><td className="px-4 py-3 border-b border-gray-100" style={{ color: "#dc2626", fontWeight: 700 }}>10.0</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">0.28</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">58,500</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">385,400</td><td className="px-4 py-3 border-b border-gray-100" style={{ color: "#16a34a", fontWeight: 700 }}>6.6</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">0.17</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">25,300</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">207,460</td><td className="px-4 py-3 border-b border-gray-100" style={{ color: "#001f4d", fontWeight: 700 }}>8.2</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">0.21</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 4. Standby Holiday Tab
function StandbyHolidayTab() {
  const dates = ['5/02(토)', '5/03(일)', '5/05(화)', '5/09(토)', '5/10(일)', '5/15(금)'];
  const pwrData = [420, 410, 430, 400, 415, 425];
  const lngData = [25, 23, 24, 21, 23, 24];
  const airData = [10, 9, 10, 9, 10, 9];
  
  const chartData = dates.map((date, idx) => ({
    name: date,
    pwr: pwrData[idx],
    lng: lngData[idx],
    air: airData[idx]
  }));

  const pieData = [
    { name: "전력", value: 105.5, color: "#001f4d" },
    { name: "LNG", value: 35.2, color: "#f59e0b" },
    { name: "압축공기", value: 44.0, color: "#14b8a6" },
    { name: "스팀", value: 24.2, color: "#6b7280" },
    { name: "기타", value: 11.0, color: "#e5e7eb" },
  ];

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #dc2626" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">총 대기전력 (휴일 평균)</div>
          <div className="text-2xl font-extrabold text-gray-900">452 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>kW</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-green-600">전월 대비: 3.5% 감소
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #f59e0b" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">평균 대기율 (부하 대비)</div>
          <div className="text-2xl font-extrabold text-gray-900">8.5 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>%</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-gray-500">목표: 7.0% <span style={{ color: "#dc2626" }}>+ 1.5%p</span></div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #14b8a6" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">연간 절감 가능 비용</div>
          <div className="text-2xl font-extrabold text-gray-900">45,200 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>천원</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-gray-500">예상 ROI <span style={{ color: "#14b8a6", fontWeight: 600 }}>1.8년</span></div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #4b5563" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">주요 대기 장비 (Top 10)</div>
          <div className="text-2xl font-extrabold text-gray-900">12 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>대</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-gray-500">개선 완료: 5대 <span style={{ color: "#4b5563" }}>(진행중 7대)</span></div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-[2]">
          <div className="text-base font-bold text-gray-800 mb-4">일별 대기에너지 발생 추이 (휴일)</div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 mb-2">
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#004d99" }}></div> 전력 (kW)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#f59e0b" }}></div> LNG (m³)</div>
            <div><div className="w-2.5 h-2.5 rounded-full border-2 inline-block mr-1.5 align-middle" style={{ borderColor: "#14b8a6" }}></div> 압축공기 (Nm³)</div>
          </div>
          
          <div className="w-full h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 60, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  width={45}
                  domain={[0, 500]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="전력/압축공기" angle={-90} />}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  width={45}
                  domain={[0, 30]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="LNG" angle={90} />}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Line yAxisId="left" type="monotone" dataKey="pwr" name="전력" stroke="#004d99" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="lng" name="LNG" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="left" type="monotone" dataKey="air" name="압축공기" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 대기 비중 (TOE)</div>
          <div className="flex items-center justify-center gap-5 flex-1">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${((value / 219.9) * 100).toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-3 h-3 rounded-full" style={{ background: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">사업장별 대기에너지 상세 현황 (5월 휴일 평균)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">구분</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">압축공기 (Nm³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">스팀 (Ton)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">콤프레서 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">유량 (m³)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">2,450</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">120</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">850</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">12.5</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">450</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">250</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">1,850</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">85</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">620</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">8.2</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">320</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">180</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">980</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">45</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">310</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">4.5</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">180</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">95</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5. Standby Holiday Rank Tab
function StandbyHolidayRankTab() {
  const worstData = [125.4, 98.2, 85.0, 78.5, 72.1, 65.0, 62.3, 58.0, 55.4, 51.2];
  const worstLabels = ['Comp #3', 'Fan #2', 'Comp #1', 'Boiler #1', 'Fan #5', 'Comp #2', 'Pump A', 'Comp #4', 'Air Dry A', 'Exh Fan #1'];
  
  const topData = [0.8, 1.2, 1.5, 1.8, 2.1, 2.3, 2.5, 2.8, 2.9, 3.1];
  const topLabels = ['LED #1', 'Pump D', 'Valve #2', 'Panel B', 'Switch C', 'IoT Gate', 'LED #3', 'IoT Node', 'LED #2', 'IOT Sw #1'];

  const worstChartData = worstLabels.map((lbl, idx) => ({
    name: lbl,
    value: worstData[idx]
  }));

  const topChartData = topLabels.map((lbl, idx) => ({
    name: lbl,
    value: topData[idx]
  }));

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #ef4444", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#ef4444"><circle cx="12" cy="12" r="10"/><path d="M12 8v4" stroke="white" strokeWidth="3" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="white"/></svg>
            <div>
              <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Worst 10 평균 대기전력 (kW)</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>
                85.4 <span style={{ fontSize: 16, color: "#ef4444", fontWeight: 700 }}>(집중 관리 필요)</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
            전체 대기전력의 <strong style={{ color: "#111827" }}>42%</strong> 차지<br />
            주요 원인: 노후 컴프레서
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #22c55e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#22c55e"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>TOP 10 평균 대기전력 (kW)</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>
                2.1 <span style={{ fontSize: 16, color: "#22c55e", fontWeight: 700 }}>(우수 관리)</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
            전체 대기전력의 <strong style={{ color: "#111827" }}>1.5%</strong> 차지<br />
            최근 인버터 교체 효과
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">Worst 10 대기전력 발생 장비 (kW)</div>
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={worstChartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" domain={[0, 140]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11, fill: "#4b5563" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar dataKey="value" name="대기전력" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">TOP 10 대기전력 우수 장비 (kW)</div>
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topChartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" domain={[0, 3.5]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11, fill: "#4b5563" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar dataKey="value" name="대기전력" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">대기에너지 발생 상세 순위 (Worst 5)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">순위</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">장비명</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">사업장</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">압축공기 (Nm³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">스팀 (Ton)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>1</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Main Air Compressor #3</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>125.4</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">450.2</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>2</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Boiler Pump Unit A</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>98.2</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">12.5</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">4.5</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>3</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Cooling Tower Fan #2</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>85.0</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>4</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>HVAC Chiller #1</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>78.5</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>5</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Exhaust Fan Unit B</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>72.1</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 6. Standby Weekday Tab
function StandbyWeekdayTab() {
  const hours = ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
  const pwrData = [420, 390, 380, 375, 370, 372, 380, 410, 550];
  const lngData = [21, 20, 19, 17, 17, 17.5, 19, 24, 45]; 
  const airData = [415, 400, 395, 388, 386, 390, 408, 450, 540]; 

  const chartData = hours.map((hour, idx) => ({
    name: hour,
    pwr: pwrData[idx],
    lng: lngData[idx],
    air: airData[idx]
  }));

  const pieData = [
    { name: "전력", value: 81.0, color: "#1e3a8a" },
    { name: "압축공기", value: 53.0, color: "#00c49f" },
    { name: "LNG", value: 34.0, color: "#f59e0b" },
    { name: "스팀", value: 15.0, color: "#0ea5e9" },
    { name: "기타", value: 5.5, color: "#e5e7eb" },
  ];

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #3b82f6" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">총 대기전력 (평일심야 평균)</div>
          <div className="text-2xl font-extrabold text-gray-900">385 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>kW</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-green-600" style={{ color: "#16a34a", fontSize: 12, marginTop: 4 }}>전월 대비: 3.8% 개선</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #06b6d4" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">평균 대기율 (부하 대비)</div>
          <div className="text-2xl font-extrabold text-gray-900">6.2 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>%</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-red-600" style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>목표 5.0% 대비: +1.2%p 초과</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
            <line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
          </svg>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #f59e0b" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">연간 절감 가능 비용</div>
          <div className="text-2xl font-extrabold text-gray-900">32,500 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>천원</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-gray-500" style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>예상 ROI: 2.1년</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #64748b" }}>
          <div className="text-sm font-bold text-gray-600 mb-1">주요 대기 장비 (Top 10)</div>
          <div className="text-2xl font-extrabold text-gray-900">8 <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>대</span></div>
          <div className="text-xs font-bold mt-2 flex items-center gap-1 text-gray-500" style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>개선 완료: 6대, 진행 중: 2대</div>
          <svg className="absolute top-5 right-5 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-[2]">
          <div className="text-base font-bold text-gray-800 mb-4">시간대별 대기에너지 추이 (22시 ~ 익일 06시)</div>
          <div className="flex flex-wrap items-center text-xs font-semibold text-gray-600 mb-2" style={{ justifyContent: "flex-end", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#4b5563" }}><div style={{ width: 12, height: 12, border: "2px solid #1e3a8a", background: "#fff" }}></div> 전력 (kWh)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#4b5563" }}><div style={{ width: 12, height: 12, border: "2px solid #f59e0b", background: "#fff" }}></div> LNG (m³)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#4b5563" }}><div style={{ width: 12, height: 12, border: "2px solid #00c49f", background: "#fff" }}></div> 압축공기 (Nm³)</div>
          </div>
          
          <div className="w-full h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 60, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  width={45}
                  domain={[350, 560]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="전력/압축공기" angle={-90} />}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  width={45}
                  domain={[15, 46]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={<CustomYAxisLabel value="LNG" angle={90} />}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Line yAxisId="left" type="monotone" dataKey="pwr" name="전력" stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="lng" name="LNG" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                <Line yAxisId="left" type="monotone" dataKey="air" name="압축공기" stroke="#00c49f" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 대기 비중 (TOE)</div>
          <div className="flex items-center justify-center gap-5 flex-1">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${((value / 188.5) * 100).toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-3 h-3 rounded-full" style={{ background: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">사업장별 대기에너지 상세 현황 (3월 평일심야 평균)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ background: "#f8fafc", borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">구분</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">압축공기 (Nm³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">스팀 (Ton)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">1,850</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">95</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">620</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">8.5</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">1,420</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">68</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">450</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">5.2</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50/50 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">1,150</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">52</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">380</td><td className="px-4 py-3 border-b border-gray-100 text-gray-800">4.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 7. Standby Weekday Rank Tab
function StandbyWeekdayRankTab() {
  const worstData = [110.5, 88.4, 75.0, 62.0, 55.4, 50.0, 48.0, 45.0, 42.0, 40.0];
  const worstLabels = ['Pump Station #2', 'Chiller Unit C', 'Comp #5', 'Fan #12', 'Boiler B', 'Exh Fan #3', 'Chiller B', 'Pump Unit D', 'Comp #6', 'Dryer Unit A'];
  
  const topData = [0.5, 0.8, 1.2, 1.5, 1.9, 2.1, 2.3, 2.4, 2.6, 2.8];
  const topLabels = ['Sensor #1', 'LED Room A', 'IoT Gateway', 'Valve C', 'Sub-Meter #3', 'Switch #2', 'IoT Sw #4', 'IoT Sw #2', 'LED Room B', 'Sensor #2'];

  const worstChartData = worstLabels.map((lbl, idx) => ({
    name: lbl,
    value: worstData[idx]
  }));

  const topChartData = topLabels.map((lbl, idx) => ({
    name: lbl,
    value: topData[idx]
  }));

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #ef4444", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L1 21h22L12 2z" fill="#ef4444"/><path d="M11 16h2v2h-2zm0-6h2v4h-2z" fill="#ffffff"/></svg>
            <div>
              <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Worst 10 평균 대기전력 (심야)</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#ef4444" }}>
                72.5 <span style={{ fontSize: 16, color: "#111827", fontWeight: 700 }}>kW</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
            전체 심야 대기의 <strong style={{ color: "#ef4444" }}>38%</strong> 차지<br />
            주요 원인: 구형 펌프 및 냉동기
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative overflow-hidden" style={{ borderLeft: "6px solid #22c55e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="#22c55e"/></svg>
            <div>
              <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>TOP 10 평균 대기전력 (심야)</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#22c55e" }}>
                1.8 <span style={{ fontSize: 16, color: "#111827", fontWeight: 700 }}>kW</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
            전체 심야 대기의 <strong style={{ color: "#22c55e" }}>1.2%</strong> 차지<br />
            최근 고효율 센서 교체 효과
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">Worst 10 대기전력 발생 장비 (평일심야)</div>
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={worstChartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" domain={[0, 120]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: "#4b5563" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar dataKey="value" name="대기전력" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">TOP 10 대기전력 우수 장비 (평일심야)</div>
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topChartData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" domain={[0, 3.0]} tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: "#4b5563" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar dataKey="value" name="대기전력" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
        <div className="text-base font-bold text-gray-800 mb-4">대기에너지 발생 상세 순위 (Worst 5 - 평일심야)</div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">순위</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">장비명</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">사업장</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">전력 (kWh)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">LNG (m³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">압축공기 (Nm³)</th>
                <th className="bg-gray-50 px-4 py-3 font-semibold text-gray-600 border-b border-gray-200">스팀 (Ton)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>1</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Pump Station #2</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>110.5</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>2</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Chiller Unit C</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>88.4</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>3</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Comp #5</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">울산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>75.0</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>4</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Fan #12</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">성남 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>62.0</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100" style={{ color: "#ef4444", fontWeight: 800 }}>5</td>
                <td className="font-semibold text-gray-700 px-4 py-3 border-b border-gray-100" style={{ fontWeight: 600 }}>Boiler B</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">서산 사업장</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800" style={{ fontWeight: 700 }}>55.4</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">10.2</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">-</td>
                <td className="px-4 py-3 border-b border-gray-100 text-gray-800">2.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PERFORMANCE COMPONENT ---
export function EnergyPerformancePage() {
  const [activeTab, setActiveTab] = useState<string>("usage");

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-8 border-b border-gray-200 overflow-x-auto h-[45px] shrink-0 scrollbar-hide">
        {perfTabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center text-[15px] font-semibold cursor-pointer relative whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab.id 
                ? "text-blue-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-blue-600 after:rounded-t-sm" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-[500px]">
        {activeTab === "usage" && <UsageStatusTab />}
        {activeTab === "cost" && <CostStatusTab />}
        {activeTab === "unit" && <UnitStatusTab />}
        {activeTab === "standby_holiday" && <StandbyHolidayTab />}
        {activeTab === "standby_holiday_rank" && <StandbyHolidayRankTab />}
        {activeTab === "standby_weekday" && <StandbyWeekdayTab />}
        {activeTab === "standby_weekday_rank" && <StandbyWeekdayRankTab />}
      </div>
    </div>
  );
}
