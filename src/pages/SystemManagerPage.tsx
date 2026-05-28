import { useState, Fragment } from "react";
import type { MailingUser, CorrectionReq } from "../types";

export function SystemManagerPage() {
  const dates = ["3/25", "3/26", "3/27", "3/28", "3/29", "3/30", "3/31"];
  const success = [120, 120, 125, 120, 115, 40, 128];
  const failure = [0, 0, 1, 0, 2, 5, 3];

  const cW = 1100;
  const cH = 220;
  const pL = 48;
  const pR = 18;
  const pT = 16;
  const pB = 32;
  const aW = cW - pL - pR;
  const aH = cH - pT - pB;
  const dMax = 135;
  const dMin = 0;

  const tx = (i: number) => pL + (aW / (dates.length - 1)) * i;
  const ty = (v: number) => pT + aH - ((v - dMin) / (dMax - dMin)) * aH;

  const sLine = success.map((v, i) => `${i === 0 ? 'M' : 'L'}${tx(i).toFixed(1)},${ty(v).toFixed(1)}`).join(" ");
  const fLine = failure.map((v, i) => `${i === 0 ? 'M' : 'L'}${tx(i).toFixed(1)},${ty(v).toFixed(1)}`).join(" ");
  const sArea = `${sLine} L${tx(dates.length - 1).toFixed(1)},${(pT + aH).toFixed(1)} L${pL},${(pT + aH).toFixed(1)} Z`;

  const gridVals = [0, 40, 80, 120];

  const [mailingList, setMailingList] = useState<MailingUser[]>([
    { id: 1, group: "경영진 보고", receiver: "홍길동 상무", email: "hong.gd@hyundai.com", active: true },
    { id: 2, group: "에너지팀 알림", receiver: "김철수 팀장", email: "kim.cs@hyundai.com", active: true },
    { id: 3, group: "시스템 관리", receiver: "박명희 매니저", email: "park.yh@hyundai.com", active: true },
    { id: 4, group: "설비 공보", receiver: "이민수 기사", email: "lee.ms@hyundai.com", active: false },
  ]);

  const [corrections, setCorrections] = useState<CorrectionReq[]>([
    { id: 1, date: "2026-03-30", target: "1공장/전력#2", before: "0 kWh", after: "450 kWh", reason: "계측기 결함", pending: true },
    { id: 2, date: "2026-03-29", target: "2공장/LNG#1", before: "120 m³", after: "115 m³", reason: "검침 오차", pending: false },
    { id: 3, date: "2026-03-28", target: "3공장/스팀#1", before: "5.2 ton", after: "5.0 ton", reason: "누수 보정", pending: false },
  ]);

  const flowSteps = [
    { label: "원시 데이터 수집", sub: "5분 주기", icon: "🗄", status: "default" },
    { label: "이상치 필터링", sub: "±3σ 기준", icon: "🔽", status: "active" },
    { label: "결측치 보간", sub: "선형 보간법", icon: "🧮", status: "default" },
    { label: "보정 데이터 저장", sub: "DB 반영", icon: "✅", status: "done" },
  ];

  const handleToggleMailing = (id: number) => {
    setMailingList(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  const handleAddRequest = () => {
    const reason = prompt("보정 사유를 입력하세요:", "데이터 보정 수동 요청");
    if (!reason) return;
    const target = prompt("보정 대상을 입력하세요:", "1공장/압축공기#1");
    if (!target) return;
    const before = prompt("보정 전 값을 입력하세요:", "0 Nm³");
    const after = prompt("보정 후 값을 입력하세요:", "150 Nm³");

    const newReq: CorrectionReq = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      target,
      before: before || "",
      after: after || "",
      reason,
      pending: true
    };
    setCorrections([newReq, ...corrections]);
  };

  const handleApproveCorrection = (id: number) => {
    setCorrections(prev => prev.map(c => c.id === id ? { ...c, pending: false } : c));
  };

  return (
    <div className="flex flex-col gap-5 p-1">
      {/* 관리자 헤더 배너 */}
      <div className="flex justify-between items-center bg-gray-900 text-white px-5 py-4 rounded-xl shadow-md">
        <span className="text-lg font-bold tracking-wide">시스템 관리자 (Administrator)</span>
        <span className="text-sm font-semibold bg-gray-800 px-3 py-1 rounded-full border border-gray-700">🔒 관리자 전용 화면</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* ① 메일링 리스트 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
          <div className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">👥 메일링 리스트 (수신적용대상)</div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">그룹명</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">수신자</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">이메일</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">상태 (토글 가능)</th>
              </tr>
            </thead>
            <tbody>
              {mailingList.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800">{r.group}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800">{r.receiver}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-blue-500 font-medium">{r.email}</td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      onClick={() => handleToggleMailing(r.id)}
                    >
                      {r.active ? "활성" : "중지"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* ② 매일 발송 이력 차트 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-bold text-gray-800 flex items-center gap-2">✉ 매일 발송 이력</div>
            <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">금월: 128건</div>
          </div>
          <div className="flex items-center justify-end gap-3 text-xs font-semibold text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-green-600"></span>성공
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-red-600"></span>실패
            </span>
          </div>
          <svg className="w-full h-[240px] block overflow-visible" viewBox={`0 0 ${cW} ${cH}`}>
            <defs>
              <linearGradient id="smpSuccessGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {gridVals.map((v) => {
              const y = ty(v).toFixed(1);
              return (
                <g key={`smp-y-${v}`}>
                  <line x1={pL} x2={cW - pR} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                  <text x={pL - 6} y={parseFloat(y) + 4} textAnchor="end" fontSize="10" fill="#4b5563" fontWeight="600">
                    {v}
                  </text>
                </g>
              );
            })}
            <path d={sArea} fill="url(#smpSuccessGrad)" />
            <path d={sLine} fill="none" stroke="#16a34a" strokeWidth="2.5" />
            <path d={fLine} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
            
            {success.map((v, i) => (
              <circle key={`sc-${i}`} cx={tx(i).toFixed(1)} cy={ty(v).toFixed(1)} r="4" fill="#16a34a" stroke="#fff" strokeWidth="2" />
            ))}
            {failure.map((v, i) => (
              <circle key={`fc-${i}`} cx={tx(i).toFixed(1)} cy={ty(v).toFixed(1)} r="4" fill="#dc2626" stroke="#fff" strokeWidth="2" />
            ))}

            {dates.map((d, i) => (
              <text
                key={`lbl-${i}`}
                x={tx(i).toFixed(1)}
                y={cH - 6}
                textAnchor="middle"
                fontSize="10"
                fill="#4b5563"
                fontWeight="600"
              >
                {d}
              </text>
            ))}
          </svg>
        </div>

        {/* ③ 데이터 자동보정 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">✏ 데이터 자동보정 현황 (시스템 로직)</div>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
            {flowSteps.map((s, idx) => (
              <Fragment key={`step-${idx}`}>
                {idx > 0 && <div className="text-gray-400 text-lg hidden sm:block">▶</div>}
                <div className={`flex-1 bg-white p-3 rounded-lg border text-center shadow-sm w-full sm:w-auto relative ${
                  s.status === 'active' ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 
                  s.status === 'done' ? 'border-green-500 bg-green-50/30' : 'border-gray-200'
                }`}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100 leading-relaxed">
            <p>금일 자동보정 실행: <strong>288회</strong> (성공 288, 실패 0)</p>
            <p>최근 이상치 감지: <span className="font-bold text-red-600">3건</span> [제2공장 전력계 #4 - 통신 노이즈 필터링]</p>
          </div>
        </div>

        {/* ④ 데이터 수동보정 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-bold text-gray-800 flex items-center gap-2">📝 데이터 수동보정 (관리자 승인)</div>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors" onClick={handleAddRequest}>+ 보정 요청</button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">일자</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">대상</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">보정전</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">보정후</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">사유</th>
                <th className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-600">상태</th>
              </tr>
            </thead>
            <tbody>
              {corrections.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800">{r.date}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800 font-bold">{r.target}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-500">{r.before}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800 font-bold">{r.after}</td>
                  <td className="px-4 py-3 border-b border-gray-100 text-gray-800">{r.reason}</td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${r.pending ? "bg-yellow-100 text-yellow-700 cursor-pointer" : "bg-blue-100 text-blue-700"}`}
                      title={r.pending ? "클릭 시 보정 승인" : ""}
                      onClick={() => r.pending && handleApproveCorrection(r.id)}
                    >
                      {r.pending ? "승인대기" : "승인완료"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
