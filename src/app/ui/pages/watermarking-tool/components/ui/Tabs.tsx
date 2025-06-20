"use client"

// Tabs components
import type React from "react"
import { createContext, useContext } from "react"

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = "" }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={`wt-tabs ${className}`}>{children}</div>
  </TabsContext.Provider>
)

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`wt-tabs__list ${className}`}>{children}</div>
)

export const TabsTrigger: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
}> = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const { value: currentValue, onValueChange } = context
  const isActive = currentValue === value

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`wt-tabs__trigger ${isActive ? "wt-tabs__trigger--active" : ""} ${className}`}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
}> = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  const { value: currentValue } = context

  if (currentValue !== value) return null

  return <div className={`wt-tabs__content ${className}`}>{children}</div>
}
