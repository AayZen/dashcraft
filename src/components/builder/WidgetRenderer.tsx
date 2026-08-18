import React from "react";
import type { Widget } from "../../types";
import { KPIWidget } from "./renderers/KPIWidget";
import { LineChartWidget } from "./renderers/LineChartWidget";
import { BarChartWidget } from "./renderers/BarChartWidget";
import { AreaChartWidget } from "./renderers/AreaChartWidget";
import { DonutWidget } from "./renderers/DonutWidget";
import { TableWidget } from "./renderers/TableWidget";
import { ProgressWidget } from "./renderers/ProgressWidget";
import { GaugeWidget } from "./renderers/GaugeWidget";
import { HeadingWidget, TextWidget, DividerWidget, ImageWidget } from "./renderers/ContentWidgets";
import { DateWidget, FilterWidget, StatusWidget, ActivityWidget } from "./renderers/UtilityWidgets";

export const WidgetRenderer: React.FC<{ widget: Widget }> = ({ widget }) => {
  switch (widget.kind) {
    case "kpi":
      return <KPIWidget widget={widget} />;
    case "line":
      return <LineChartWidget widget={widget} />;
    case "bar":
      return <BarChartWidget widget={widget} />;
    case "area":
      return <AreaChartWidget widget={widget} />;
    case "donut":
      return <DonutWidget widget={widget} />;
    case "table":
      return <TableWidget widget={widget} />;
    case "progress":
      return <ProgressWidget widget={widget} />;
    case "gauge":
      return <GaugeWidget widget={widget} />;
    case "heading":
      return <HeadingWidget widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    case "divider":
      return <DividerWidget widget={widget} />;
    case "image":
      return <ImageWidget widget={widget} />;
    case "date":
      return <DateWidget widget={widget} />;
    case "filter":
      return <FilterWidget widget={widget} />;
    case "status":
      return <StatusWidget widget={widget} />;
    case "activity":
      return <ActivityWidget widget={widget} />;
    default:
      return <KPIWidget widget={widget} />;
  }
};
