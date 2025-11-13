export interface ToolAccessStatus {
  canAccess: boolean
  remainingUses: number | null
  isLocked: boolean
  hasUsedBefore: boolean
  message?: string
}

export const getToolAccessMessage = (status: ToolAccessStatus, toolName: string): string | null => {
  if (!status.canAccess && status.isLocked) {
    return `You've used ${toolName} 2 times for free. Upgrade to continue using this tool.`
  }

  if (status.hasUsedBefore && status.remainingUses !== null && status.remainingUses < 2) {
    return `You have ${status.remainingUses} free use(s) remaining for ${toolName}.`
  }

  return null
}

export const shouldShowFreeTierWarning = (status: ToolAccessStatus): boolean => {
  return status.hasUsedBefore && status.remainingUses !== null && status.remainingUses > 0 && status.remainingUses < 2
}
