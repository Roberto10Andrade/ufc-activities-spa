'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAccessibility, type AccessibilitySettings } from '@/app/hooks/useAccessibility'

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
  resetSettings: () => void
  isLoaded: boolean
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings, resetSettings, isLoaded } = useAccessibility()

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings, isLoaded }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibilityContext must be used within AccessibilityProvider')
  }
  return context
}
