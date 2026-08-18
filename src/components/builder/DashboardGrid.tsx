import React from "react";
import type { Widget, Density, ViewMode } from "../../types";
import { DENSITY_SETTINGS } from "../../constants/theme";
import { WidgetCard } from "./WidgetCard";

interface DashboardGridProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  onDuplicateWidget: (id: string) => void;
  onDeleteWidget: (id: string) => void;
  onMoveUpWidget: (id: string) => void;
  onMoveDownWidget: (id: string) => void;
  density: Density;
  viewMode?: ViewMode;
  isPreview?: boolean;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  widgets,
  selectedWidgetId,
  onSelectWidget,
  onDuplicateWidget,
  onDeleteWidget,
  onMoveUpWidget,
  onMoveDownWidget,
  density,
  viewMode = "desktop",
  isPreview = false,
}) => {
  const densitySetting = DENSITY_SETTINGS[density] || DENSITY_SETTINGS.comfortable;

  return (
    <div className={`grid grid-cols-12 ${densitySetting.gap} w-full min-w-0`}>
      {widgets.map((widget) => (
        <WidgetCard
          key={widget.id}
          widget={widget}
          isSelected={!isPreview && widget.id === selectedWidgetId}
          onSelect={onSelectWidget}
          onDuplicate={onDuplicateWidget}
          onDelete={onDeleteWidget}
          onMoveUp={onMoveUpWidget}
          onMoveDown={onMoveDownWidget}
          viewMode={viewMode}
          isPreview={isPreview}
        />
      ))}
    </div>
  );
};
