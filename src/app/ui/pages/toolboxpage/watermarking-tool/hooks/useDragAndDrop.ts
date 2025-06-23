"use client"

import type React from "react"

// Drag and drop functionality hook
import { useState, useCallback } from "react"

interface UseDragAndDropProps {
  onDrop: (files: File[]) => void
  onError?: (error: string) => void
  acceptedTypes?: string[]
  maxFiles?: number
}

export const useDragAndDrop = ({ onDrop, onError, acceptedTypes = ["image/*"], maxFiles = 1 }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragCounter, setDragCounter] = useState(0)

  const validateFiles = useCallback(
    (files: File[]): File[] => {
      const validFiles: File[] = []

      for (const file of files) {
        if (validFiles.length >= maxFiles) break

        const isValidType = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            const baseType = type.slice(0, -2)
            return file.type.startsWith(baseType)
          }
          return file.type === type
        })

        if (isValidType) {
          validFiles.push(file)
        } else {
          onError?.(`Invalid file type: ${file.name}`)
        }
      }

      return validFiles
    },
    [acceptedTypes, maxFiles, onError],
  )

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      setDragCounter((prev) => prev + 1)
      if (!isDragging) {
        setIsDragging(true)
      }
    },
    [isDragging],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter((prev) => {
      const newCounter = prev - 1
      if (newCounter === 0) {
        setIsDragging(false)
      }
      return newCounter
    })
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      setIsDragging(false)
      setDragCounter(0)

      const files = Array.from(e.dataTransfer.files)
      const validFiles = validateFiles(files)

      if (validFiles.length > 0) {
        onDrop(validFiles)
      }
    },
    [onDrop, validateFiles],
  )

  const reset = useCallback(() => {
    setIsDragging(false)
    setDragCounter(0)
  }, [])

  return {
    isDragging,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    reset,
  }
}
