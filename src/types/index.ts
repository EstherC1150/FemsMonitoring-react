import type { ReactNode } from "react";

// ─── Layout / Config ──────────────────────────────────────────────────────────

export interface SubMenu {
  id: string;
  label: string;
}

export interface MainMenu {
  id: string;
  label: string;
  icon?: string;
  children?: SubMenu[];
}

export interface ExternalShellProps {
  menuConfig: MainMenu[];
  currentMainId: string;
  currentSubId: string;
  onNavigate: (mainId: string, subId: string) => void;
  onSearch: (filters: { site: string; date: string }) => void;
  children: ReactNode;
}

// ─── Pages ────────────────────────────────────────────────────────────────────

/** OverviewPage */
export interface OverviewPageProps {
  site?: string;
  date?: string;
}

/** MeterManagementPage */
export interface MeterManagementPageProps {
  subId?: string;
}

export interface ExpandedNodes {
  [key: string]: boolean;
}

/** NoticePage */
export type NoticeCategory = "blue" | "orange" | "green" | "purple";

export interface NoticeItem {
  id: number;
  category: NoticeCategory;
  title: string;
  meta: string;
  badge: ReactNode;
  content: string;
}

/** SystemManagerPage */
export interface MailingUser {
  id: number;
  group: string;
  receiver: string;
  email: string;
  active: boolean;
}

export interface CorrectionReq {
  id: number;
  date: string;
  target: string;
  before: string;
  after: string;
  reason: string;
  pending: boolean;
}

/** EnergyIntegrationPage */
export interface GaugeProps {
  percent: number;
  color: string;
}
