import type { AccentColor, Widget, WidgetKind, WidgetSize } from "../types";

export interface ApiHealthResponse {
  ok: boolean;
  hasApiKey: boolean;
  model: string;
}

export interface GenerationResult {
  dashboard: {
    title: string;
    description: string;
    widgets: Widget[];
  };
  source: "ai_generated" | "synthesized_demo";
  modelUsed?: string;
  notice?: string;
}

const ACCENT_LIST: AccentColor[] = ["cyan", "blue", "emerald", "violet", "amber", "rose", "indigo"];
const KIND_LIST: WidgetKind[] = ["kpi", "line", "bar", "area", "donut", "table", "progress", "gauge"];
const SIZE_LIST: WidgetSize[] = ["sm", "md", "lg", "full"];

export const api = {
  async checkHealth(): Promise<ApiHealthResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch("/api/health", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        return { ok: false, hasApiKey: false, model: "offline" };
      }

      const data = await response.json();
      return {
        ok: true,
        hasApiKey: Boolean(data.hasApiKey),
        model: data.model || "gpt-4o",
      };
    } catch {
      return { ok: false, hasApiKey: false, model: "offline" };
    }
  },

  async generateDashboard(prompt: string, forceSynthesizer = false): Promise<GenerationResult> {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length < 3) {
      throw new Error("Please provide a prompt describing the dashboard you wish to create.");
    }

    if (!forceSynthesizer) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch("/api/generate-dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: trimmedPrompt }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok && data && Array.isArray(data.widgets) && data.widgets.length > 0) {
          const sanitizedWidgets = data.widgets.map((w: Partial<Widget>, idx: number) =>
            this.sanitizeWidget(w, idx)
          );

          return {
            dashboard: {
              title: data.title || "AI Generated Dashboard",
              description: `Generated with OpenAI (${data.model || "AI Model"}) from prompt: "${trimmedPrompt}"`,
              widgets: sanitizedWidgets,
            },
            source: "ai_generated",
            modelUsed: data.model || "OpenAI",
          };
        }

        const serverError = data?.error || "AI service returned an unexpected response";
        console.warn("Backend generate-dashboard failed, using intelligent synthesis fallback:", serverError);

        return this.synthesizeDomainDashboard(trimmedPrompt, serverError);
      } catch (err) {
        console.warn("Network error calling AI backend, using intelligent synthesis fallback:", err);
        return this.synthesizeDomainDashboard(
          trimmedPrompt,
          "AI backend was unreachable. Created using offline Studio Synthesizer."
        );
      }
    }

    return this.synthesizeDomainDashboard(trimmedPrompt);
  },

  sanitizeWidget(raw: Partial<Widget>, index: number): Widget {
    const kind: WidgetKind = KIND_LIST.includes(raw.kind as WidgetKind)
      ? (raw.kind as WidgetKind)
      : "kpi";

    const size: WidgetSize = SIZE_LIST.includes(raw.size as WidgetSize)
      ? (raw.size as WidgetSize)
      : kind === "kpi" || kind === "progress" || kind === "gauge"
      ? "sm"
      : "md";

    const accent: AccentColor = ACCENT_LIST.includes(raw.accent as AccentColor)
      ? (raw.accent as AccentColor)
      : ACCENT_LIST[index % ACCENT_LIST.length];

    const data = Array.isArray(raw.data)
      ? raw.data
          .map((v) => Number(v))
          .filter(Number.isFinite)
          .slice(0, 12)
          .map((v) => Math.max(0, Math.min(100, Math.round(v))))
      : [32, 48, 64, 78, 86, 94];

    return {
      id: raw.id || `gen-${Date.now()}-${index}-${kind}`,
      kind,
      title: String(raw.title || "Metric Overview").slice(0, 50),
      subtitle: raw.subtitle ? String(raw.subtitle).slice(0, 60) : undefined,
      metric: String(raw.metric || "1,240").slice(0, 24),
      change: String(raw.change || "+12.4%").slice(0, 20),
      changePeriod: raw.changePeriod ? String(raw.changePeriod).slice(0, 30) : "vs last month",
      changeType: (raw.changeType as "increase" | "decrease" | "neutral") || "increase",
      size,
      accent,
      data: data.length >= 3 ? data : [24, 48, 72],
      labels: Array.isArray(raw.labels) ? raw.labels.map(String) : ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
      config: raw.config,
    };
  },

  synthesizeDomainDashboard(prompt: string, notice?: string): GenerationResult {
    const lower = prompt.toLowerCase();

    let title: string;
    let widgets: Widget[];
    const idSeed = Date.now();

    if (lower.includes("saas") || lower.includes("mrr") || lower.includes("subscri") || lower.includes("churn")) {
      title = "SaaS Revenue & Retention Command";
      widgets = [
        {
          id: `w-${idSeed}-1`,
          kind: "kpi",
          title: "Monthly Recurring Revenue",
          subtitle: "Net new subscriptions",
          metric: "$168,400",
          change: "+16.8%",
          changeType: "increase",
          size: "sm",
          accent: "cyan",
          data: [94, 108, 122, 138, 154, 168],
          labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        },
        {
          id: `w-${idSeed}-2`,
          kind: "kpi",
          title: "Annual Run Rate",
          subtitle: "Contracted annual run rate",
          metric: "$2.02M",
          change: "+24.5%",
          changeType: "increase",
          size: "sm",
          accent: "blue",
          data: [1.2, 1.4, 1.6, 1.8, 1.9, 2.02],
          labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
        },
        {
          id: `w-${idSeed}-3`,
          kind: "kpi",
          title: "Net Logo Retention",
          subtitle: "Cohort expansion",
          metric: "116.4%",
          change: "+3.2%",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [108, 110, 112, 114, 116.4],
          labels: ["M1", "M2", "M3", "M4", "M5"],
        },
        {
          id: `w-${idSeed}-4`,
          kind: "kpi",
          title: "Logo Churn Rate",
          subtitle: "Monthly attrition",
          metric: "1.08%",
          change: "-0.4%",
          changeType: "increase",
          size: "sm",
          accent: "violet",
          data: [2.1, 1.8, 1.5, 1.3, 1.08],
          labels: ["Nov", "Dec", "Jan", "Feb", "Mar"],
        },
        {
          id: `w-${idSeed}-5`,
          kind: "line",
          title: "MRR Growth Trajectory",
          subtitle: "New customer acquisition velocity vs plan",
          metric: "$32.4K Net Add",
          change: "+22%",
          changeType: "increase",
          size: "lg",
          accent: "cyan",
          data: [35, 48, 59, 72, 84, 96, 112, 138, 168],
          labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        },
        {
          id: `w-${idSeed}-6`,
          kind: "donut",
          title: "Subscription Tier Mix",
          subtitle: "Revenue distribution across plans",
          metric: "1,840 Active Subs",
          change: "Enterprise 58%",
          changeType: "increase",
          size: "md",
          accent: "blue",
          data: [58, 28, 14],
          labels: ["Enterprise", "Scale Pro", "Starter"],
        },
        {
          id: `w-${idSeed}-7`,
          kind: "table",
          title: "Key Enterprise Accounts",
          subtitle: "High-expansion contracted accounts",
          metric: "5 Accounts",
          change: "100% renewal",
          changeType: "increase",
          size: "lg",
          accent: "cyan",
          data: [96, 88, 82, 74],
          config: {
            tableRows: [
              { id: "1", name: "Acme HyperScale", category: "Enterprise", value: "$64,000", change: "+150 seats", status: "active", progress: 96 },
              { id: "2", name: "Nova Systems", category: "Enterprise", value: "$48,500", change: "+90 seats", status: "active", progress: 88 },
              { id: "3", name: "Pulse Technologies", category: "Scale Pro", value: "$28,000", change: "+45 seats", status: "active", progress: 78 },
              { id: "4", name: "Zenith Cloud Hub", category: "Scale Pro", value: "$22,400", change: "+20 seats", status: "pending", progress: 64 },
            ],
          },
        },
        {
          id: `w-${idSeed}-8`,
          kind: "gauge",
          title: "Customer NPS & Health",
          subtitle: "Composite account health score",
          metric: "94 / 100",
          change: "+6 pts",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [94],
          config: { target: 90, max: 100 },
        },
      ];
    } else if (lower.includes("e-commerce") || lower.includes("ecommerce") || lower.includes("sales") || lower.includes("store") || lower.includes("retail")) {
      title = "E-Commerce & Retail Performance";
      widgets = [
        {
          id: `w-${idSeed}-1`,
          kind: "kpi",
          title: "Gross Sales Volume",
          subtitle: "Online checkout volume",
          metric: "$428,950",
          change: "+21.4%",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [52, 64, 71, 85, 94, 110, 128],
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        {
          id: `w-${idSeed}-2`,
          kind: "kpi",
          title: "Average Order Value",
          subtitle: "Basket size per purchase",
          metric: "$124.80",
          change: "+$12.50",
          changeType: "increase",
          size: "sm",
          accent: "cyan",
          data: [98, 104, 110, 115, 120, 124.8],
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
        },
        {
          id: `w-${idSeed}-3`,
          kind: "kpi",
          title: "Conversion Rate",
          subtitle: "Session to order completion",
          metric: "4.12%",
          change: "+0.65%",
          changeType: "increase",
          size: "sm",
          accent: "amber",
          data: [3.1, 3.4, 3.6, 3.8, 4.0, 4.12],
          labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
        },
        {
          id: `w-${idSeed}-4`,
          kind: "kpi",
          title: "Completed Orders",
          subtitle: "Total weekly transactions",
          metric: "3,438",
          change: "+18.2%",
          changeType: "increase",
          size: "sm",
          accent: "violet",
          data: [2200, 2500, 2800, 3100, 3438],
          labels: ["W1", "W2", "W3", "W4", "W5"],
        },
        {
          id: `w-${idSeed}-5`,
          kind: "bar",
          title: "Revenue by Product Category",
          subtitle: "Weekly performance across top shopping categories",
          metric: "$184K Electronics",
          change: "+34%",
          changeType: "increase",
          size: "lg",
          accent: "emerald",
          data: [94, 82, 68, 54, 42],
          labels: ["Electronics", "Apparel", "Home Office", "Accessories", "Fitness"],
        },
        {
          id: `w-${idSeed}-6`,
          kind: "donut",
          title: "Channel Acquisition Mix",
          subtitle: "Orders by marketing source",
          metric: "3.4K Orders",
          change: "Organic 48%",
          changeType: "increase",
          size: "md",
          accent: "blue",
          data: [48, 28, 16, 8],
          labels: ["Organic Search", "Paid Social", "Email Campaigns", "Referrals"],
        },
      ];
    } else if (lower.includes("devops") || lower.includes("infra") || lower.includes("cloud") || lower.includes("server") || lower.includes("uptime")) {
      title = "Cloud Infrastructure & SRE Hub";
      widgets = [
        {
          id: `w-${idSeed}-1`,
          kind: "kpi",
          title: "API P99 Latency",
          subtitle: "Edge gateway response time",
          metric: "34 ms",
          change: "-8 ms",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [54, 48, 44, 40, 37, 34],
          labels: ["12:00", "12:10", "12:20", "12:30", "12:40", "12:50"],
        },
        {
          id: `w-${idSeed}-2`,
          kind: "kpi",
          title: "System Availability",
          subtitle: "Trailing 90 days SLA",
          metric: "99.995%",
          change: "0 Outages",
          changeType: "neutral",
          size: "sm",
          accent: "cyan",
          data: [99.99, 99.99, 99.99, 99.995],
          labels: ["Jan", "Feb", "Mar", "Apr"],
        },
        {
          id: `w-${idSeed}-3`,
          kind: "kpi",
          title: "5xx Error Percentage",
          subtitle: "Ingress HTTP failures",
          metric: "0.008%",
          change: "-0.012%",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [0.03, 0.024, 0.018, 0.012, 0.008],
          labels: ["12:00", "12:15", "12:30", "12:45", "13:00"],
        },
        {
          id: `w-${idSeed}-4`,
          kind: "kpi",
          title: "Cluster Compute Load",
          subtitle: "Global Kubernetes fleet",
          metric: "52.4%",
          change: "+4.1%",
          changeType: "neutral",
          size: "sm",
          accent: "violet",
          data: [42, 46, 50, 48, 52.4],
          labels: ["T-4h", "T-3h", "T-2h", "T-1h", "Now"],
        },
        {
          id: `w-${idSeed}-5`,
          kind: "area",
          title: "Global Request Volume / Sec",
          subtitle: "Requests routed through CDN edge points of presence",
          metric: "62.4K req/s",
          change: "+18%",
          changeType: "increase",
          size: "lg",
          accent: "rose",
          data: [32, 41, 48, 56, 68, 74, 82, 78, 62],
          labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "Now"],
        },
        {
          id: `w-${idSeed}-6`,
          kind: "status",
          title: "Core Service Health Status",
          subtitle: "Regional cluster uptime matrix",
          metric: "16 / 16 Healthy",
          change: "All systems green",
          changeType: "increase",
          size: "md",
          accent: "emerald",
          data: [100, 100, 100],
          config: { statusType: "healthy" },
        },
      ];
    } else {
      title = `${prompt.slice(0, 36).replace(/^(create|build|design|make|generate)\s+/i, "")} Dashboard`;
      title = title.charAt(0).toUpperCase() + title.slice(1);

      widgets = [
        {
          id: `w-${idSeed}-1`,
          kind: "kpi",
          title: "Primary Volume",
          subtitle: "Core volume metric",
          metric: "$142,600",
          change: "+18.4%",
          changeType: "increase",
          size: "sm",
          accent: "cyan",
          data: [42, 58, 64, 78, 86, 98],
          labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        },
        {
          id: `w-${idSeed}-2`,
          kind: "kpi",
          title: "Active Performance",
          subtitle: "Target index comparison",
          metric: "94.2%",
          change: "+5.1%",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [82, 85, 88, 91, 94.2],
          labels: ["M1", "M2", "M3", "M4", "M5"],
        },
        {
          id: `w-${idSeed}-3`,
          kind: "kpi",
          title: "Conversion Efficiency",
          subtitle: "Funnel throughput rate",
          metric: "32.8%",
          change: "+3.6%",
          changeType: "increase",
          size: "sm",
          accent: "blue",
          data: [24, 26, 28, 30, 32.8],
          labels: ["W1", "W2", "W3", "W4", "W5"],
        },
        {
          id: `w-${idSeed}-4`,
          kind: "kpi",
          title: "Satisfaction Index",
          subtitle: "User feedback score",
          metric: "4.88 / 5",
          change: "+0.14",
          changeType: "increase",
          size: "sm",
          accent: "violet",
          data: [4.5, 4.6, 4.7, 4.82, 4.88],
          labels: ["Nov", "Dec", "Jan", "Feb", "Mar"],
        },
        {
          id: `w-${idSeed}-5`,
          kind: "line",
          title: "Growth & Velocity Trajectory",
          subtitle: "Historical performance vs projected benchmark",
          metric: "+28.4% YoY",
          change: "+6.2%",
          changeType: "increase",
          size: "lg",
          accent: "cyan",
          data: [32, 44, 52, 66, 78, 88, 104, 122, 142],
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        },
        {
          id: `w-${idSeed}-6`,
          kind: "bar",
          title: "Category Distribution",
          subtitle: "Volume segment analysis",
          metric: "5 Key Categories",
          change: "Leading 46%",
          changeType: "increase",
          size: "md",
          accent: "blue",
          data: [92, 78, 64, 48, 36],
          labels: ["Direct", "Partner", "Organic", "Referral", "API"],
        },
        {
          id: `w-${idSeed}-7`,
          kind: "progress",
          title: "Quarterly Target Completion",
          subtitle: "Target milestone progress",
          metric: "88% Completed",
          change: "On schedule",
          changeType: "increase",
          size: "sm",
          accent: "emerald",
          data: [88],
          config: { target: 100, max: 100 },
        },
      ];
    }

    return {
      dashboard: {
        title,
        description: `Synthesized from prompt: "${prompt}"`,
        widgets,
      },
      source: "synthesized_demo",
      notice: notice || "Generated using DashCraft Studio Synthesizer (Demo Mode).",
    };
  },
};
