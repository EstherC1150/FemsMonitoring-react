
export function RE100RenewablePage() {
  const chartW = 1600;
  const chartH = 240;
  const padX = 48;
  const padY = 45;

  const xStep = (chartW - padX * 2) / 30;

  // 1) Solar Data
  const solarMax = 1500;
  const solarGen = [800, 850, 950, 1100, 1200, 1150, 500, 320, 900, 950, 1000, 1150, 1200, 1100, 950, 850, 750, 450, 350, 850, 950, 1000, 1050, 1150, 1250, 1150, 950, 850, 900, 1050, 1100];
  const solarUse = [800, 820, 900, 950, 980, 950, 480, 300, 850, 880, 950, 980, 1000, 950, 850, 800, 700, 400, 320, 800, 850, 900, 950, 980, 1000, 950, 850, 800, 850, 900, 950];

  const getSolarX = (i: number) => padX + xStep * i;
  const getSolarGenY = (val: number) => chartH - padY - (val / solarMax) * (chartH - padY * 2);
  const getSolarUseY = (val: number) => chartH - padY - (val / solarMax) * (chartH - padY * 2);

  const solarGenPath = solarGen.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getSolarX(i)} ${getSolarGenY(v)}`).join(' ');
  const solarUsePath = solarUse.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getSolarX(i)} ${getSolarUseY(v)}`).join(' ');

  let solarAreaPath = solarGen.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getSolarX(i)} ${getSolarGenY(v)}`).join(' ');
  solarAreaPath += ` L ${padX + xStep * 30} ${chartH - padY} L ${padX} ${chartH - padY} Z`;

  // 2) PPA Data
  const ppaMax = 2000;
  const ppaLimit = 2100;
  const ppaUse = [1200, 1300, 1400, 1450, 1500, 1100, 850, 1300, 1400, 1550, 1600, 1650, 1700, 1600, 1500, 1400, 1200, 950, 1350, 1450, 1500, 1600, 1750, 1900, 2100, 1800, 1650, 1500, 1400, 1550, 1600];

  const getPpaX = (i: number) => padX + xStep * i;
  const getPpaY = (val: number) => chartH - padY - (val / ppaMax) * (chartH - padY * 2);

  const ppaPath = ppaUse.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getPpaX(i)} ${getPpaY(v)}`).join(' ');
  
  let ppaAreaPath = ppaUse.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getPpaX(i)} ${getPpaY(v)}`).join(' ');
  ppaAreaPath += ` L ${padX + xStep * 30} ${chartH - padY} L ${padX} ${chartH - padY} Z`;

  const cyLimit = chartH - padY - (ppaLimit / ppaMax) * (chartH - padY * 2);

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
          
          <svg className="w-full h-auto max-h-[320px]" viewBox={`0 0 ${chartW} ${chartH}`} style={{ overflow: "visible" }}>
            {/* Grid & Y Axis */}
            {[0, 500, 1000, 1500].map((val) => {
              const y = chartH - padY - (val / solarMax) * (chartH - padY * 2);
              return (
                <g key={`y-grid-${val}`}>
                  <line x1={padX} x2={chartW - padX} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                  <text x={padX - 5} y={y + 4} textAnchor="end" fontSize="11" fill="#6b7280">{val}</text>
                </g>
              );
            })}
            
            {/* Area */}
            <path d={solarAreaPath} fill="#fef3c7" opacity="0.5" />
            
            {/* Lines */}
            <path d={solarGenPath} fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d={solarUsePath} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Points */}
            {solarGen.map((v, i) => (
              <circle key={`pt-${i}`} cx={getSolarX(i)} cy={getSolarGenY(v)} r="3" fill="#f59e0b" />
            ))}

            {/* X Axis */}
            {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31].map((d) => {
              const cx = padX + xStep * (d - 1);
              return (
                <text key={`x-lbl-${d}`} x={cx} y={chartH - padY + 15} textAnchor="middle" fontSize="11" fill="#6b7280">{d}일</text>
              );
            })}
          </svg>
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
          
          <svg className="w-full h-auto max-h-[320px]" viewBox={`0 0 ${chartW} ${chartH}`} style={{ overflow: "visible" }}>
            {/* Grid & Y Axis */}
            {[0, 1000, 2000].map((val) => {
              const y = chartH - padY - (val / ppaMax) * (chartH - padY * 2);
              return (
                <g key={`ppa-y-${val}`}>
                  <line x1={padX} x2={chartW - padX} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                  <text x={padX - 5} y={y + 4} textAnchor="end" fontSize="11" fill="#6b7280">{val}</text>
                </g>
              );
            })}
            
            {/* Area */}
            <path d={ppaAreaPath} fill="#dcfce7" opacity="0.5" />
            
            {/* Lines */}
            <path d={ppaPath} fill="none" stroke="#16a34a" strokeWidth="2" />
            
            {/* Limit Line */}
            <line x1={padX} x2={chartW - padX} y1={cyLimit} y2={cyLimit} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />

            {/* Points */}
            {ppaUse.map((v, i) => (
              <circle key={`ppa-pt-${i}`} cx={getPpaX(i)} cy={getPpaY(v)} r="3" fill="#16a34a" />
            ))}

            {/* X Axis */}
            {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31].map((d) => {
              const cx = padX + xStep * (d - 1);
              return (
                <text key={`ppa-x-lbl-${d}`} x={cx} y={chartH - padY + 15} textAnchor="middle" fontSize="11" fill="#6b7280">{d}일</text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
