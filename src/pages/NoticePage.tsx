import { useState } from "react";
import type { NoticeItem } from "../types";

const categoryNames: Record<string, string> = {
  blue: "에너지 교육",
  orange: "홍보 및 캠페인",
  green: "개선요청 및 제안",
  purple: "탄소중립 정보 (법령/규제)"
};

const noticeData: NoticeItem[] = [
  // Blue - 에너지 교육
  { 
    id: 1, 
    category: "blue", 
    title: "2026년 상반기 에너지 절감 실무자 교육", 
    meta: "일정: 2026.04.15 ~ 04.16 | 장소: 본사 대강당", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-blue-50 text-blue-600">모집중</div>, 
    content: "본사 대강당에서 진행되는 상반기 에너지 절감 실무자 필수 교육입니다.<br><br><b>[교육 안내]</b><br>- 내용: 공장 내 최신 에너지 절감 기법 및 해외 우수 사례 공유<br>- 강사: 외부 초빙 전문가 및 사내 마스터<br>- 준비물: 개인 노트북 및 사원증 지참<br><br>교육 미이수 시 하반기 인사 평가에 불이익이 있을 수 있으니 부서별 담당자는 반드시 기한 내에 참석하여 주시기 바랍니다." 
  },
  { 
    id: 2, 
    category: "blue", 
    title: "탄소중립 기초 및 RE100 이행 전략 (온라인)", 
    meta: "기간: 상시 수강 가능 | 수강률: 85%", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-green-50 text-green-600">수강중</div>, 
    content: "RE100 달성을 위한 사내 필수 온라인 교육 과정입니다.<br><br>사내 LMS 시스템을 통해 모바일로도 자유롭게 수강하실 수 있습니다. 아직 수강을 완료하지 않으신 분들은 가급적 이달 말까지 완료해 주시기 바랍니다." 
  },
  { 
    id: 3, 
    category: "blue", 
    title: "에너지 설비 운영 효율화 가이드 교육", 
    meta: "일정: 2026.03.10 | 대상: 설비 담당자", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-gray-100 text-gray-600">종료</div>, 
    content: "지난 달 진행되었던 설비 운영 가이드 교육이 성공적으로 마무리되었습니다.<br><br>교육 자료 및 발표 영상은 사내 지식포털(Knowledge Center) 비디오 자료실에 업로드되어 있으니, 부득이하게 참석하지 못하신 분들은 해당 자료를 참고해 주시기 바랍니다." 
  },
  { 
    id: 13, 
    category: "blue", 
    title: "스마트 팩토리 에너지 절감 기초", 
    meta: "기간: 2026.05.01 ~ 05.31 | 수강률: 12%", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-blue-50 text-blue-600">수강중</div>, 
    content: "스마트 팩토리 도입에 따른 필수 온라인 과정입니다." 
  },
  
  // Orange - 홍보 및 캠페인
  { 
    id: 4, 
    category: "orange", 
    title: "[우수사례] 1공장 압축공기 누설 개선으로 연 5천만원 절감", 
    meta: "등록일: 2026.03.28 | 조회수: 1,245", 
    badge: <div className="text-base">🏆</div>, 
    content: "1공장 유틸리티팀에서 제안한 노후 압축공기 배관 밸브 교체 및 초음파 누설 탐지 활동을 통해 연간 약 5천만 원 상당의 전력비를 절감한 우수 사례입니다.<br><br>해당 사례를 바탕으로 타 공장에서도 즉각적인 수평 전개를 지시하였으며, 성과를 낸 1공장 담당 파트에는 다음 달 '이달의 우수 팀' 포상이 수여될 예정입니다." 
  },
  { 
    id: 5, 
    category: "orange", 
    title: "3월 '에너지 지킴이' 캠페인 결과 발표", 
    meta: "등록일: 2026.03.25 | 부서별 참여율 공개", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap text-red-600 bg-red-50">NEW</div>, 
    content: "사내 PC 절전 및 점심시간 소등 캠페인에 적극적으로 참여해주신 임직원 여러분께 감사드립니다.<br><br><b>우수 참여 부서</b><br>1위: 생산관리팀 (98%)<br>2위: 품질보증팀 (92%)<br>3위: 경영지원팀 (89%)<br><br>우수 부서에는 소정의 간식비가 지원될 예정입니다." 
  },
  { 
    id: 6, 
    category: "orange", 
    title: "2026년 에너지 절약 뉴스레터 Vol.3 발간", 
    meta: "등록일: 2026.03.15 | 첨부파일 다운로드", 
    badge: (
      <div className="text-red-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
    ), 
    content: "국내외 에너지 시장 동향과 당사의 절약 활동을 정리한 뉴스레터 Vol.3 가 발간되었습니다. 본 글의 첨부파일을 클릭하여 PDF 버전을 다운로드하실 수 있습니다." 
  },
  { 
    id: 14, 
    category: "orange", 
    title: "점심시간 완전 소등 캠페인 연장 안내", 
    meta: "등록일: 2026.04.10 | 총무팀", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-orange-50 text-orange-600">안내</div>, 
    content: "하절기 전력피크 대비 점심시간 완전 소등 캠페인을 8월까지 연장합니다." 
  },

  // Green - 개선요청 및 제안
  { 
    id: 7, 
    category: "green", 
    title: "2공장 공조기 인버터 제어 방식 개선 제안", 
    meta: "제안자: 김철수 | 제안일: 2026.03.30", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-orange-50 text-orange-600">검토중</div>, 
    content: "기존 댐퍼 제어 방식의 2공장 AHU(공기조화기)에 인버터를 도입하여 회전수 제어 방식으로 변경하는 제안입니다.<br><br>현재 시설팀에서 초기 투자비 및 예상 전력 절감액에 대한 ROI(투자수익률)를 심도 있게 검토 중입니다. 긍정적인 방향으로 결론이 날 경우 내년도 예산에 반영될 수 있습니다." 
  },
  { 
    id: 8, 
    category: "green", 
    title: "조립라인 LED 조명 교체 및 센서 설치 요청", 
    meta: "제안자: 박영희 | 제안일: 2026.03.20", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-blue-50 text-blue-600">진행중</div>, 
    content: "근무자가 없는 휴식 시간 및 야간에 불필요하게 켜져 있는 조명을 자동으로 끄기 위해, 고효율 LED 조명 교체와 더불어 재실 센서 설치 작업이 진행 중입니다.<br><br>현재 자재 발주가 완료되었으며 이번 주 주말을 이용하여 교체 공사가 시작될 예정입니다. 작업 기간 중 일부 구역 통행이 제한될 수 있습니다." 
  },
  { 
    id: 9, 
    category: "green", 
    title: "노후 보일러 폐열 회수 장치 설치 건", 
    meta: "제안자: 시설팀 | 제안일: 2026.02.15", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-green-50 text-green-600">완료</div>, 
    content: "제안해주신 보일러 연도 폐열 회수기(Economizer) 설치 공사가 2월 말 성공적으로 마무리되었습니다.<br><br>한 달간 가동 데이터를 모니터링한 결과, 급수 예열을 통해 전년 동월 대비 가스 사용량이 약 15% 이상 절감되는 훌륭한 성과를 거두었습니다." 
  },
  { 
    id: 15, 
    category: "green", 
    title: "3공장 스크러버 용수 재활용 시스템 도입", 
    meta: "제안자: 이영호 | 제안일: 2026.04.05", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-orange-50 text-orange-600">검토중</div>, 
    content: "스크러버 용수를 정수 처리하여 재활용하는 시스템 도입 제안입니다." 
  },

  // Purple - 탄소중립 정보
  { 
    id: 10, 
    category: "purple", 
    title: "[법령] 탄소중립기본법 시행령 개정안 입법예고", 
    meta: "카테고리: 법령 | 등록일: 2026.03.20", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap text-red-600 bg-red-50">중요</div>, 
    content: "정부에서 발표한 탄소중립기본법 시행령 일부개정안에 대한 안내입니다.<br><br>배출권 거래제 할당 대상 업체의 의무 감축량이 상향 조정될 수 있는 내용이 포함되어 있어, 당사 ESG 경영팀에서 심층 분석을 진행하고 있습니다. 관련 부서장들께서는 첨부된 법령 원문을 반드시 숙지해 주시기 바랍니다." 
  },
  { 
    id: 11, 
    category: "purple", 
    title: "[용어] Scope 3 배출량 산정 가이드라인 및 주요 용어 해설", 
    meta: "카테고리: 가이드 | 등록일: 2026.03.10", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap text-purple-600 bg-purple-50">Update</div>, 
    content: "직접 배출(Scope 1) 및 간접 배출(Scope 2) 외에, 협력사 및 물류망을 포함한 기타 간접 배출(Scope 3) 산정에 대한 최신 글로벌 가이드라인 요약본입니다.<br><br>특히 공급망 ESG 평가가 강화됨에 따라 구매/물류 부서의 세부 데이터 확보가 중요해졌습니다." 
  },
  { 
    id: 12, 
    category: "purple", 
    title: "[FAQ] RE100 이행 수단별 인정 기준 자주 묻는 질문", 
    meta: "카테고리: FAQ | 등록일: 2026.02.28", 
    badge: (
      <div className="text-blue-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
    ), 
    content: "녹색프리미엄 요금제, REC(신재생에너지 공급인증서) 구매, 제3자 PPA(전력구매계약), 자가 발전 등 기업의 RE100 이행을 위한 각 수단별 장단점과 인정 기준에 대해 자주 묻는 질문(FAQ)을 정리했습니다." 
  },
  { 
    id: 16, 
    category: "purple", 
    title: "[공지] 2026년 지속가능경영보고서 초안 검토 요청", 
    meta: "카테고리: 공지 | 등록일: 2026.04.18", 
    badge: <div className="px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap text-red-600 bg-red-50">중요</div>, 
    content: "올해 발간 예정인 지속가능경영보고서 초안입니다. 각 부서별 데이터 확인 요망." 
  },
];

export function NoticePage() {
  const [viewMode, setViewMode] = useState<"grid" | "category" | "detail">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [fromCategoryView, setFromCategoryView] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openCategory = (cat: string) => {
    setViewMode("category");
    setSelectedCategory(cat);
    setSearchTerm(""); // Reset category search
  };

  const openNoticeDetail = (id: number, cameFromCategory: boolean) => {
    setSelectedNoticeId(id);
    setFromCategoryView(cameFromCategory);
    setViewMode("detail");
  };

  const goBackFromDetail = () => {
    setViewMode(fromCategoryView ? "category" : "grid");
    setSelectedNoticeId(null);
  };

  const goBackFromCategory = () => {
    setViewMode("grid");
    setSelectedCategory(null);
    setSearchTerm("");
  };

  const renderFilteredList = (category: string, limit: number | null = null, isCompact: boolean = false) => {
    const term = searchTerm.toLowerCase();
    let items = noticeData.filter(
      (d) => d.category === category && d.title.toLowerCase().includes(term)
    );

    if (limit) items = items.slice(0, limit);

    if (items.length === 0) {
      return <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">"{searchTerm}" 검색 결과가 없습니다.</div>;
    }

    return items.map((item) => (
      <div 
        className={
          isCompact
            ? "flex items-center justify-between p-3 mx-2 my-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
            : "flex items-center justify-between py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-4 cursor-pointer transition-colors"
        }
        key={item.id} 
        onClick={() => openNoticeDetail(item.id, viewMode === "category")}
      >
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-4">
          <div className={isCompact ? "text-sm font-bold text-gray-800 truncate" : "text-base font-bold text-gray-900"}>{item.title}</div>
          <div className={isCompact ? "text-xs text-gray-500 font-medium" : "text-sm text-gray-500 font-medium"}>{item.meta}</div>
        </div>
        {item.badge}
      </div>
    ));
  };

  // === 1. DETAIL VIEW ===
  if (viewMode === "detail" && selectedNoticeId) {
    const item = noticeData.find((d) => d.id === selectedNoticeId);
    if (item) {
      return (
        <div className="flex flex-col gap-5 h-full relative">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex-1 overflow-y-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 cursor-pointer mb-6 transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-gray-100" onClick={goBackFromDetail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                목록으로 돌아가기
              </div>
            </div>
            <div className="border-b border-gray-200 pb-5 mb-6">
              <div className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{item.title}</div>
              <div className="flex items-center gap-3">
                {item.badge}
                <span className="text-xs text-gray-500 font-medium">{item.meta}</span>
              </div>
            </div>
            <div 
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        </div>
      );
    }
  }

  // === 2. CATEGORY LIST VIEW ===
  if (viewMode === "category" && selectedCategory) {
    const catName = categoryNames[selectedCategory] || "공지사항";
    return (
      <div className="flex flex-col gap-5 h-full relative">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center mb-2">
          <div className="text-xl font-bold tracking-tight text-gray-900">{catName}</div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-64 py-2 pl-4 pr-10 bg-white border border-gray-300 rounded-full text-sm outline-none focus:border-blue-500 transition-colors"
                placeholder={`'${catName}' 내 검색...`}
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
              <svg className="absolute right-4 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex-1 overflow-y-auto">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 cursor-pointer mb-6 transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-gray-100" onClick={goBackFromCategory}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              전체 카테고리로 돌아가기
            </div>
          </div>
          <div className="flex flex-col">
            {renderFilteredList(selectedCategory, null, false)}
          </div>
        </div>
      </div>
    );
  }

  // === 3. LIST VIEW (GRID) ===
  return (
    <div className="flex flex-col gap-5 h-full relative">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center mb-2">
        <div className="text-xl font-bold tracking-tight text-gray-900">공지사항 및 교육</div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-64 py-2 pl-4 pr-10 bg-white border border-gray-300 rounded-full text-sm outline-none focus:border-blue-500 transition-colors"
              placeholder="전체 검색어 입력..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg className="absolute right-4 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-transparent text-gray-700 text-sm font-semibold cursor-pointer transition-colors hover:text-gray-900" onClick={() => setShowAdminModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            관리자 설정
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 h-[calc(100vh-200px)] min-h-[600px] overflow-hidden">
        {/* 1. 에너지 교육 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-blue-100 bg-blue-50">
            <div className="flex items-center gap-2 font-bold text-base text-blue-800">
              <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              에너지 교육
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer font-semibold transition-colors" onClick={() => openCategory("blue")}>
              더보기 &gt;
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">{renderFilteredList("blue", 3, true)}</div>
        </div>

        {/* 2. 홍보 및 캠페인 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-orange-100 bg-orange-50">
            <div className="flex items-center gap-2 font-bold text-base text-orange-800">
              <svg className="text-orange-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              홍보 및 캠페인
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer font-semibold transition-colors" onClick={() => openCategory("orange")}>
              더보기 &gt;
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">{renderFilteredList("orange", 3, true)}</div>
        </div>

        {/* 3. 개선요청 및 제안 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-green-100 bg-green-50">
            <div className="flex items-center gap-2 font-bold text-base text-green-800">
              <svg className="text-green-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-4"></path>
              </svg>
              개선요청 및 제안
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer font-semibold transition-colors" onClick={() => openCategory("green")}>
              더보기 &gt;
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">{renderFilteredList("green", 3, true)}</div>
        </div>

        {/* 4. 탄소중립 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-purple-100 bg-purple-50">
            <div className="flex items-center gap-2 font-bold text-base text-purple-800">
              <svg className="text-purple-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              탄소중립 정보 (법령/규제)
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer font-semibold transition-colors" onClick={() => openCategory("purple")}>
              더보기 &gt;
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">{renderFilteredList("purple", 3, true)}</div>
        </div>
      </div>

      {/* Admin Modal Dialog */}
      {showAdminModal && (
        <div 
          className="admin-modal-backdrop" 
          style={{
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100vw", 
            height: "100vh", 
            background: "rgba(0,0,0,0.6)", 
            backdropFilter: "blur(5px)", 
            zIndex: 99999999, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div 
            style={{
              background: "linear-gradient(145deg, #1e1e24, #2a2a35)", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: 16, 
              padding: 30, 
              width: 400, 
              maxWidth: "90%", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)", 
              color: "#fff", 
              animation: "slideUp 0.4s ease"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <div style={{ background: "rgba(46, 213, 115, 0.2)", color: "#2ed573", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600 }}>관리자 권한 인증 완료</h3>
            </div>
            <p style={{ color: "#adb5bd", lineHeight: "1.6", marginBottom: 25, fontSize: "0.95rem" }}>
              성공적으로 <strong>Administrator 권한</strong>이 확인되었습니다.<br /><br />
              추후 이곳에 <strong>공지사항 작성 및 수정 기능</strong>이 연결될 예정입니다.
            </p>
            <button 
              onClick={() => setShowAdminModal(false)}
              style={{
                width: "100%", 
                padding: 12, 
                background: "#3498db", 
                color: "white", 
                border: "none", 
                borderRadius: 8, 
                fontWeight: 600, 
                cursor: "pointer", 
                transition: "background 0.2s"
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
