import { useState, useEffect } from "react";
import styles from "./ExternalShell.module.css";
import type { MainMenu, ExternalShellProps } from "../../types";

export function ExternalShell({
  menuConfig,
  currentMainId,
  currentSubId,
  onNavigate,
  onSearch,
  children
}: ExternalShellProps) {
  const [site, setSite] = useState("all");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const [currentTime, setCurrentTime] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(" ")[0]);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onSearch({ site, date });
    }, 700);
  };

  const activeMenu: MainMenu = menuConfig.find(m => m.id === currentMainId) || menuConfig[0];
  const subTabs = activeMenu.children || [];

  return (
    <div className={styles.container} id="PluginDashboardContainer">
      {/* 1. Sidebar Nav */}
      <div className={styles.sidebar} id="MainSideNav">
        {menuConfig.map((item) => (
          <div
            key={item.id}
            className={`${styles.sidebarIcon} ${item.id === currentMainId ? styles.active : ""}`}
            onClick={() => onNavigate(item.id, item.children?.[0]?.id || "")}
            title={item.label}
            dangerouslySetInnerHTML={{ __html: item.icon || "" }}
          />
        ))}
      </div>

      {/* 2. Main content wrapper */}
      <div className={styles.mainWrapper}>
        {/* Header */}
        <div className={styles.topHeader}>
          <div className={styles.categoryName} id="MainCategoryTitle">
            {activeMenu.label}
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.headerIconButton}
              id="HeaderRefreshButton"
              onClick={handleRefresh}
              title="최신 기준으로 새로고침"
            >
              <svg
                className={`${styles.headerIcon} ${isRefreshing ? styles.spin : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
                <path d="M21 3v6h-6"></path>
              </svg>
            </button>
            <div className={styles.headerTime} id="CurrentDateTime">
              {currentTime ? `${currentTime} 기준` : "로딩중..."}
            </div>
          </div>
        </div>

        {/* Sub Tabs */}
        {subTabs.length > 0 && (
          <div className={styles.subTabBar} id="SubTabBar">
            {subTabs.map((tab) => (
              <div
                key={tab.id}
                className={`${styles.subTab} ${tab.id === currentSubId ? styles.active : ""}`}
                onClick={() => onNavigate(currentMainId, tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}

        {/* Dashboard Filters */}
        <div className={styles.filterBar} id="DashboardFilterBar">
          <select
            className={styles.filterInput}
            id="SiteFilterSelect"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            <option value="all">전체 사업장</option>
            <option value="ulsan">울산 사업장</option>
            <option value="seosan">서산 사업장</option>
            <option value="seongnam">성남 사업장</option>
          </select>
          <input
            className={styles.filterInput}
            id="DateFilterInput"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className={styles.filterButton}
            id="DashboardSearchButton"
            onClick={() => onSearch({ site, date })}
          >
            조회
          </button>
        </div>

        {/* Content Viewport */}
        <div className={styles.contentViewport} id="ContentViewport">
          {children}
        </div>
      </div>
    </div>
  );
}
