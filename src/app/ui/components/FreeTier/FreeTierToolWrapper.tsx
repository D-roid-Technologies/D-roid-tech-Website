"use client";

import React, { type ReactNode } from "react";
import { useFreeTierTools } from "../../../hooks/useFreeTierTools";
import {
  getToolAccessMessage,
  shouldShowFreeTierWarning,
} from "../../../redux/utils/toolAccessManager";

interface FreeTierToolWrapperProps {
  toolId: string;
  toolName: string;
  isPremium: boolean;
  children: ReactNode;
  onAccessDenied?: () => void;
  onWarning?: (remainingUses: number) => void;
}

export const FreeTierToolWrapper: React.FC<FreeTierToolWrapperProps> = ({
  toolId,
  toolName,
  isPremium,
  children,
  onAccessDenied,
  onWarning,
}) => {
  const { checkToolAccess, recordToolUsage } = useFreeTierTools();
  const [showWarning, setShowWarning] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState<string>("");

  React.useEffect(() => {
    let access = checkToolAccess(toolId, isPremium);

    // 🔥 Normalize the access object to avoid TypeScript errors
    access = {
      canAccess: access.canAccess ?? false,
      isLocked: access.isLocked ?? false,
      remainingUses: access.remainingUses ?? 0,
      hasUsedBefore: access.hasUsedBefore ?? false,
    };

    // Check if access is denied
    if (!access.canAccess && isPremium) {
      onAccessDenied?.();
      return;
    }

    // Check if we should show warning
    if (shouldShowFreeTierWarning(access)) {
      const message = getToolAccessMessage(access, toolName);

      if (message) {
        setWarningMessage(message);
        setShowWarning(true);
        onWarning?.(access.remainingUses);
      }
    }

    // Record the tool usage
    if (isPremium) {
      recordToolUsage(toolId);
    }
  }, [
    toolId,
    isPremium,
    checkToolAccess,
    recordToolUsage,
    onAccessDenied,
    onWarning,
    toolName,
  ]);

  if (showWarning) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        <p style={{ color: "#856404", marginBottom: "10px" }}>
          ⚠️ {warningMessage}
        </p>

        <button
          onClick={() => setShowWarning(false)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ffc107",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            color: "#000",
            fontWeight: "500",
          }}
        >
          Continue
        </button>

        {children}
      </div>
    );
  }

  return <>{children}</>;
};
