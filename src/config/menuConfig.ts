import type { MainMenu } from "../types";

const getIcon = (type: string) => {
  switch (type) {
    case 'dashboard':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11.5L12 4l9 7.5"></path><path d="M5.5 10.5V20h13V10.5"></path></svg>`;
    case 're100':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c-.6 0-3 3.4-3 7s1 5.3 3 8c2-2.7 3-4.4 3-8s-2.4-7-3-7z"></path><path d="M12 17v5"></path><path d="M12 12c-2.8 0-5 1.5-5 3 0 1.5 2.2 3 5 3"></path></svg>`;
    case 'energy':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`;
    case 'meterManagement':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>`;
    case 'systemManager':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg>`;
    default:
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`;
  }
};

export const menuConfig: MainMenu[] = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: getIcon('dashboard'),
    children: [
      { id: "overview", label: "종합 현황" },
      { id: "notice", label: "공지사항 및 교육" }
    ]
  },
  {
    id: "re100",
    label: "RE100 관리",
    icon: getIcon('re100'),
    children: [
      { id: "re100_status", label: "RE100 현황" },
      { id: "re100_renewable", label: "재생에너지 현황" }
    ]
  },
  {
    id: "energy",
    label: "에너지 관리",
    icon: getIcon('energy'),
    children: [
      { id: "energy_integration", label: "통합 모니터링" },
      { id: "energy_performance", label: "에너지 성과" }
    ]
  },
  {
    id: "meterManagement",
    label: "계측기 관리",
    icon: getIcon('meterManagement'),
    children: [
      { id: "meterRef", label: "계측기 참조" },
      { id: "meterLinked", label: "연계데이터 조회" },
      { id: "meterReport", label: "리포트" },
      { id: "meterAnalysis", label: "상관관계 분석" }
    ]
  },
  {
    id: "systemManager",
    label: "시스템 관리",
    icon: getIcon('systemManager'),
    children: []
  }
];