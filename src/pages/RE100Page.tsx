import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

export function RE100Page() {
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const barsPPA = [200, 210, 205, 215, 220, 230, 240, 235, 225, 220, 215, 210];
  const barsREC = [100, 105, 110, 115, 120, 125, 140, 135, 125, 120, 115, 110];
  const barsSelf = [50, 52, 45, 48, 55, 50, 45, 48, 55, 52, 45, 50];
  const lineCost = [135, 138, 136, 139, 142, 145, 148, 147, 144, 142, 139, 138];

  const chartData = months.map((m, i) => ({
    name: m,
    ppa: barsPPA[i],
    rec: barsREC[i],
    self: barsSelf[i],
    cost: lineCost[i]
  }));

  const pieData = [
    { name: "PPA", value: 45, color: "#2563eb" },
    { name: "REC", value: 25, color: "#f59e0b" },
    { name: "자가발전", value: 20, color: "#16a34a" },
    { name: "기타", value: 10, color: "#7c3aed" }
  ];

  return (
    <div className="flex flex-col gap-5 p-1">
      {/* 1. Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* RE100 이행률 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-bold text-gray-700 mb-2">RE100 이행률</div>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-600">45%</div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="text-gray-500">목표: 60%</div>
              <div className="text-gray-800">이행량: <b className="text-blue-600">45,000 MWh</b></div>
            </div>
          </div>
        </div>

        {/* 총 이행 비용 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-bold text-gray-700">총 이행 비용 (누계)</div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-red-600">₩ 45.2 <span className="text-sm font-normal text-gray-500">억원</span></div>
              <div className="text-xs text-gray-500">전년 대비 <span className="text-red-500 font-bold">↑2.5%</span> (이행량 증가)</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                <path d="M3 12A9 3 0 0 0 21 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* 총 비용 대비 절감액 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-bold text-gray-700">총 비용 대비 절감액</div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-green-600">₩ 3.5 <span className="text-sm font-normal text-gray-500">억원</span></div>
              <div className="text-xs text-gray-500">일반 전력 구매 대비</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                <path d="M16 11h.01" />
              </svg>
            </div>
          </div>
        </div>

        {/* 자가발전 투자 효율 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-bold text-gray-700">자가발전 투자 효율</div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-blue-600">12.5 <span className="text-sm font-normal text-gray-500">% (ROI)</span></div>
              <div className="text-xs text-gray-500">투자비 회수기간: 7.2년</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 월별 추이 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:col-span-2">
          <div className="text-base font-bold text-gray-800 mb-4">월별 RE100 이행 비용 추이 (백만원)</div>
          <div className="flex items-center justify-end gap-4 text-xs text-gray-600 font-semibold mb-4">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2563eb" }}></span>PPA 비용</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }}></span>REC 구매</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#16a34a" }}></span>자가발전 투자/운영</span>
            <span className="flex items-center gap-1 ml-2">
              <span className="w-2 h-2 rounded-full border border-red-600 bg-white z-10 relative left-1.5"></span>
              <span className="w-4 h-0.5" style={{ background: "#dc2626" }}></span>
              단위 비용 (원/kWh)
            </span>
          </div>
          
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: -5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis 
                  yAxisId="left"
                  domain={[0, 500]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "비용 (백만원)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fill: "#6b7280", fontWeight: "bold" } }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 160]}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "단가 (원)", angle: 90, position: "insideRight", offset: 10, style: { fontSize: 11, fill: "#6b7280", fontWeight: "bold" } }}
                />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Bar yAxisId="left" dataKey="ppa" name="PPA 비용" stackId="a" fill="#2563eb" barSize={24} />
                <Bar yAxisId="left" dataKey="rec" name="REC 구매" stackId="a" fill="#f59e0b" barSize={24} />
                <Bar yAxisId="left" dataKey="self" name="자가발전 투자/운영" stackId="a" fill="#16a34a" barSize={24} />
                <Line yAxisId="right" type="monotone" dataKey="cost" name="단위 비용 (원/kWh)" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 파이 차트 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col items-center">
          <div className="text-base font-bold text-gray-800 mb-4 self-start">이행 수단별 비용 비중</div>
          <div className="flex items-center justify-center gap-5 flex-1 w-full mt-4">
            <div className="w-[150px] h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <span key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <span className="w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
                  {entry.name} ({entry.value}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-2 p-5">
        <div className="text-base font-bold text-gray-800 mb-4">이행 수단별 상세 현황 (누계)</div>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr style={{ borderTop: "2px solid #004d99" }}>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[16%]">구분</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[16%]">이행량 (MWh)</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[16%]">비중 (%)</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[16%]">총 비용 (백만원)</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[16%]">단위 비용 (원/kWh)</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center w-[20%]">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-gray-800">제3자 PPA</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">20,250</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">45.0%</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">2,835</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">140</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center text-blue-600 font-bold">장기 계약</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-gray-800">자가발전 (태양광)</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">11,250</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">25.0%</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">562</td>
                <td className="px-4 py-3 border-b border-gray-100 text-right font-medium text-gray-700">50</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center text-green-600 font-bold">설비 보유</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
