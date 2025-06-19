// Predefined watermark presets
import type { WatermarkSettings } from "../types"

export interface WatermarkPreset {
  name: string
  description: string
  settings: Partial<WatermarkSettings>
}

export const WATERMARK_PRESETS: WatermarkPreset[] = [
  {
    name: "Subtle Corner",
    description: "Small watermark in bottom-right corner",
    settings: {
      position: "bottom-right",
      size: 15,
      opacity: 60,
      rotation: 0,
    },
  },
  {
    name: "Bold Center",
    description: "Large watermark in center",
    settings: {
      position: "center",
      size: 35,
      opacity: 80,
      rotation: 0,
    },
  },
  {
    name: "Diagonal Stamp",
    description: "Rotated watermark across image",
    settings: {
      position: "center",
      size: 25,
      opacity: 40,
      rotation: -45,
    },
  },
  {
    name: "Professional",
    description: "Clean watermark for business use",
    settings: {
      position: "bottom-right",
      size: 20,
      opacity: 70,
      rotation: 0,
      shadow: false,
    },
  },
  {
    name: "Artistic",
    description: "Creative watermark with shadow",
    settings: {
      position: "top-left",
      size: 25,
      opacity: 85,
      rotation: 15,
      shadow: true,
      shadowColor: "#000000",
      shadowBlur: 5,
    },
  },
]

export const getPresetByName = (name: string): WatermarkPreset | undefined => {
  return WATERMARK_PRESETS.find((preset) => preset.name === name)
}

export const applyPreset = (currentSettings: WatermarkSettings, preset: WatermarkPreset): WatermarkSettings => {
  return {
    ...currentSettings,
    ...preset.settings,
  }
}
