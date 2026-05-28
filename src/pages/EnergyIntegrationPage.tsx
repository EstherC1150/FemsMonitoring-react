import type { GaugeProps } from "../types";

function Gauge({ percent, color }: GaugeProps) {
  const r = 40;
  const c = Math.PI * r; // circumference of semicircle = PI * r
  const offset = c * (1 - percent / 100);

  return (
    <div style={{ position: "relative", width: 100, height: 50, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <svg viewBox="0 0 100 60" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <path 
          d="M 10 50 A 40 40 0 0 1 90 50" 
          fill="none" 
          stroke="#f1f5f9" 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        <path 
          d="M 10 50 A 40 40 0 0 1 90 50" 
          fill="none" 
          stroke={color} 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeDasharray={c} 
          strokeDashoffset={offset} 
          style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
        />
      </svg>
      <div style={{ fontSize: 16, fontWeight: 800, color: color, lineHeight: 1, marginBottom: 2 }}>
        {percent}%
      </div>
    </div>
  );
}

export function EnergyIntegrationPage() {
  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Section 1 */}
      <div>
        <div className="text-lg font-bold text-gray-800 mb-4">1) KPI 운영 현황 (에너지 목표량 종합실적)</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Electricity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-base font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004d99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              전력(Electricity)
            </div>
            <div className="flex items-center justify-between">
              <Gauge percent={82} color="#004d99" />
              <div className="flex flex-col gap-1 text-right">
                <div className="text-xs text-gray-500 font-medium">연간 목표 / 실적</div>
                <div className="text-sm font-bold text-gray-900 mb-1">18,000 / 14,760 MWh</div>
                <div className="text-xs text-gray-500 font-medium">누적 비용</div>
                <div className="text-sm font-bold text-gray-900 mb-1">21.5 억원</div>
              </div>
            </div>
          </div>
          
          {/* LNG */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-base font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              LNG(Gas)
            </div>
            <div className="flex items-center justify-between">
              <Gauge percent={45} color="#f59e0b" />
              <div className="flex flex-col gap-1 text-right">
                <div className="text-xs text-gray-500 font-medium">연간 목표 / 실적</div>
                <div className="text-sm font-bold text-gray-900 mb-1">18,500 / 8,325 Nm³</div>
                <div className="text-xs text-gray-500 font-medium">누적 비용</div>
                <div className="text-sm font-bold text-gray-900 mb-1">6.2 억원</div>
              </div>
            </div>
          </div>

          {/* Oil */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-base font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="M8 6h8" />
                <path d="M6 10h12" />
                <path d="M4 14h16" />
                <path d="M5 18h14" />
              </svg>
              유류(Oil)
            </div>
            <div className="flex items-center justify-between">
              <Gauge percent={12} color="#78350f" />
              <div className="flex flex-col gap-1 text-right">
                <div className="text-xs text-gray-500 font-medium">연간 목표 / 실적</div>
                <div className="text-sm font-bold text-gray-900 mb-1">10,000 / 1,200 L</div>
                <div className="text-xs text-gray-500 font-medium">누적 비용</div>
                <div className="text-sm font-bold text-gray-900 mb-1">0.8 억원</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <div className="text-lg font-bold text-gray-800 mb-4">2) 사업장 KPI 운영 현황 (대상공장 및 대상장비 현황)</div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">구분</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">장비</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">1공장</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">2공장</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">3공장</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">4공장</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">5공장</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">경합금</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">기타</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">계</th>
                <th className="bg-gray-50 text-gray-600 font-semibold px-4 py-3 border-b border-gray-200 text-center">용도 및 비고</th>
              </tr>
            </thead>
            <tbody>
              {/* 원동설비 Group */}
              <tr>
                <td rowSpan={5} className="px-4 py-3 border-b border-gray-100 text-center font-bold text-gray-800 bg-gray-50/50">원동설비<br />(Power)</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">에어 컴프레서</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">3</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">13</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">공장 압축공기</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">드라이어</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">10</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">공장 압축공기</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">냉각탑</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">8</td><td className="px-4 py-3 border-b border-gray-100 text-center">7</td><td className="px-4 py-3 border-b border-gray-100 text-center">8</td><td className="px-4 py-3 border-b border-gray-100 text-center">6</td><td className="px-4 py-3 border-b border-gray-100 text-center">8</td><td className="px-4 py-3 border-b border-gray-100 text-center">5</td><td className="px-4 py-3 border-b border-gray-100 text-center">4</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">46</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">공업용수/냉각</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">보일러</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">-</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">-</td><td className="px-4 py-3 border-b border-gray-100 text-center">-</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">-</td><td className="px-4 py-3 border-b border-gray-100 text-center">-</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">2</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">스팀/급탕 공급</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">펌프</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">15</td><td className="px-4 py-3 border-b border-gray-100 text-center">12</td><td className="px-4 py-3 border-b border-gray-100 text-center">16</td><td className="px-4 py-3 border-b border-gray-100 text-center">14</td><td className="px-4 py-3 border-b border-gray-100 text-center">18</td><td className="px-4 py-3 border-b border-gray-100 text-center">10</td><td className="px-4 py-3 border-b border-gray-100 text-center">11</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">96</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">공업용수/순환</td>
              </tr>

              {/* 공조설비 Group */}
              <tr>
                <td rowSpan={6} className="px-4 py-3 border-b border-gray-100 text-center font-bold text-gray-800 bg-gray-50/50">공조설비<br />(HVAC)</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">공조기</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">12</td><td className="px-4 py-3 border-b border-gray-100 text-center">10</td><td className="px-4 py-3 border-b border-gray-100 text-center">15</td><td className="px-4 py-3 border-b border-gray-100 text-center">12</td><td className="px-4 py-3 border-b border-gray-100 text-center">14</td><td className="px-4 py-3 border-b border-gray-100 text-center">8</td><td className="px-4 py-3 border-b border-gray-100 text-center">4</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">75</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">조립라인 냉방</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">배기팬</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">25</td><td className="px-4 py-3 border-b border-gray-100 text-center">22</td><td className="px-4 py-3 border-b border-gray-100 text-center">28</td><td className="px-4 py-3 border-b border-gray-100 text-center">20</td><td className="px-4 py-3 border-b border-gray-100 text-center">30</td><td className="px-4 py-3 border-b border-gray-100 text-center">15</td><td className="px-4 py-3 border-b border-gray-100 text-center">12</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">152</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">고열배기/환기</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">냉각탑</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">3</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">4</td><td className="px-4 py-3 border-b border-gray-100 text-center">3</td><td className="px-4 py-3 border-b border-gray-100 text-center">4</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">20</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">냉동기 냉각</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">펌프</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">3</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">3</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">4</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">17</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">냉각수/냉수 순환</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">냉동기/냉온수기</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">2</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center">1</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">10</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">조립라인 냉수</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-gray-100 text-center font-semibold text-gray-700 text-left">EHP (시스템에어컨)</td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">120</td><td className="px-4 py-3 border-b border-gray-100 text-center">110</td><td className="px-4 py-3 border-b border-gray-100 text-center">140</td><td className="px-4 py-3 border-b border-gray-100 text-center">115</td><td className="px-4 py-3 border-b border-gray-100 text-center">150</td><td className="px-4 py-3 border-b border-gray-100 text-center">100</td><td className="px-4 py-3 border-b border-gray-100 text-center">90</td><td className="px-4 py-3 border-b border-gray-100 text-center font-bold text-blue-600 bg-blue-50/30">825</td><td className="px-4 py-3 border-b border-gray-100 text-center text-xs text-gray-500 text-left">사무실 냉난방</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
