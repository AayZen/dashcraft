export type WidgetKind =
  | "kpi"
  | "line"
  | "bar"
  | "area"
  | "donut"
  | "table"
  | "progress"
  | "gauge"
  | "heading"
  | "text"
  | "divider"
  | "image"
  | "date"
  | "filter"
  | "status"
  | "activity";

export type WidgetCategory = "analytics" | "content" | "utility";

export type WidgetSize = "sm" | "md" | "lg" | "full";

export type AccentColor =
  | "cyan"
  | "blue"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "indigo"
  | "zinc";

export type ViewMode = "desktop" | "tablet" | "mobile";

export type Density = "compact" | "comfortable" | "spacious";

export type ThemeMode = "dark" | "light" | "system";

export type ChangeType = "increase" | "decrease" | "neutral";

export interface DataPoint {
  label: string;
  value: number;
  secondary?: number;
  target?: number;
  status?: "healthy" | "warning" | "critical" | "neutral";
}

export interface TableRow {
  id: string;
  name: string;
  category?: string;
  value: string | number;
  change?: string;
  status?: "active" | "pending" | "completed" | "failed";
  progress?: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  target: string;
  time: string;
  status?: "success" | "info" | "warning" | "error";
}

export interface WidgetConfig {
  showHeader?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  isSparkline?: boolean;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percentage" | "short";
  target?: number;
  max?: number;
  min?: number;
  statusType?: "healthy" | "warning" | "critical" | "neutral";
  tableRows?: TableRow[];
  activityItems?: ActivityItem[];
  customText?: string;
  imageUrl?: string;
  filterOptions?: string[];
  activeFilter?: string;
}

export interface Widget {
  id: string;
  kind: WidgetKind;
  title: string;
  subtitle?: string;
  metric?: string;
  change?: string;
  changePeriod?: string;
  changeType?: ChangeType;
  size: WidgetSize;
  accent: AccentColor;
  data: number[];
  labels?: string[];
  dataPoints?: DataPoint[];
  config?: WidgetConfig;
}

export interface DashboardSettings {
  density: Density;
  theme: ThemeMode;
  accent: AccentColor;
  gridColumns: number;
  showBackgroundGrid?: boolean;
  dateRange?: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  widgets: Widget[];
  settings: DashboardSettings;
  category?: string;
  isTemplate?: boolean;
  tags?: string[];
  generationSource?: "ai_generated" | "synthesized_demo" | "manual" | "template";
}

export interface WidgetLibraryItem {
  kind: WidgetKind;
  name: string;
  category: WidgetCategory;
  description: string;
  defaultSize: WidgetSize;
  iconName: string;
  badge?: string;
}

export interface AIGenerationResponse {
  title: string;
  description?: string;
  widgets: Partial<Widget>[];
  source: "ai_generated" | "synthesized_demo";
  modelUsed?: string;
}

export interface StorageSchemaV1 {
  version: "v1";
  dashboards: Dashboard[];
  activeDashboardId: string;
  theme: ThemeMode;
  recentPrompts: string[];
}
