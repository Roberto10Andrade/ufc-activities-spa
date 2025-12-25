'use client'

import { useState, useEffect, useCallback } from 'react'

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'larger'
  contrast: 'normal' | 'high'
  dyslexia: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  contrast: 'normal',
  dyslexia: false,
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  const applyAccessibilitySettings = useCallback((config: AccessibilitySettings) => {
    if (typeof window === 'undefined') return
    
    const html = document.documentElement
    html.setAttribute('data-font-size', config.fontSize)
    
    html.classList.remove('high-contrast')
    if (config.contrast === 'high') {
      html.classList.add('high-contrast')
    }
    
    if (config.dyslexia) {
      html.classList.add('dyslexic-font')
    } else {
      html.classList.remove('dyslexic-font')
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('accessibility-settings')
      if (stored) {
        const parsed = JSON.parse(stored) as AccessibilitySettings
        setSettings(parsed)
        applyAccessibilitySettings(parsed)
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error)
    }
    setIsLoaded(true)
  }, [applyAccessibilitySettings])

  const updateSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem('accessibility-settings', JSON.stringify(updated))
      applyAccessibilitySettings(updated)
      return updated
    })
  }, [applyAccessibilitySettings])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    localStorage.setItem('accessibility-settings', JSON.stringify(defaultSettings))
    applyAccessibilitySettings(defaultSettings)
  }, [applyAccessibilitySettings])

  return { settings, updateSettings, resetSettings, isLoaded }
}
