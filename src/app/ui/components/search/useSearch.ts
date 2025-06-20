"use client"

import { useState, useMemo } from "react"

interface SearchableItem {
  [key: string]: any
}

interface UseSearchProps<T> {
  items: T[]
  searchFields: (keyof T)[]
  filterFn?: (item: T, filters: Record<string, any>) => boolean
}

export function useSearch<T extends SearchableItem>({ items, searchFields, filterFn }: UseSearchProps<T>) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<Record<string, any>>({})

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search query filter
      const matchesQuery =
        query === "" ||
        searchFields.some((field) => {
          const value = item[field]
          return value && value.toString().toLowerCase().includes(query.toLowerCase())
        })

      // Custom filters
      const matchesFilters = filterFn ? filterFn(item, filters) : true

      return matchesQuery && matchesFilters
    })
  }, [items, query, filters, searchFields, filterFn])

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setQuery("")
    setFilters({})
  }

  return {
    query,
    setQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredItems,
    totalItems: items.length,
    filteredCount: filteredItems.length,
  }
}
