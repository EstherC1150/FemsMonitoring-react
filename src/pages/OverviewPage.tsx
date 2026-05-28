import type { OverviewPageProps } from "../types";

export function OverviewPage({ site = "all", date = "" }: OverviewPageProps) {
  // 눈에 확 띄도록 변화폭을 아주 크게 줍니다 (임시 효과)
  let modifier = 1.0;
  
  if (site !== "all") {
    // 사업장 선택 시 숫자가 30%~60% 로 확 줄어들게
    const siteHash = site.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    modifier = 0.3 + (siteHash % 30) / 100; 
  }

  if (date) {
    // 날짜의 '일(day)' 정보를 기반으로 데이터를 뒤흔듦 (±50% 까지!)
    const day = parseInt(date.split("-")[2] || "1", 10);
    const dateSwing = (day % 15 - 7) / 10; // -0.7 ~ +0.7
    modifier += dateSwing;
    if (modifier < 0.1) modifier = 0.1; // 최소 10% 방어
  }

  const formatNum = (num: number, maxFrac: number = 0) => 
    (num * modifier).toLocaleString(undefined, { maximumFractionDigits: maxFrac });

  // 사이트 한글명 매핑
  const siteMap = {
      "all": "전체 사업장",
      "ulsan": "울산 사업장",
      "seosan": "서산 사업장",
      "seongnam": "성남 사업장"
  };
  const siteName: string = siteMap[site as keyof typeof siteMap] || site;

  // 샘플 데이터 (API 연동 시 교체)
  const kpis = [
    {
      title: "전력 사용현황",
      value: formatNum(12450),
      unit: "kWh",
      subLabel: "전일",
      subValue: formatNum(11890) + " kWh",
      deltaText: "4.7%",
      deltaDir: "up",
      iconBg: "#1f4c8f",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      )
    },
    {
      title: "LNG 사용현황",
      value: formatNum(850),
      unit: "m³",
      subLabel: "전일",
      subValue: formatNum(890) + " m³",
      deltaText: "4.5%",
      deltaDir: "down",
      iconBg: "#f97316",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-4 4-8 4-8z"></path>
          <path d="M8.5 14.5c.5 2.5 2.5 4 3.5 4s3-1.5 3.5-4"></path>
        </svg>
      )
    },
    {
      title: "스팀 사용현황",
      value: formatNum(42.5, 1),
      unit: "Ton",
      subLabel: "전일",
      subValue: formatNum(41.8, 1) + " Ton",
      deltaText: "0.7%",
      deltaDir: "up",
      iconBg: "#14b8a6",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 10 0"></path>
          <path d="M3 18c2.5-3 5.5-3 8 0s5.5 3 10 0"></path>
          <path d="M3 6c2.5-3 5.5-3 8 0s5.5 3 10 0"></path>
        </svg>
      )
    },
    {
      title: "압축공기 사용현황",
      value: formatNum(2150),
      unit: "Nm³",
      subLabel: "전일",
      subValue: formatNum(2200) + " Nm³",
      deltaText: "2.3%",
      deltaDir: "down",
      iconBg: "#64748b",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16"></path>
          <path d="M6 7h12"></path>
          <path d="M6 17h12"></path>
          <path d="M10 7v10"></path>
          <path d="M14 7v10"></path>
        </svg>
      )
    },
  ];

  const tableRows = [
    {
      label: "전월 실적 (2월)",
      labelClass: "row-label",
      cells: [formatNum(45200), formatNum(125400), formatNum(350200), formatNum(12500), formatNum(185.4, 1)],
    },
    {
      label: "금년 누계 (1~3월)",
      labelClass: "row-label emph",
      cells: [formatNum(128500), formatNum(365800), formatNum(1020500), formatNum(38200), formatNum(542.8, 1)],
    },
  ];

  // 연간 월별 (평일/휴일) 샘플 값
  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];
  const weekday = [120, 115, 118, 110, 105, 108, 125, 130, 118, 112, 114, 122].map(v => v * modifier);
  const weekend = [95, 92, 90, 86, 82, 84, 98, 102, 96, 90, 92, 97].map(v => v * modifier);

  const pL = 44;
  const pR = 12;
  const pT = 25;
  const pB = 35;

  const makeLinePath = (values: number[], w: number, h: number) => {
    const min = Math.min(...weekday, ...weekend) - 5;
    const max = Math.max(...weekday, ...weekend) + 5;
    const xStep = (w - pL - pR) / (values.length - 1);
    const yScale = (h - pT - pB) / (max - min || 1);
    const pts = values.map((v, i) => {
      const x = pL + xStep * i;
      const y = h - pB - (v - min) * yScale;
      return [x, y];
    });
    const d = pts
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`,
      )
      .join(" ");
    return { d, min, max };
  };

  const chartW = 1600;
  const chartH = 260;
  const { d: weekdayD } = makeLinePath(weekday, chartW, chartH);
  const {
    d: weekendD,
    min: yMin,
    max: yMax,
  } = makeLinePath(weekend, chartW, chartH);
  const yGrid = [0, 0.33, 0.66, 1].map((t) => {
    const y = pT + (chartH - pT - pB) * t;
    const val = (yMax - (yMax - yMin) * t).toFixed(0);
    return { y, val };
  });

  return (
    <div className="flex flex-col gap-5 pb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k, index) => (
          <div className="bg-white rounded-xl border border-border-color shadow-sm p-5" key={index}>
            <div className="flex justify-between items-center mb-3 text-sm font-bold text-gray-700">
              <span>{k.title}</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: k.iconBg }}>
                {k.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-gray-900">{k.value}</span>
              <span className="text-sm text-gray-500">({k.unit})</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
              <span>{k.subLabel}: <span className="font-semibold">{k.subValue}</span></span>
              <span className={`font-bold ${k.deltaDir === 'up' ? 'text-red-500' : 'text-blue-500'}`}>{k.deltaText}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="text-sm font-extrabold text-blue-900 mb-3">
          전월 / 누계 실적 현황{" "}
          <span className="text-gray-500 text-xs font-semibold ml-2">
            [조회: {siteName} / {date || "오늘"}]
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 w-[170px]">구분</th>
              <th className="text-right p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 tabular-nums">사업장 생산량 (EA)</th>
              <th className="text-right p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 tabular-nums">에너지 비용 (천원)</th>
              <th className="text-right p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 tabular-nums">전력 사용량 (kWh)</th>
              <th className="text-right p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 tabular-nums">LNG 사용량 (m³)</th>
              <th className="text-right p-3 bg-gray-50 text-gray-600 font-extrabold border-b border-gray-200 tabular-nums">온실가스 (tCO₂)</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((r, rowIndex) => (
              <tr key={rowIndex}>
                <td className={`p-3 border-b border-gray-200 font-extrabold ${r.labelClass.includes("emph") ? "text-blue-600" : "text-gray-900"}`}>{r.label}</td>
                {r.cells.map((cellVal, cellIndex) => (
                  <td className="p-3 border-b border-gray-200 text-gray-900 text-right tabular-nums" key={cellIndex}>
                    {cellVal}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col gap-2.5">
          <div className="text-sm font-extrabold text-blue-900 mb-0">
            연간 월단위 대기전력 현황 (평일심야 vs 휴일)
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-2.5 pb-2">
            <div className="flex items-center justify-end gap-3.5 text-xs text-gray-600 font-bold mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#1f4c8f]"></span>평일 심야 (kW)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#f59e0b]"></span>휴일 (kW)
              </span>
            </div>
            <svg className="w-full h-[260px] block" viewBox={`0 0 ${chartW} ${chartH}`}>
              {yGrid.map((g, gridIndex) => (
                <g key={gridIndex}>
                  <line x1={pL} x2={chartW - pR} y1={g.y} y2={g.y} stroke="#e5e7eb" strokeWidth="1" />
                  <text x={pL - 8} y={g.y + 4} textAnchor="end" fontSize="11" fill="#4b5563" fontWeight="600">
                    {g.val}
                  </text>
                </g>
              ))}
              <path d={weekdayD} fill="none" stroke="#1f4c8f" strokeWidth="3" />
              <path d={weekendD} fill="none" stroke="#f59e0b" strokeWidth="3" />
              {months.map((m, mIndex) => {
                const xVal = pL + ((chartW - pL - pR) / (months.length - 1)) * mIndex;
                return (
                  <text
                    key={mIndex}
                    x={xVal}
                    y={chartH - 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#4b5563"
                    fontWeight="600"
                  >
                    {m}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
