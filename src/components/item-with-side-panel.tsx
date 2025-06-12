import { useState } from "react";
import { SidePanel } from "./side-panel";

interface Props<T> {
  renderItemContent: (contentProps: {
    item: T;
    handleShowPanel: (value: boolean) => void;
  }) => React.ReactNode;
  renderSidePanelContent: (contentProps: {
    item: T;
    handleShowPanel: (value: boolean) => void;
  }) => React.ReactNode;
  item: T;
}

export function ItemWithSidePanel<T>({
  renderItemContent,
  renderSidePanelContent,
  item,
}: Props<T>) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="flex flex-row">
      {renderItemContent({
        item,
        handleShowPanel: (val: boolean) => setShowPanel(val),
      })}
      <SidePanel
        title="Task Details - Upload Images"
        open={showPanel}
        onClose={() => setShowPanel(false)}
      >
        {renderSidePanelContent({
          item,
          handleShowPanel: (val) => setShowPanel(val),
        })}
      </SidePanel>
    </div>
  );
}
