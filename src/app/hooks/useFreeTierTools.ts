import { useDispatch, useSelector } from "react-redux"
import { incrementToolUsage } from "../redux/slices/freeTierSlice"
import { RootState } from "../redux/Store"

export const useFreeTierTools = () => {
  const dispatch = useDispatch()
  const freeTier = useSelector((state: RootState) => state.freeTier)
  const membershipTier = useSelector(
    (state: RootState) => state.membershipTier?.tier ?? "Silver",
  )
  const isEligibleTier = ["Gold", "Platinum"].includes(membershipTier)

  const checkToolAccess = (toolId: string, isPremium: boolean) => {
    if (!isPremium) {
      return {
        canAccess: true,
        remainingUses: null,
        isLocked: false,
        hasUsedBefore: false,   
      }
    }

    if (!isEligibleTier) {
      return {
        canAccess: false,
        remainingUses: 0,
        isLocked: true,
        hasUsedBefore: false,
      }
    }

    const toolData = freeTier?.toolUsage?.[toolId] || {
      usageCount: 0,
      limit: 2,
      isLocked: false,
    }

    const remainingUses = toolData.limit - toolData.usageCount
    const canAccess = !toolData.isLocked

    return {
      canAccess,
      remainingUses: Math.max(0, remainingUses),
      isLocked: toolData.isLocked,
      hasUsedBefore: toolData.usageCount > 0,
    }
  }

  const recordToolUsage = (toolId: string) => {
    if (!isEligibleTier) return
    dispatch(incrementToolUsage(toolId))
  }

  return { checkToolAccess, recordToolUsage }
}
