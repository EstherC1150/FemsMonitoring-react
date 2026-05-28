import { useState } from "react";

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
  
  const chartW = 800;
  const chartH = 200;
  const padX = 60;
  const padYTop = 20;
  const padYBot = 30;
  const drawH = chartH - padYTop - padYBot;
  
  const pwrMin = 8000, pwrMax = 14000;
  const otherMin = 500, otherMax = 2500;
  
  const getPwrY = (v: number) => padYTop + drawH - ((v - pwrMin) / (pwrMax - pwrMin)) * drawH;
  const getOtherY = (v: number) => padYTop + drawH - ((v - otherMin) / (otherMax - otherMin)) * drawH;
  const getX = (i: number) => padX + (i / (days.length - 1)) * (chartW - 2 * padX);

  const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getPwrY(v)}`).join(' ');
  const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getOtherY(v)}`).join(' ');
  const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getOtherY(v)}`).join(' ');

  const gridRatios = [0, 0.25, 0.5, 0.75, 1];

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
          
          <div className="relative w-full h-[260px] mt-2">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
              {gridRatios.map((ratio, idx) => {
                const topPos = padYTop + drawH * (1 - ratio);
                const pwrVal = pwrMin + (pwrMax - pwrMin) * ratio;
                const otherVal = otherMin + (otherMax - otherMin) * ratio;
                return (
                  <g key={idx}>
                    <line x1={padX} y1={topPos} x2={chartW - padX} y2={topPos} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={padX - 10} y={topPos + 4} textAnchor="end" fontSize="11" fill="#6b7280">{pwrVal.toLocaleString()}</text>
                    <text x={chartW - padX + 10} y={topPos + 4} textAnchor="start" fontSize="11" fill="#6b7280">{otherVal.toLocaleString()}</text>
                  </g>
                );
              })}
              
              <path d={pwrPath} fill="none" stroke="#004d99" strokeWidth="2.5" />
              <path d={lngPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <path d={airPath} fill="none" stroke="#14b8a6" strokeWidth="2.5" />

              {/* Data points */}
              {pwrData.map((v, i) => <circle key={`pwr-${i}`} cx={getX(i)} cy={getPwrY(v)} r="3" fill="#ffffff" stroke="#004d99" strokeWidth="2" />)}
              {lngData.map((v, i) => <circle key={`lng-${i}`} cx={getX(i)} cy={getOtherY(v)} r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />)}
              {airData.map((v, i) => <circle key={`air-${i}`} cx={getX(i)} cy={getOtherY(v)} r="3" fill="#ffffff" stroke="#14b8a6" strokeWidth="2" />)}

              {/* X Axis labels */}
              {days.map((d, i) => (
                <text key={i} x={getX(i)} y={chartH - 5} textAnchor="middle" fontSize="11" fill="#6b7280">{d}일</text>
              ))}

              <text x="15" y={padYTop + drawH / 2} transform={`rotate(-90 15,${padYTop + drawH / 2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="bold">전력</text>
              <text x={chartW - 15} y={padYTop + drawH / 2} transform={`rotate(90 ${chartW - 15},${padYTop + drawH / 2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="bold">LNG/압축공기</text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 사용 비중</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <svg viewBox="0 0 100 100" width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#004d99" strokeWidth="26" strokeDasharray="98.9 219.9" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="26" strokeDasharray="43.9 219.9" strokeDashoffset="-98.9" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#14b8a6" strokeWidth="26" strokeDasharray="32.9 219.9" strokeDashoffset="-142.8" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" strokeWidth="26" strokeDasharray="26.3 219.9" strokeDashoffset="-175.7" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#854d0e" strokeWidth="26" strokeDasharray="17.5 219.9" strokeDashoffset="-202.0" />
            </svg>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#004d99" }}></div>전력</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }}></div>LNG</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#14b8a6" }}></div>압축공기</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#6b7280" }}></div>스팀</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#854d0e" }}></div>유량</div>
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
  
  const chartW = 800;
  const chartH = 200;
  const padX = 60;
  const padYTop = 20;
  const padYBot = 30;
  const drawH = chartH - padYTop - padYBot;
  
  const maxCost = 4000;
  const minCost = 0;
  
  const getY = (v: number) => padYTop + drawH - ((v - minCost) / (maxCost - minCost)) * drawH;
  const getX = (i: number) => padX + (i / (days.length - 1)) * (chartW - 2 * padX);

  const pwrAreaPath = `M ${getX(0)} ${getY(0)} ` + pwrCost.map((v, i) => `L ${getX(i)} ${getY(v)}`).join(' ') + ` L ${getX(days.length-1)} ${getY(0)} Z`;
  const lngAreaPath = `M ${getX(0)} ${getY(0)} ` + lngCost.map((v, i) => `L ${getX(i)} ${getY(v)}`).join(' ') + ` L ${getX(days.length-1)} ${getY(0)} Z`;
  
  const pwrLinePath = pwrCost.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`).join(' ');
  const lngLinePath = lngCost.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`).join(' ');

  const gridRatios = [0, 0.25, 0.5, 0.75, 1];

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
          
          <div className="relative w-full h-[260px] mt-2">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
              {gridRatios.map((ratio, idx) => {
                const topPos = padYTop + drawH * (1 - ratio);
                const val = minCost + (maxCost - minCost) * ratio;
                return (
                  <g key={idx}>
                    <line x1={padX} y1={topPos} x2={chartW - padX} y2={topPos} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={padX - 10} y={topPos + 4} textAnchor="end" fontSize="11" fill="#6b7280">{val.toLocaleString()}</text>
                  </g>
                );
              })}

              <path d={pwrAreaPath} fill="rgba(0, 77, 153, 0.08)" stroke="none" />
              <path d={lngAreaPath} fill="rgba(245, 158, 11, 0.08)" stroke="none" />
              
              <path d={pwrLinePath} fill="none" stroke="#004d99" strokeWidth="2.5" />
              <path d={lngLinePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

              {pwrCost.map((v, i) => <circle key={`pwr-${i}`} cx={getX(i)} cy={getY(v)} r="3" fill="#ffffff" stroke="#004d99" strokeWidth="2" />)}
              {lngCost.map((v, i) => <circle key={`lng-${i}`} cx={getX(i)} cy={getY(v)} r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />)}

              {days.map((d, i) => (
                <text key={i} x={getX(i)} y={chartH - 5} textAnchor="middle" fontSize="11" fill="#6b7280">{d}일</text>
              ))}
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">사업장별 비용 점유율</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <svg viewBox="0 0 100 100" width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#001f4d" strokeWidth="26" strokeDasharray="101.1 219.9" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#004d99" strokeWidth="26" strokeDasharray="85.3 219.9" strokeDashoffset="-101.1" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#93c5fd" strokeWidth="26" strokeDasharray="33.5 219.9" strokeDashoffset="-186.4" />
            </svg>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#001f4d" }}></div>울산 사업장</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#004d99" }}></div>서산 사업장</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#93c5fd" }}></div>성남 사업장</div>
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

  // Mixed Chart calculations
  const cw1 = 800, ch1 = 200;
  const chartStartX1 = 60; 
  const chartEndX1 = cw1 - 40;
  const dw1 = chartEndX1 - chartStartX1;
  const dh1 = ch1 - 30 - 30;
  const slotW1 = dw1 / months.length;
  
  const getX1 = (i: number) => chartStartX1 + (i + 0.5) * slotW1;
  const getY1Pwr = (v: number) => 30 + dh1 - ((v - 5) / (14 - 5)) * dh1; 
  const getY1Lng = (v: number) => 30 + dh1 - ((v - 0) / (14 - 0)) * dh1; 
  const getBarH = (v: number) => (v / 70) * dh1;

  const pwrTrendPath = pwrUnitTrend.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX1(i)} ${getY1Pwr(v)}`).join(' ');
  const lngTrendPath = lngUnitTrend.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX1(i)} ${getY1Lng(v)}`).join(' ');

  // Bar Chart calculations
  const cw2 = 400, ch2 = 200;
  const chartStartX2 = 50;
  const chartEndX2 = cw2 - 20;
  const dw2 = chartEndX2 - chartStartX2;
  const dh2 = ch2 - 20 - 30;
  const slotW2 = dw2 / factories.length;
  
  const getY2 = (v: number) => 20 + dh2 - (v / 12) * dh2; 
  const getX2 = (i: number) => chartStartX2 + (i + 0.5) * slotW2;

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
          <div className="relative w-full h-[260px] mt-2">
            <svg viewBox={`0 0 ${cw1} ${ch1}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[5, 6, 8, 10, 12, 14].map((v, idx) => {
                const y = getY1Pwr(v);
                return (
                  <g key={idx}>
                    <line x1={chartStartX1} y1={y} x2={chartEndX1} y2={y} stroke="#f3f4f6" strokeWidth="1"/>
                    <text x={chartStartX1 - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}

              {/* Bars */}
              {prodData.map((v, i) => {
                const x = getX1(i) - 12;
                const h = getBarH(v);
                return <rect key={`bar-${i}`} x={x} y={30 + dh1 - h} width="24" height={h} fill="#cffafe" rx="2" />;
              })}

              <path d={pwrTrendPath} fill="none" stroke="#001f4d" strokeWidth="2" />
              <path d={lngTrendPath} fill="none" stroke="#f59e0b" strokeWidth="2" />
              
              {pwrUnitTrend.map((v, i) => <circle key={`pwr-${i}`} cx={getX1(i)} cy={getY1Pwr(v)} r="3.5" fill="#ffffff" stroke="#001f4d" strokeWidth="2" />)}
              {lngUnitTrend.map((v, i) => <circle key={`lng-${i}`} cx={getX1(i)} cy={getY1Lng(v)} r="3.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />)}

              {months.map((m, i) => (
                <text key={i} x={getX1(i)} y={ch1 - 5} textAnchor="middle" fontSize="11" fill="#4b5563">{m}</text>
              ))}

              <text x="15" y={30 + dh1 / 2} transform={`rotate(-90 15,${30 + dh1 / 2})`} textAnchor="middle" fontSize="10" fill="#9ca3af">전력 원단위</text>
              <text x={cw1 - 15} y={30 + dh1 / 2} transform={`rotate(90 ${cw1 - 15},${30 + dh1 / 2})`} textAnchor="middle" fontSize="10" fill="#9ca3af">LNG 원단위</text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">사업장별 전력 원단위 비교 (5월)</div>
          <div style={{ height: 200, marginTop: 10 }}>
            <svg viewBox={`0 0 ${cw2} ${ch2}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[0, 2, 4, 6, 8, 10, 12].map((v, idx) => {
                const y = getY2(v);
                return (
                  <g key={idx}>
                    <line x1={chartStartX2} y1={y} x2={chartEndX2} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={chartStartX2 - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}

              {factoryPwrUnit.map((v, i) => {
                const x = getX2(i) - 22;
                const h = (v / 12) * dh2;
                return <rect key={`fbar-${i}`} x={x} y={20 + dh2 - h} width="44" height={h} fill={factoryColors[i]} />;
              })}

              {factories.map((f, i) => (
                <text key={i} x={getX2(i)} y={ch2 - 5} textAnchor="middle" fontSize="10" fill="#4b5563">{f}</text>
              ))}
            </svg>
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
  
  const chartW = 800;
  const chartH = 200;
  const padX = 60;
  const padYTop = 20;
  const padYBot = 30;
  const drawH = chartH - padYTop - padYBot;
  
  const pwrMin = 0, pwrMax = 500;
  const lngMin = 0, lngMax = 30;
  const airMin = 0, airMax = 15;
  
  const getPwrY = (v: number) => padYTop + drawH - ((v - pwrMin) / (pwrMax - pwrMin)) * drawH;
  const getLngY = (v: number) => padYTop + drawH - ((v - lngMin) / (lngMax - lngMin)) * drawH;
  const getAirY = (v: number) => padYTop + drawH - ((v - airMin) / (airMax - airMin)) * drawH;
  const getX = (i: number) => padX + (i / (dates.length - 1)) * (chartW - 2 * padX);

  const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getPwrY(v)}`).join(' ');
  const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getLngY(v)}`).join(' ');
  const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getAirY(v)}`).join(' ');

  const gridRatios = [0, 0.25, 0.5, 0.75, 1];

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
          
          <div className="relative w-full h-[260px] mt-2">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
              {gridRatios.map((ratio, idx) => {
                const topPos = padYTop + drawH * (1 - ratio);
                const pwrVal = pwrMin + (pwrMax - pwrMin) * ratio;
                const lngVal = lngMin + (lngMax - lngMin) * ratio;
                return (
                  <g key={idx}>
                    <line x1={padX} y1={topPos} x2={chartW - padX} y2={topPos} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={padX - 10} y={topPos + 4} textAnchor="end" fontSize="11" fill="#6b7280">{pwrVal.toLocaleString()}</text>
                    <text x={chartW - padX + 10} y={topPos + 4} textAnchor="start" fontSize="11" fill="#6b7280">{lngVal.toLocaleString()}</text>
                  </g>
                );
              })}

              <path d={pwrPath} fill="none" stroke="#004d99" strokeWidth="2.5" />
              <path d={lngPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <path d={airPath} fill="none" stroke="#14b8a6" strokeWidth="2.5" />

              {pwrData.map((v, i) => <circle key={`pwr-${i}`} cx={getX(i)} cy={getPwrY(v)} r="3.5" fill="#ffffff" stroke="#004d99" strokeWidth="2" />)}
              {lngData.map((v, i) => <circle key={`lng-${i}`} cx={getX(i)} cy={getLngY(v)} r="3.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />)}
              {airData.map((v, i) => <circle key={`air-${i}`} cx={getX(i)} cy={getAirY(v)} r="3.5" fill="#ffffff" stroke="#14b8a6" strokeWidth="2" />)}

              {dates.map((d, i) => (
                <text key={i} x={getX(i)} y={chartH - 5} textAnchor="middle" fontSize="11" fill="#6b7280">{d}</text>
              ))}

              <text x="15" y={padYTop + drawH/2} transform={`rotate(-90 15,${padYTop + drawH/2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="bold">전력/압축공기</text>
              <text x={chartW - 15} y={padYTop + drawH/2} transform={`rotate(90 ${chartW - 15},${padYTop + drawH/2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="bold">LNG</text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 대기 비중 (TOE)</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <svg viewBox="0 0 100 100" width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#001f4d" strokeWidth="26" strokeDasharray="105.5 219.9" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="26" strokeDasharray="35.2 219.9" strokeDashoffset="-105.5" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#14b8a6" strokeWidth="26" strokeDasharray="44.0 219.9" strokeDashoffset="-140.7" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" strokeWidth="26" strokeDasharray="24.2 219.9" strokeDashoffset="-184.7" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="26" strokeDasharray="11.0 219.9" strokeDashoffset="-208.9" />
            </svg>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#001f4d" }}></div>전력</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }}></div>LNG</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#14b8a6" }}></div>압축공기</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#6b7280" }}></div>스팀</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><div className="w-3 h-3 rounded-full" style={{ background: "#e5e7eb" }}></div>기타</div>
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
  const drawW = 380;
  const drawH = 200;
  const padX = 80;
  const padY = 20;
  const barH = 20;

  const worstData = [125.4, 98.2, 85.0, 78.5, 72.1, 65.0, 62.3, 58.0, 55.4, 51.2];
  const worstLabels = ['Comp #3', 'Fan #2', 'Comp #1', 'Boiler #1', 'Fan #5', 'Comp #2', 'Pump A', 'Comp #4', 'Air Dry A', 'Exh Fan #1'];
  
  const topData = [0.8, 1.2, 1.5, 1.8, 2.1, 2.3, 2.5, 2.8, 2.9, 3.1];
  const topLabels = ['LED #1', 'Pump D', 'Valve #2', 'Panel B', 'Switch C', 'IoT Gate', 'LED #3', 'IoT Node', 'LED #2', 'IOT Sw #1'];

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
          <div style={{ height: 250, position: "relative" }}>
            <svg viewBox="0 0 500 250" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[0, 20, 40, 60, 80, 100, 120, 140].map((v, idx) => {
                const x = padX + (v / 140) * drawW;
                return (
                  <g key={idx}>
                    <line x1={x} y1={padY} x2={x} y2={padY + drawH} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={x} y={padY + drawH + 20} textAnchor="middle" fontSize="11" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}
              {worstData.map((v, i) => {
                const w = (v / 140) * drawW;
                return <rect key={`wbar-${i}`} x={padX} y={padY + i * barH} width={w} height={barH} fill="#ef4444" />;
              })}
              {worstLabels.map((lbl, i) => (
                <text key={i} x={padX - 10} y={padY + i * barH + barH / 2 + 4} textAnchor="end" fontSize="12" fill="#4b5563">{lbl}</text>
              ))}
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">TOP 10 대기전력 우수 장비 (kW)</div>
          <div style={{ height: 250, position: "relative" }}>
            <svg viewBox="0 0 500 250" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map((v, idx) => {
                const x = padX + (v / 3.5) * drawW;
                return (
                  <g key={idx}>
                    <line x1={x} y1={padY} x2={x} y2={padY + drawH} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={x} y={padY + drawH + 20} textAnchor="middle" fontSize="11" fill="#9ca3af">{v.toFixed(1)}</text>
                  </g>
                );
              })}
              {topData.map((v, i) => {
                const w = (v / 3.5) * drawW;
                return <rect key={`tbar-${i}`} x={padX} y={padY + i * barH} width={w} height={barH} fill="#22c55e" />;
              })}
              {topLabels.map((lbl, i) => (
                <text key={i} x={padX - 10} y={padY + i * barH + barH / 2 + 4} textAnchor="end" fontSize="12" fill="#4b5563">{lbl}</text>
              ))}
            </svg>
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

  const chartW = 800;
  const chartH = 200;
  const padX = 60;
  const padYTop = 20;
  const padYBot = 30;
  const drawH = chartH - padYTop - padYBot;

  const getYLeft = (v: number) => padYTop + drawH - ((v - 350) / 200) * drawH;
  const getYRight = (v: number) => padYTop + drawH - ((v - 15) / 30) * drawH;
  const getX = (i: number) => padX + (i / (hours.length - 1)) * (chartW - 2 * padX);

  const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYLeft(v)}`).join(' ');
  const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYRight(v)}`).join(' ');
  const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYLeft(v)}`).join(' ');

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
          
          <div style={{ height: 200, position: "relative" }}>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
              {[350, 400, 450, 500, 550].map((v, idx) => {
                const y = getYLeft(v);
                return (
                  <g key={idx}>
                    <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={padX - 10} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}
              {[15, 20, 25, 30, 35, 40, 45].map((v, idx) => {
                const y = getYRight(v);
                return (
                  <text key={idx} x={chartW - padX + 10} y={y + 4} textAnchor="start" fontSize="10" fill="#9ca3af">{v}</text>
                );
              })}
              
              <path d={pwrPath} fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
              {pwrData.map((v, i) => <rect key={`p-${i}`} x={getX(i)-3} y={getYLeft(v)-3} width="6" height="6" fill="#fff" stroke="#1e3a8a" strokeWidth="1.5"/>)}
              
              <path d={lngPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              {lngData.map((v, i) => <rect key={`l-${i}`} x={getX(i)-3} y={getYRight(v)-3} width="6" height="6" fill="#fff" stroke="#f59e0b" strokeWidth="1.5"/>)}
              
              <path d={airPath} fill="none" stroke="#00c49f" strokeWidth="2.5" />
              {airData.map((v, i) => <rect key={`a-${i}`} x={getX(i)-3} y={getYLeft(v)-3} width="6" height="6" fill="#fff" stroke="#00c49f" strokeWidth="1.5"/>)}
              
              {hours.map((h, i) => (
                <text key={i} x={getX(i)} y={chartH - 5} textAnchor="middle" fontSize="10" fill="#9ca3af">{h}</text>
              ))}
              
              <text x={padX - 45} y={chartH/2} transform={`rotate(-90 ${padX - 45} ${chartH/2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="600">전력 (kWh)</text>
              <text x={chartW - padX + 45} y={chartH/2} transform={`rotate(90 ${chartW - padX + 45} ${chartH/2})`} textAnchor="middle" fontSize="12" fill="#4b5563" fontWeight="600">LNG (m³)</text>
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">에너지원별 대기 비중 (TOE)</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <svg viewBox="0 0 100 100" width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="25" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#1e3a8a" strokeWidth="25" strokeDasharray="81 188.5" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#00c49f" strokeWidth="25" strokeDasharray="53 188.5" strokeDashoffset="-81" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#f59e0b" strokeWidth="25" strokeDasharray="34 188.5" strokeDashoffset="-134" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0ea5e9" strokeWidth="25" strokeDasharray="15 188.5" strokeDashoffset="-168" />
            </svg>
            <div className="flex flex-col gap-2" style={{ gap: 12 }}>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontSize: 12, color: "#4b5563" }}><div className="w-3 h-3 rounded-full" style={{ background: "#1e3a8a", width: 12, height: 12 }}></div>전력</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontSize: 12, color: "#4b5563" }}><div className="w-3 h-3 rounded-full" style={{ background: "#00c49f", width: 12, height: 12 }}></div>압축공기</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontSize: 12, color: "#4b5563" }}><div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b", width: 12, height: 12 }}></div>LNG</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontSize: 12, color: "#4b5563" }}><div className="w-3 h-3 rounded-full" style={{ background: "#0ea5e9", width: 12, height: 12 }}></div>스팀</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontSize: 12, color: "#4b5563" }}><div className="w-3 h-3 rounded-full" style={{ background: "#e5e7eb", width: 12, height: 12 }}></div>기타</div>
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
  const drawW = 380;
  const drawH = 200;
  const padX = 110;
  const padY = 20;
  const barH = 20;

  const worstData = [110.5, 88.4, 75.0, 62.0, 55.4, 50.0, 48.0, 45.0, 42.0, 40.0];
  const worstLabels = ['Pump Station #2', 'Chiller Unit C', 'Comp #5', 'Fan #12', 'Boiler B', 'Exh Fan #3', 'Chiller B', 'Pump Unit D', 'Comp #6', 'Dryer Unit A'];
  
  const topData = [0.5, 0.8, 1.2, 1.5, 1.9, 2.1, 2.3, 2.4, 2.6, 2.8];
  const topLabels = ['Sensor #1', 'LED Room A', 'IoT Gateway', 'Valve C', 'Sub-Meter #3', 'Switch #2', 'IoT Sw #4', 'IoT Sw #2', 'LED Room B', 'Sensor #2'];

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
          <div style={{ height: 250, position: "relative" }}>
            <svg viewBox="0 0 500 250" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[0, 20, 40, 60, 80, 100, 120].map((v, idx) => {
                const x = padX + (v / 120) * drawW;
                return (
                  <g key={idx}>
                    <line x1={x} y1={padY} x2={x} y2={padY + drawH} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={x} y={padY + drawH + 20} textAnchor="middle" fontSize="11" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}
              {worstData.map((v, i) => {
                const w = (v / 120) * drawW;
                return <rect key={`wbar-${i}`} x={padX} y={padY + i * barH} width={w} height={barH} fill="#ef4444" />;
              })}
              {worstLabels.map((lbl, i) => (
                <text key={i} x={padX - 10} y={padY + i * barH + barH / 2 + 4} textAnchor="end" fontSize="12" fill="#4b5563">{lbl}</text>
              ))}
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col flex-1">
          <div className="text-base font-bold text-gray-800 mb-4">TOP 10 대기전력 우수 장비 (평일심야)</div>
          <div style={{ height: 250, position: "relative" }}>
            <svg viewBox="0 0 500 250" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((v, idx) => {
                const x = padX + (v / 3.0) * drawW;
                return (
                  <g key={idx}>
                    <line x1={x} y1={padY} x2={x} y2={padY + drawH} stroke="#f3f4f6" strokeWidth="1" />
                    <text x={x} y={padY + drawH + 20} textAnchor="middle" fontSize="11" fill="#9ca3af">{v.toFixed(1)}</text>
                  </g>
                );
              })}
              {topData.map((v, i) => {
                const w = (v / 3.0) * drawW;
                return <rect key={`tbar-${i}`} x={padX} y={padY + i * barH} width={w} height={barH} fill="#22c55e" />;
              })}
              {topLabels.map((lbl, i) => (
                <text key={i} x={padX - 10} y={padY + i * barH + barH / 2 + 4} textAnchor="end" fontSize="12" fill="#4b5563">{lbl}</text>
              ))}
            </svg>
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
