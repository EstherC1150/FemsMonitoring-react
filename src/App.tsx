import { useState } from "react";

// Layout & Config
import { ExternalShell } from "./components/layout/ExternalShell";
import { menuConfig } from "./config/menuConfig";

// Pages
import { OverviewPage } from "./pages/OverviewPage";
import { NoticePage } from "./pages/NoticePage";
import { EnergyIntegrationPage } from "./pages/EnergyIntegrationPage";
import { EnergyPerformancePage } from "./pages/EnergyPerformancePage";
import { RE100Page } from "./pages/RE100Page";
import { RE100RenewablePage } from "./pages/RE100RenewablePage";
import { MeterManagementPage } from "./pages/MeterManagementPage";
import { SystemManagerPage } from "./pages/SystemManagerPage";

function App() {
  const [currentMainId, setCurrentMainId] = useState<string>("dashboard");
  const [currentSubId, setCurrentSubId] = useState<string>("overview");
  const [filters, setFilters] = useState<{ site: string; date: string }>({ site: "all", date: "" });

  const handleNavigate = (mainId: string, subId: string) => {
    setCurrentMainId(mainId);
    setCurrentSubId(subId);
  };

  const handleSearch = (newFilters: { site: string; date: string }) => {
    setFilters(newFilters);
  };

  // Render the active page component
  const renderActivePage = () => {
    if (currentMainId === "dashboard") {
      if (currentSubId === "overview") {
        return <OverviewPage site={filters.site} date={filters.date} />;
      }
      if (currentSubId === "notice") {
        return <NoticePage />;
      }
    }
    
    if (currentMainId === "re100") {
      if (currentSubId === "re100_status") {
        return <RE100Page />;
      }
      if (currentSubId === "re100_renewable") {
        return <RE100RenewablePage />;
      }
    }

    if (currentMainId === "energy") {
      if (currentSubId === "energy_integration") {
        return <EnergyIntegrationPage />;
      }
      if (currentSubId === "energy_performance") {
        return <EnergyPerformancePage />;
      }
    }

    if (currentMainId === "meterManagement") {
      return <MeterManagementPage subId={currentSubId} />;
    }

    if (currentMainId === "systemManager") {
      return <SystemManagerPage />;
    }

    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        준비 중인 페이지입니다. (Main: {currentMainId}, Sub: {currentSubId})
      </div>
    );
  };

  return (
    <ExternalShell
      menuConfig={menuConfig}
      currentMainId={currentMainId}
      currentSubId={currentSubId}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
    >
      {renderActivePage()}
    </ExternalShell>
  );
}

export default App;
